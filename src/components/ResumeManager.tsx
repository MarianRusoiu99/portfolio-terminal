import { Badge } from "@/components/ui/badge";

export const ResumeManager = () => {
    return (
        <div className="w-full text-left bg-card/50 p-4 rounded-md border border-border space-y-4">
            <div>
                <h4 className="font-bold text-accent">Resume Manager — AI-Powered Resume Builder & Optimizer</h4>
            </div>
            <p className="text-sm text-muted-foreground">
                A full-stack, feature-rich application for creating, managing, and optimizing professional resumes with a modern editor, template system, and optional AI assistance.
            </p>
            <section>
                <h5 className="font-semibold text-sm mb-2 text-foreground">Key Features</h5>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Rich Text Editor for easy content creation and formatting.</li>
                    <li>Customizable Templates with Handlebars for professional PDF export.</li>
                    <li>Multiple Profile Management to maintain different resume versions.</li>
                    <li>JSON Resume Standard import/export compatibility.</li>
                    <li>Optional AI Integrations for content enhancement and job tailoring.</li>
                    <li>Secure Authentication and Data Encryption (NextAuth.js).</li>
                </ul>
            </section>
            <div className="flex flex-wrap gap-2">
                {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "PostgreSQL", "Prisma ORM", "NextAuth.js", "OpenAI API"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground font-normal">
                        {tech}
                    </Badge>
                ))}
            </div>
        </div>
    );
};
