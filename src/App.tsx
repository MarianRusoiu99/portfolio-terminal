import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CursorProvider } from "./context/CursorContext";
import TerminalCursor from "./components/TerminalCursor";
import Layout from "./components/Layout";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import Project from "./pages/Project";
import ExperiencePage from "./pages/ExperiencePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CursorProvider>
        <TerminalCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <main className="bg-background text-foreground min-h-screen">
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects/:slug" element={<Project />} />
                <Route path="/experience/:slug" element={<ExperiencePage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CursorProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
