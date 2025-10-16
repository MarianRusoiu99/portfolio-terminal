import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TypingAnimation from "./TypingAnimation";
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
    <section className="w-full flex flex-col items-start text-left">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className="flex justify-start mb-6"
      >
        <Avatar className="w-24 h-24 lg:w-28 lg:h-28 border-2 border-foreground/50">
          <AvatarImage src={data.avatar} alt={data.name} />
          <AvatarFallback>{data.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </motion.div>
      
      <h1 className="mb-2 text-3xl md:text-5xl font-bold">
        <TypingAnimation text={data.headline} />
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground mb-6 min-h-[28px]">
        <WordTypingAnimation words={data.secondaryHeadline} delay={1.5} />
      </p>

      <div className="flex gap-4 justify-start">
        {data.socials.map((link, i) => {
          const Icon = iconMap[link.label as keyof typeof iconMap];
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 + i * 0.1 }}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors block p-2"
                aria-label={link.label}
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
              >
                {Icon && <Icon className="h-5 w-5" />}
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
