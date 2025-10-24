import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Minimize2, Maximize2, X } from "lucide-react";
import { useCursor } from "@/context/CursorContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { tabRoutes, defaultTabRoute } from "@/lib/routes";

const Index = () => {
  const { setCursorType } = useCursor();
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = tabRoutes.find((route) => route.href === location.pathname) ?? defaultTabRoute;
  const fallbackValue = defaultTabRoute?.value ?? tabRoutes[0]?.value ?? "";
  const activeValue = activeTab?.value ?? fallbackValue;

  const handleTabChange = (nextValue: string) => {
    const target = tabRoutes.find((route) => route.value === nextValue);
    if (!target) {
      return;
    }

    navigate(target.href);
  };

  return (
    <div className="flex justify-center p-2 sm:p-4 md:p-8">
      <div className="w-full max-w-5xl min-h-[80vh] bg-card/50 border border-border rounded-lg shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
        <div className="h-8 bg-secondary flex items-center justify-between px-4 border-b border-border flex-shrink-0">
          <p className="text-sm text-muted-foreground">~ (zsh)</p>
          <div className="flex items-center gap-2">
            <Minimize2 className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            <Maximize2 className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            <X className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
          </div>
        </div>

        <ScrollArea className="flex-grow">
          <div className="p-4 md:p-6">
            <Hero />
          </div>

          <Tabs value={activeValue} onValueChange={handleTabChange} className="w-full">
            {/* Desktop Tabs */}
            <div className="hidden md:block sticky top-0 z-10 bg-card/90 backdrop-blur-sm border-y border-border">
              <ScrollArea className="w-full whitespace-nowrap">
                <TabsList
                  className="bg-transparent p-0 h-12 w-full justify-start px-4 md:px-6"
                  onMouseEnter={() => setCursorType("link")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  {tabRoutes.map((route) => (
                    <TabsTrigger
                      key={route.value}
                      value={route.value}
                      className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4"
                    >
                      {route.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>
            </div>
            
            {/* Mobile Tabs */}
            <div className="block md:hidden sticky top-0 z-10 bg-card/90 backdrop-blur-sm border-y border-border px-4 py-2">
               <TabsList
                  className="bg-transparent p-0 h-auto w-full flex-col items-start"
                  onMouseEnter={() => setCursorType("link")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  {tabRoutes.map((route) => (
                    <TabsTrigger
                      key={route.value}
                      value={route.value}
                      className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-foreground h-10 rounded-none border-l-2 border-transparent data-[state=active]:border-primary justify-start w-full"
                    >
                      {route.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
            </div>

            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </Tabs>
          
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;
