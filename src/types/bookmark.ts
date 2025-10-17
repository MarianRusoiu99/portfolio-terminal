// Raw webhook response - can be any structure
export interface WebhookResponse {
  [key: string]: unknown;
}

// Normalized bookmark data for display
export interface DisplayBookmark {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  isFavorite: boolean;
  dateAdded?: string;
  tags?: string[];
}

// Original KaraKeep bookmark structure (for reference)
export interface KaraKeepBookmark {
  id?: string;
  createdAt?: string;
  modifiedAt?: string;
  title?: string | null;
  archived?: boolean;
  favourited?: boolean;
  taggingStatus?: 'success' | 'pending' | 'failed';
  summarizationStatus?: 'success' | 'pending' | 'failed';
  note?: string | null;
  summary?: string | null;
  url?: string;
  tags?: string[];
}

export interface BookmarkApiError {
  error: string;
  message: string;
}