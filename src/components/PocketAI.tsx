import { Badge } from "@/components/ui/badge";

export const PocketAI = () => {
  return (
    <div className="w-full text-left bg-card/50 p-4 rounded-md border border-border space-y-4">
      <div>
        <h4 className="font-bold text-accent">PocketAI — PocketBase + Rivet + React Boilerplate</h4>
        <p className="text-sm text-muted-foreground">
          Production-ready boilerplate that wires together PocketBase, Rivet workflows, and a modern React front end for building generative AI products fast.
        </p>
      </div>

      <section className="space-y-2 text-sm">
        <p>
          Combines a strongly typed Go backend, Rivet AI workflow orchestration, and a responsive dashboard powered by React and shadcn/ui. Ships with layered services, dependency injection, and registry-driven extensibility so teams can plug in new workflows and PocketBase hooks without touching core logic.
        </p>
        <p>
          Includes a complete auth system, protected API routes, realtime subscriptions, and event-driven PocketBase hooks that trigger Rivet workflows whenever collections change. Advanced Rivet features—caching, metrics, circuit breakers, and streaming—are opt-in per workflow to balance performance with control.
        </p>
        <p>
          The client app uses TanStack Query, Context-driven auth, and reusable layout components to deliver a polished dashboard experience, while Playwright E2E suites and Go/React unit tests ensure the stack stays reliable across updates.
        </p>
      </section>

      <section>
        <h5 className="font-semibold text-sm mb-2 text-foreground">Architecture Highlights</h5>
        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
          <li>Layered PocketBase services with constructor injection, registry pattern, and focused interfaces.</li>
          <li>Rivet Executor with workflow catalog, caching, metrics, and circuit breaker controls defined in <code className="text-primary font-mono">rivet.config.yaml</code>.</li>
          <li>React dashboard with protected routes, mobile-friendly sidebar layout, and shadcn/ui components.</li>
          <li>Event-driven hooks that enrich PocketBase records using Rivet outputs (story generator, content enhancement, chat pipelines).</li>
          <li>Comprehensive documentation covering architecture, API, testing, debugging, and deployment workflows.</li>
        </ul>
      </section>

      <section>
        <h5 className="font-semibold text-sm mb-2 text-foreground">Developer Experience</h5>
        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
          <li><code className="text-primary font-mono">./scripts/dev.sh</code> spins up PocketBase, Rivet, and the client with health checks.</li>
          <li>One-command Playwright suite runner orchestrates background services and publishes HTML reports.</li>
          <li>Docs set covers quick start, architecture deep dives, Rivet debugging, and verification checklists.</li>
          <li>Dockerfile and docker-compose targets ship a production bundle with SQLite persistence.</li>
          <li>Timestamped logs and test artifacts simplify CI visibility and regression tracking.</li>
        </ul>
      </section>

      <section>
        <h5 className="font-semibold text-sm mb-2 text-foreground">Key Outcomes</h5>
        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
          <li>Launch new AI-driven features by wiring Rivet workflows to PocketBase events with minimal boilerplate.</li>
          <li>Guarantee consistency with shared types across Go, TypeScript, and Rivet definitions.</li>
          <li>Automate validation via full-stack test suites ready for GitHub Actions or other CI providers.</li>
          <li>Enable teams to customize UI/UX while keeping auth, routing, and API layers production-grade.</li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-2">
        {["PocketBase", "Rivet", "React", "TypeScript", "Go", "TanStack Query", "Playwright", "Docker", "shadcn/ui", "Event-Driven", "CI/CD"].map((tech) => (
          <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground font-normal">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
};
