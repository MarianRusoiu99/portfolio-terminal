import { Badge } from "@/components/ui/badge";

export const BrowserDiff = () => {
    return (
        <div className="w-full text-left bg-card/50 p-4 rounded-md border border-border">
            <h4 className="font-bold text-accent">Browser Diff — Cross-Browser Visual Regression Testing CLI</h4>
            <p className="text-sm text-muted-foreground mb-4">A CLI tool for automated cross-browser visual regression testing using Playwright and Pixelmatch.</p>
            
            <p className="text-sm mb-4">
            Compares website rendering across Chromium, Firefox, and WebKit, generating reports with screenshots and diff metrics.
            </p>

            <div className="mb-4">
            <h5 className="font-semibold text-sm mb-2 text-foreground">Key Features:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Single command execution: <code className="text-primary font-mono">browserdiff &lt;url&gt;</code></li>
                <li>Automated screenshot capture and diff analysis</li>
                <li>HTML reports with visual comparisons</li>
            </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
            {["Node.js", "TypeScript", "Playwright", "Pixelmatch", "EJS"].map(tech => (
                <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground font-normal">{tech}</Badge>
            ))}
            </div>
        </div>
    );
};