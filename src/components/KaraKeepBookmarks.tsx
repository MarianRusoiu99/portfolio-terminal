import React from "react";
import data from "@/lib/data.json";
import { useCursor } from "@/context/CursorContext";
import { Link as LinkIcon } from "lucide-react";

const KaraKeepBookmarksComponent = () => {
  const { setCursorType } = useCursor();
  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-primary">$</span>
        <p className="text-foreground">cat ~/.bookmarks</p>
      </div>
      <div 
        className="relative space-y-6"
      >
        {data.karaKeepBookmarks.map((bookmark, index) => (
          <a
            key={index}
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block pl-4 border-l-2 border-transparent hover:border-primary transition-colors"
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
          >
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              [{bookmark.category}] <LinkIcon className="w-3 h-3" />
            </p>
            <h4 className="font-bold text-primary">{bookmark.title}</h4>
            <p className="text-foreground">{bookmark.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export const KaraKeepBookmarks = React.memo(KaraKeepBookmarksComponent);
