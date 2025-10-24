import { Badge } from "@/components/ui/badge";

export const PocketAI = () => {
    return (
        <div className="w-full text-left bg-card/50 p-4 rounded-md border border-border space-y-4">
            <div>
                <h4 className="font-bold text-accent">PocketAI — PocketBase + Rivet + React Boilerplate</h4>
            </div>
            <p className="text-sm text-muted-foreground">
                A boilerplate for building generative AI products with PocketBase, Rivet workflows, and a React frontend. Includes auth, realtime subscriptions, and event-driven hooks.
            </p>
            <section>
                <h5 className="font-semibold text-sm mb-2 text-foreground">Key Features</h5>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Layered services with dependency injection and registry pattern.</li>
                    <li>Rivet workflow orchestration with caching and metrics.</li>
                    <li>React dashboard with protected routes and shadcn/ui components.</li>
                    <li>Event-driven hooks for AI workflows on PocketBase changes.</li>
                    <li>Full-stack testing with Playwright and Docker deployment.</li>
                </ul>
            </section>
            <div className="flex flex-wrap gap-2">
                {["PocketBase", "Rivet", "React", "TypeScript", "Go", "TanStack Query", "Playwright", "Docker"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground font-normal">
                        {tech}
                    </Badge>
                ))}
            </div>
        </div>
    );
};
