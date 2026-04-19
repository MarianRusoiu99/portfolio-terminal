import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowRight, Moon, Sun } from "lucide-react";
import WordTypingAnimation from "./WordTypingAnimation";
import { getName, getSecondaryHeadlines, getSocials, getContact } from "@/lib/data";
import { useCursor } from "@/context/CursorContext";
import { useTheme } from "@/context/ThemeContext";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export const Hero = () => {
  const { setCursorType } = useCursor();
  const { theme, toggleTheme } = useTheme();
  const name = getName();
  const secondaryHeadlines = getSecondaryHeadlines();
  const socials = getSocials();
  const contact = getContact();

  return (
    <section className="w-full relative pb-10 max-w-3xl lg:max-w-4xl">
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-medium w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for work
          </div>
          <button
            onClick={toggleTheme}
            className="relative w-12 h-6 rounded-full bg-secondary/50 border border-border/50 cursor-pointer"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
<span className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center transition-all duration-200 ${theme === "dark" ? "left-[26px]" : "left-0.5"}`}>
                {theme === "dark" ? <Moon className="w-4 h-4 text-background" /> : <Sun className="w-4 h-4 text-background" />}
              </span>
          </button>
        </motion.div>

        <div className="flex flex-col gap-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground pb-2 transition-colors duration-300 hover:text-primary cursor-pointer"
          >
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {name}
            </Link>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary font-medium font-mono flex items-center mt-2"
          >
            <span className="text-muted-foreground/40 font-light mr-1">{`<`}</span>
            <WordTypingAnimation words={secondaryHeadlines} delay={1.2} />
            <span className="text-muted-foreground/40 font-light">{`/>`}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-3 items-center mt-6"
        >
          {socials.map((link, i) => {
            const Icon = iconMap[link.label as keyof typeof iconMap];
            return (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
                className="flex items-center justify-center p-2.5 rounded-full bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border/50 transition-all"
                aria-label={link.label}
              >
                {Icon && <Icon className="w-4 h-4" />}
              </motion.a>
            );
          })}

          <motion.a
            href={`mailto:${contact.email}`}
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/20 transition-all duration-300 font-medium text-sm border border-border/30"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};