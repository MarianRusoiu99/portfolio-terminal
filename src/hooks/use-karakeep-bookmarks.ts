import { useState, useEffect } from 'react';
import { DisplayBookmark, WebhookResponse } from '@/types/bookmark';
import { mapWebhookToBookmarks } from '@/utils/bookmark-mapper';

interface UseKaraKeepBookmarksReturn {
  bookmarks: DisplayBookmark[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  rawResponse?: WebhookResponse; // For debugging
}

export const useKaraKeepBookmarks = (): UseKaraKeepBookmarksReturn => {
  const [bookmarks, setBookmarks] = useState<DisplayBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<WebhookResponse>();

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use proxy in development to avoid CORS issues
      const isDev = import.meta.env.DEV;
      const webhookUrl = isDev 
        ? '/api/karakeep' // Use Vite proxy in development
        : import.meta.env.VITE_BOOKMARKS_API_URL ?? import.meta.env.VITE_KARAKEEP_WEBHOOK_URL;
      
      if (!webhookUrl) {
        throw new Error('KaraKeep webhook URL not configured');
      }

      const response = await fetch(webhookUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 403) {
          const errorText = await response.text();
          if (errorText.includes('IP is not whitelisted')) {
            throw new Error('Webhook access restricted: IP not whitelisted. Using cached bookmarks.');
          } else {
            throw new Error('Access forbidden: Check webhook permissions');
          }
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData: WebhookResponse = await response.json();
      setRawResponse(rawData); // Store for debugging
      
      // Use the flexible mapper to extract bookmarks
      const mappedBookmarks = mapWebhookToBookmarks(rawData);
      
      if (mappedBookmarks.length === 0) {
        console.warn('No bookmarks found in webhook response:', rawData);
      }
      
      setBookmarks(mappedBookmarks);
    } catch (err) {
      console.error('Error fetching KaraKeep bookmarks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bookmarks');
      setBookmarks([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const refetch = () => {
    fetchBookmarks();
  };

  return {
    bookmarks,
    loading,
    error,
    refetch,
  };
};