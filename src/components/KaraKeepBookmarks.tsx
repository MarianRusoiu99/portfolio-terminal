import React from "react";
import data from "@/lib/data.json";
import { useCursor } from "@/context/CursorContext";
import { useKaraKeepBookmarks } from "@/hooks/use-karakeep-bookmarks";
import { DisplayBookmark } from "@/types/bookmark";
import { Link as LinkIcon, RefreshCw, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// Union type for both API and static bookmarks
type AnyBookmark = DisplayBookmark | typeof data.karaKeepBookmarks[0];

const BookmarkSkeleton = () => (
  <div className="pl-4 border-l-2 border-transparent space-y-2">
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-3 rounded-full" />
    </div>
    <Skeleton className="h-5 w-48" />
    <Skeleton className="h-4 w-full max-w-md" />
  </div>
);

const KaraKeepBookmarksComponent = () => {
  const { setCursorType } = useCursor();
  const { bookmarks, loading, error, refetch } = useKaraKeepBookmarks();

  // Fallback to static data from data.json if API fails or no bookmarks
  const displayBookmarks = error || bookmarks.length === 0 ? data.karaKeepBookmarks : bookmarks;

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-6">
         {error && (
          <Button
            variant="ghost" 
            size="sm"
            onClick={refetch}
            className="ml-auto text-muted-foreground hover:text-foreground"
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Retry
          </Button>
        )}
      </div>
      
      {error && (
        <div className="mb-6 p-3 rounded-md bg-destructive/10 border border-destructive/20 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
          <div className="text-sm">
            <p className="text-destructive font-medium">Failed to fetch live bookmarks</p>
            <p className="text-muted-foreground">Showing cached bookmarks instead. {error}</p>
          </div>
        </div>
      )}

      <div className="relative space-y-6">
        {loading ? (
          // Loading state
          Array.from({ length: 6 }).map((_, index) => (
            <BookmarkSkeleton key={index} />
          ))
        ) : (
          // Display bookmarks (either from API or fallback data)
          displayBookmarks.map((bookmark: AnyBookmark, index) => {
            // Handle both DisplayBookmark format (from API) and static data format
            const isApiData = 'isFavorite' in bookmark;
            
            // Type-safe access to properties with proper type guards
            const bookmarkUrl = ('url' in bookmark) ? bookmark.url : '#';
            const bookmarkTitle = bookmark.title || 'Untitled';
            const bookmarkDescription = isApiData 
              ? (bookmark as DisplayBookmark).description 
              : ('description' in bookmark ? bookmark.description : 'No description available');
            const bookmarkCategory = isApiData 
              ? (bookmark as DisplayBookmark).category 
              : ('category' in bookmark ? bookmark.category : 'General');
            const isFavorite = isApiData 
              ? (bookmark as DisplayBookmark).isFavorite 
              : ('favourited' in bookmark && bookmark.favourited);
            const dateAdded = isApiData 
              ? (bookmark as DisplayBookmark).dateAdded 
              : undefined;
            const bookmarkId = isApiData 
              ? (bookmark as DisplayBookmark).id 
              : `static-${index}`;

            return (
              <a
                key={bookmarkId}
                href={bookmarkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block pl-4 border-l-2 border-transparent hover:border-primary transition-colors"
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
              >
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  [{bookmarkCategory}] <LinkIcon className="w-3 h-3" />
                  {isFavorite && <span className="text-yellow-500">★</span>}
                </p>
                <h4 className="font-bold text-primary">{bookmarkTitle}</h4>
                <p className="text-foreground">{bookmarkDescription}</p>
                {dateAdded && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Added: {new Date(dateAdded).toLocaleDateString()}
                  </p>
                )}
              </a>
            );
          })
        )}
      </div>
    </div>
  );
};

export const KaraKeepBookmarks = React.memo(KaraKeepBookmarksComponent);
