import { motion } from "framer-motion";
import { Link2, Clock, Calendar, AlertCircle, ExternalLink, Tag } from "lucide-react";
import { useKaraKeepBookmarks } from "@/hooks/use-karakeep-bookmarks";
import { formatDistanceToNow } from "date-fns";

const Bookmarks = () => {
  const { bookmarks, loading, error } = useKaraKeepBookmarks();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-8 w-full"
    >
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Link2 className="w-10 h-10 text-primary" />
          Bookmarks
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          A curated collection of interesting articles, tools, and resources I've found around the web, synced via KaraKeep.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Failed to sync live bookmarks</h3>
            <p className="text-sm opacity-80 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-secondary/30 animate-pulse border border-border/30" />
          ))}
        </div>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((bookmark, idx) => (
            <motion.a
              key={bookmark.id}
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative flex flex-col gap-3 p-5 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {bookmark.favicon ? (
                    <img src={bookmark.favicon} alt="" className="w-6 h-6 rounded-sm bg-muted/50 p-0.5" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  ) : (
                    <div className="w-6 h-6 rounded-sm bg-primary/20 flex items-center justify-center">
                      <Link2 className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {bookmark.title || bookmark.domain || bookmark.url}
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                {bookmark.aiSummary || bookmark.description || "No description available."}
              </p>

              <div className="flex items-center justify-between mt-2 pt-4 border-t border-border/30">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {bookmark.addedAt && (
                    <span className="flex items-center gap-1.5" title={new Date(bookmark.addedAt).toLocaleString()}>
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDistanceToNow(new Date(bookmark.addedAt), { addSuffix: true })}
                    </span>
                  )}
                  {bookmark.readTimeMinutes && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {bookmark.readTimeMinutes} min read
                    </span>
                  )}
                </div>
                {bookmark.tags && bookmark.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                      {bookmark.tags[0]}
                      {bookmark.tags.length > 1 && ` +${bookmark.tags.length - 1}`}
                    </span>
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/30 rounded-2xl bg-secondary/30">
          <Link2 className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-foreground">No bookmarks found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            Looks like the synced bookmarks are completely empty.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Bookmarks;
