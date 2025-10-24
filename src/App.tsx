import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CursorProvider } from "./context/CursorContext";
import TerminalCursor from "./components/TerminalCursor";
import { appRouteConfig, type AppRouteConfig } from "@/lib/routes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CursorProvider>
        <TerminalCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <main className="bg-background text-foreground">
            <Routes>{renderRoutes(appRouteConfig)}</Routes>
          </main>
        </BrowserRouter>
      </CursorProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

function renderRoutes(routes: AppRouteConfig[], parentKey = "root") {
  return routes.map((route, index) => {
    const keyBase = `${parentKey}-${index}`;

    if (route.index) {
      const Element = route.component;
      const element = route.redirectTo
        ? <Navigate to={route.redirectTo} replace />
        : Element
          ? <Element />
          : null;

      return <Route key={`${keyBase}-index`} index element={element} />;
    }

    const Element = route.component;
    const element = route.redirectTo
      ? <Navigate to={route.redirectTo} replace />
      : Element
        ? <Element />
        : null;

    return (
      <Route key={`${keyBase}-${route.path ?? "pathless"}`} path={route.path} element={element}>
        {route.children ? renderRoutes(route.children, `${keyBase}-child`) : null}
      </Route>
    );
  });
}
