import { Badge } from "@/components/ui/badge";

export const BrowserDiff = () => {
    return (
        <div className="w-full text-left bg-card/50 p-4 rounded-md border border-border">
            <h4 className="font-bold text-accent">Browser Diff — Cross-Browser Visual Regression Testing CLI</h4>
            <p className="text-sm text-muted-foreground mb-4">Automated cross-browser visual regression testing with detailed reporting.</p>
            
            <div className="space-y-3 mb-4 text-sm">
                <p>
                    Developed a command-line tool that automates cross-browser visual regression testing by comparing how websites render across 
                    Chromium, Firefox, and WebKit, generating detailed visual difference reports with metrics and screenshots.
                </p>
                
                <p>
                    Designed and implemented a modular architecture (CLI, Executor, ScreenshotService, DiffService, ReportService) 
                    to ensure maintainability and scalability.
                </p>
                
                <p>
                    Utilized Playwright to orchestrate multi-browser sessions and capture full-page screenshots with automatic page 
                    readiness detection (images, fonts, network idle).
                </p>
                
                <p>
                    Built a pixel-perfect diff engine using Pixelmatch, detecting even minimal rendering inconsistencies between browsers.
                </p>
                
                <p>
                    Created a dynamic HTML reporting system with EJS templates, including side-by-side visual comparisons, 
                    diff metrics, and browser metadata.
                </p>
            </div>

            <div className="mb-4">
                <h5 className="font-semibold text-sm mb-2 text-foreground">Key Outcomes:</h5>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Simplified cross-browser visual testing into a single command (<code className="text-primary font-mono">browserdiff &lt;url&gt;</code>)</li>
                    <li>Improved developer productivity by automating report generation and baseline comparison</li>
                    <li>Produced professional-grade, visually rich reports suitable for integration into QA and deployment pipelines</li>
                </ul>
            </div>

            <div className="flex flex-wrap gap-2">
                {["Node.js", "TypeScript", "Playwright", "Pixelmatch", "EJS", "CLI Tools", "Visual Testing", "CI/CD"].map(tech => (
                    <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground font-normal">{tech}</Badge>
                ))}
            </div>
        </div>
    );
};