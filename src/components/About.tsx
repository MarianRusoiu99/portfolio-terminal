import React from "react";
import { motion } from "framer-motion";
import TypingAnimation from "./TypingAnimation";
import data from "@/lib/data.json";

const AboutComponent = () => {
  return (
    <div className="flex flex-col gap-10 relative group max-w-4xl">
      <div className="absolute -left-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground relative z-10 text-left">
          About Me
        </h2>
        
        <div className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed font-light relative z-10 space-y-6">
          <p className="">
            <TypingAnimation text={data.about} />
          </p>
          <p className="text-base text-muted-foreground/60 italic pt-8 border-t border-white/5 mt-8">
            // When I'm not coding, I'm usually exploring new design patterns or diving into open-source.
          </p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 relative z-10 shadow-2xl mt-4"
      >
        <img 
          src={data.avatar} 
          alt={data.name} 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
        />
      </motion.div>
    </div>
  );
};

export const About = React.memo(AboutComponent);