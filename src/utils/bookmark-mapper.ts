import { WebhookResponse, DisplayBookmark, KaraKeepBookmark } from '@/types/bookmark';

/**
 * Safely gets a value from an object using dot notation or array access
 */
function safeGet(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== 'object') return undefined;
  
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  
  return current;
}

/**
 * Safely converts a value to string with fallback
 */
function safeString(value: unknown, fallback = ''): string {
  if (value === null || value === undefined) return fallback;
  return String(value);
}

/**
 * Safely converts a value to boolean
 */
function safeBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  if (typeof value === 'number') return value > 0;
  return false;
}

/**
 * Generates a unique ID from bookmark data
 */
function generateId(bookmark: unknown, index: number): string {
  if (bookmark && typeof bookmark === 'object') {
    const id = safeGet(bookmark, 'id') || 
               safeGet(bookmark, '_id') || 
               safeGet(bookmark, 'uuid') ||
               safeGet(bookmark, 'key');
    if (id) return safeString(id);
  }
  return `bookmark-${index}-${Date.now()}`;
}

/**
 * Extracts URL from various possible fields
 */
function extractUrl(bookmark: unknown): string {
  // KaraKeep specific: check content.url first
  const contentUrl = safeGet(bookmark, 'content.url');
  if (contentUrl && typeof contentUrl === 'string' && contentUrl.startsWith('http')) {
    return contentUrl;
  }
  
  const possibleUrls = [
    'url', 'link', 'href', 'uri', 'website', 'site',
    'source', 'originalUrl', 'targetUrl'
  ];
  
  for (const field of possibleUrls) {
    const url = safeGet(bookmark, field);
    if (url && typeof url === 'string' && url.startsWith('http')) {
      return url;
    }
  }
  
  return '#'; // Fallback URL
}

/**
 * Extracts title from various possible fields
 */
function extractTitle(bookmark: unknown): string {
  // KaraKeep specific: check content.title first
  const contentTitle = safeGet(bookmark, 'content.title');
  if (contentTitle && safeString(contentTitle).trim()) {
    return safeString(contentTitle);
  }
  
  const possibleTitles = [
    'title', 'name', 'label', 'heading', 'subject',
    'displayName', 'bookmarkTitle'
  ];
  
  for (const field of possibleTitles) {
    const title = safeGet(bookmark, field);
    if (title && safeString(title).trim()) {
      return safeString(title);
    }
  }
  
  // Try to extract title from URL
  const url = extractUrl(bookmark);
  if (url !== '#') {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '');
    } catch {
      // Ignore URL parsing errors
    }
  }
  
  return 'Untitled Bookmark';
}

/**
 * Extracts description from various possible fields
 */
function extractDescription(bookmark: unknown): string {
  // KaraKeep specific: check content.description first
  const contentDescription = safeGet(bookmark, 'content.description');
  if (contentDescription && safeString(contentDescription).trim()) {
    return safeString(contentDescription);
  }
  
  const possibleDescriptions = [
    'description', 'summary', 'excerpt', 'note', 'content',
    'body', 'text', 'details', 'preview'
  ];
  
  for (const field of possibleDescriptions) {
    const desc = safeGet(bookmark, field);
    if (desc && safeString(desc).trim()) {
      return safeString(desc);
    }
  }
  
  return 'No description available';
}

/**
 * Extracts category/tags from various possible fields
 */
function extractCategory(bookmark: unknown): string {
  // KaraKeep specific: check tags array first
  const tags = safeGet(bookmark, 'tags');
  if (Array.isArray(tags) && tags.length > 0) {
    const firstTag = tags[0];
    const tagName = safeGet(firstTag, 'name') || firstTag;
    if (tagName && safeString(tagName).trim()) {
      return safeString(tagName);
    }
  }
  
  const possibleCategories = [
    'category', 'tag', 'group', 'folder', 'type',
    'collection', 'classification'
  ];
  
  for (const field of possibleCategories) {
    const category = safeGet(bookmark, field);
    if (category) {
      // Handle array of tags
      if (Array.isArray(category) && category.length > 0) {
        return safeString(category[0]);
      }
      // Handle single category
      if (safeString(category).trim()) {
        return safeString(category);
      }
    }
  }
  
  return 'General';
}

/**
 * Extracts favorite status from various possible fields
 */
function extractFavoriteStatus(bookmark: unknown): boolean {
  const possibleFavorites = [
    'favourited', 'favorite', 'starred', 'pinned',
    'isFavorite', 'isStarred', 'isPinned'
  ];
  
  for (const field of possibleFavorites) {
    const favorite = safeGet(bookmark, field);
    if (favorite !== undefined) {
      return safeBoolean(favorite);
    }
  }
  
  return false;
}

/**
 * Extracts date from various possible fields
 */
function extractDate(bookmark: unknown): string | undefined {
  const possibleDates = [
    'createdAt', 'created', 'dateCreated', 'timestamp',
    'addedAt', 'dateAdded', 'date'
  ];
  
  for (const field of possibleDates) {
    const date = safeGet(bookmark, field);
    if (date && safeString(date).trim()) {
      return safeString(date);
    }
  }
  
  return undefined;
}

/**
 * Maps a raw webhook response to normalized DisplayBookmark array
 */
export function mapWebhookToBookmarks(response: WebhookResponse): DisplayBookmark[] {
  try {
    // Try to find bookmarks in various possible locations
    let bookmarksList: unknown[] = [];
    
    // Direct array response
    if (Array.isArray(response)) {
      bookmarksList = response;
    }
    // Nested in 'bookmarks' field
    else if (Array.isArray(safeGet(response, 'bookmarks'))) {
      bookmarksList = safeGet(response, 'bookmarks') as unknown[];
    }
    // Nested in 'data.bookmarks'
    else if (Array.isArray(safeGet(response, 'data.bookmarks'))) {
      bookmarksList = safeGet(response, 'data.bookmarks') as unknown[];
    }
    // Nested in 'results'
    else if (Array.isArray(safeGet(response, 'results'))) {
      bookmarksList = safeGet(response, 'results') as unknown[];
    }
    // Nested in 'items'
    else if (Array.isArray(safeGet(response, 'items'))) {
      bookmarksList = safeGet(response, 'items') as unknown[];
    }
    // Single bookmark object
    else if (typeof response === 'object' && response) {
      bookmarksList = [response];
    }
    
    
    // Map each bookmark to DisplayBookmark format
    return bookmarksList.map((bookmark, index): DisplayBookmark => {
      const mapped = {
        id: generateId(bookmark, index),
        title: extractTitle(bookmark),
        description: extractDescription(bookmark),
        url: extractUrl(bookmark),
        category: extractCategory(bookmark),
        isFavorite: extractFavoriteStatus(bookmark),
        dateAdded: extractDate(bookmark),
      };
      
       return mapped;
    }).filter(bookmark => {
      const isValid = bookmark.title !== 'Untitled Bookmark' || bookmark.url !== '#';
      if (!isValid) {
        console.log('Filtered out invalid bookmark:', bookmark);
      }
      return isValid;
    });
    
  } catch (error) {
    console.error('Error mapping webhook response:', error);
    return [];
  }
}