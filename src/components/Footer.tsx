import React from 'react';
import data from '@/lib/data.json';
import { useCursor } from '@/context/CursorContext';

const FooterComponent = () => {
  const { setCursorType } = useCursor();
  
  return (
    <footer className="text-center py-10 px-4 md:px-6 border-t border-border/50 mt-8">
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{data.footer.title}</h3>
      <a
        href={`mailto:${data.footer.email}`}
        className="text-primary hover:underline"
        onMouseEnter={() => setCursorType('link')}
        onMouseLeave={() => setCursorType('default')}
      >
        {data.footer.cta}
      </a>
    </footer>
  );
};

export const Footer = React.memo(FooterComponent);
