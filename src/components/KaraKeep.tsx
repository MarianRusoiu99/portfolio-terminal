import { Badge } from "@/components/ui/badge";

export const KaraKeep = () => {
    return (
        <div className="w-full text-left bg-card/50 p-4 rounded-md border border-border">
            <h4 className="font-bold text-accent">KaraKeep - Your Personal Karaoke Companion</h4>
            <p className="text-sm text-muted-foreground mb-4">A mobile-first web app for karaoke lovers.</p>
            <p className="mb-4 text-sm">KaraKeep allows users to search for songs, save their favorite tracks, and keep track of their performance history. It features a real-time search powered by the Spotify API and a fun, engaging user interface built with React and Framer Motion.</p>
            <div className="flex flex-wrap gap-2">
                {["React", "Spotify API", "Framer Motion", "Tailwind CSS"].map(tech => (
                    <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground font-normal">{tech}</Badge>
                ))}
            </div>
        </div>
    );
};
