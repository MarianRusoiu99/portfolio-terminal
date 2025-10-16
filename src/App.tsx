import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import ExperiencePage from "./pages/ExperiencePage";
import { CursorProvider } from "./context/CursorContext";
import TerminalCursor from "./components/TerminalCursor";

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
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects/:slug" element={<Project />} />
              <Route path="/experience/:slug" element={<ExperiencePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CursorProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
