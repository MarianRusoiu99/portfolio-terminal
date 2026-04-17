import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Code2, Wrench, Mail, User } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const tabRoutes = [
  { value: "about", label: "About", path: "/", icon: User },
  { value: "projects", label: "Projects", path: "/projects", icon: Code2 },
  { value: "experience", label: "Experience", path: "/experience", icon: Briefcase },
  { value: "skills", label: "Skills", path: "/skills", icon: Wrench },
  { value: "contact", label: "Contact", path: "/contact", icon: Mail },
];

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let activeValue = "about";
  if (location.pathname.startsWith("/projects")) activeValue = "projects";
  else if (location.pathname.startsWith("/experience")) activeValue = "experience";
  else if (location.pathname.startsWith("/skills")) activeValue = "skills";
  else if (location.pathname.startsWith("/contact")) activeValue = "contact";

  const handleTabChange = (nextValue: string) => {
    const target = tabRoutes.find((route) => route.value === nextValue);
    if (!target) return;
    navigate(target.path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden font-sans">
      {/* Ambient background glows for Editorial feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="flex-1 flex max-w-[1200px] mx-auto w-full relative">
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-6 pb-24 md:pt-10 md:pb-32 flex flex-col gap-10 md:gap-14 mb-6 md:mr-32 lg:mr-48">
          <div className="flex flex-col gap-4 w-full">
            <Hero />
          </div>

          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Floating Sticky Navigation at the Right */}
        <aside className="hidden md:flex fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 z-50">
          <nav className="flex flex-col gap-3 items-center">
            {tabRoutes.map((route) => {
              const isActive = activeValue === route.value;
              const isContact = route.value === "contact";
              const Icon = route.icon;
              
              return (
                <motion.button
                  key={route.value}
                  onClick={() => handleTabChange(route.value)}
                  className={`group relative h-[56px] flex items-center outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden rounded-full transition-colors ${
                    isActive
                      ? "text-primary-foreground bg-primary"
                      : "text-muted-foreground hover:text-primary bg-secondary/10 hover:bg-secondary/30"
                  }`}
                  initial={false}
                  animate={{
                    width: isActive ? 140 : 56,
                  }}
                  whileHover={{
                    width: 140,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicatorDesktop"
                      className="absolute inset-0 shadow-[0_0_20px_rgba(168,85,247,0.3)] rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  
                  <div className={`absolute flex items-center justify-center transition-all duration-300 z-10 ${isActive ? 'left-4' : 'left-1/2 -translate-x-1/2 group-hover:left-4 group-hover:-translate-x-0'}`}>
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    {isContact && !isActive && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse border border-background" />}
                  </div>
                  
                  <span 
                    className={`absolute left-12 whitespace-nowrap text-sm font-semibold tracking-wide pointer-events-none z-10 transition-all duration-200 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0'}`}
                  >
                    {route.label}
                  </span>
                </motion.button>
              );
            })}
          </nav>
        </aside>
      </div>

      {/* Mobile Sticky Navigation at the Bottom */}
      <div className="md:hidden fixed bottom-6 z-50 w-full flex justify-center px-4 pointer-events-none">
        <nav className="flex items-center gap-1 p-1.5 bg-background/80 backdrop-blur-xl border border-white/5 shadow-2xl rounded-full overflow-x-auto max-w-full pointer-events-auto">
          {tabRoutes.map((route) => {
            const isActive = activeValue === route.value;
            const isContact = route.value === "contact";
            const Icon = route.icon;
            
            return (
              <button
                key={route.value}
                onClick={() => handleTabChange(route.value)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center gap-2 ${
                  isActive && !isContact
                    ? "text-white"
                    : "text-primary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicatorMobile"
                    className="absolute inset-0 bg-primary shadow-sm rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className={`${isActive ? 'inline-block' : 'hidden sm:inline-block'}`}>{route.label}</span>
                  {isContact && !isActive && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
