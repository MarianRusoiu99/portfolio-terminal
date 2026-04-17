import React from "react";
import data from "@/lib/data.json";
import { useCursor } from "@/context/CursorContext";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail } from "lucide-react";

const FooterComponent = () => {
  const { setCursorType } = useCursor();
  
  return (
    <footer className="w-full max-w-3xl mx-auto px-4 pb-10 mt-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-2xl bg-secondary/10 border border-white/5 relative"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground">{data.contact.title}</h2>
          
          <motion.a
            href={`mailto:${data.contact.email}`}
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/90 text-primary-foreground hover:bg-primary transition-all text-sm font-medium"
          >
            <span>Say hello</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
        
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${data.contact.email}`}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
            >
              <Mail className="w-3.5 h-3.5 text-primary/70" />
              <span className="font-mono text-xs">{data.contact.email}</span>
            </a>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary/70" />
              <span className="font-mono text-xs">{data.contact.location.split(",")[0]}</span>
            </div>
          </div>
          <div className="font-mono text-xs text-muted-foreground/50">
            © {new Date().getFullYear()}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export const Footer = React.memo(FooterComponent);