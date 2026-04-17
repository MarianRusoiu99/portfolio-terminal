import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import WordTypingAnimation from "./WordTypingAnimation";
import data from "@/lib/data.json";
import { useCursor } from "@/context/CursorContext";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export const Hero = () => {
  const { setCursorType } = useCursor();

  return (
    <section className="w-full relative pb-10">
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 text-xs font-medium w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available
        </motion.div>

        <div className="flex flex-col gap-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground pb-2 transition-colors duration-300 hover:text-primary cursor-default"
          >
            {data.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary font-medium font-mono flex items-center mt-2"
          >
            <span className="text-muted-foreground/40 font-light mr-1">{`<`}</span>
            <WordTypingAnimation words={data.secondaryHeadline} delay={1.2} />
            <span className="text-muted-foreground/40 font-light">{`/>`}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-3 items-center mt-6"
        >
          {data.socials.map((link, i) => {
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
                className="flex items-center justify-center p-2.5 rounded-full bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/5 transition-all"
                aria-label={link.label}
              >
                {Icon && <Icon className="w-4 h-4" />}
              </motion.a>
            );
          })}

          <motion.a
            href={`mailto:${data.contact.email}`}
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/20 transition-all duration-300 font-medium text-sm border border-white/10 ml-2"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};