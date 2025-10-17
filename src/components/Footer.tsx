import React from 'react';
import data from '@/lib/data.json';
import { useCursor } from '@/context/CursorContext';
import { motion } from 'framer-motion';

const FooterComponent = () => {
   const { setCursorType } = useCursor();
  return (
    <section id="contact" className="py-16 px-4 sm:py-20 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-left"
      >
        <h2 className="text-2xl md:text-3xl mb-4">{data.contact.title}</h2>
        <p className="text-lg max-w-2xl mb-8 text-muted-foreground">
          {data.contact.description}
        </p>
        <div className="flex items-center justify-start gap-2">
            <span className="text-primary">$</span>
            <a 
              href={`mailto:${data.contact.email}`} 
              className="text-foreground hover:text-primary hover:underline flex items-center gap-2 blinking-cursor"
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
            >
                {data.contact.command}
            </a>
        </div>
      </motion.div>
    </section>
  );
};

export const Footer = React.memo(FooterComponent);
