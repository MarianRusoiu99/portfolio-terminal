import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { useCursor } from '@/context/CursorContext';
import { cn } from '@/lib/utils';

const TerminalCursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const { cursorType } = useCursor();

  const variants = {
    default: {
      x: x - 4,
      y: y - 8,
      width: '8px',
      height: '1.25rem',
      backgroundColor: 'hsl(var(--foreground))',
      opacity: 1,
      transition: { type: 'tween', ease: 'linear', duration: 0.05 },
    },
    link: {
      x: x - 4,
      y: y - 8,
      width: '8px',
      height: '1.25rem',
      backgroundColor: 'hsl(var(--accent))',
      opacity: 1,
      transition: { type: 'tween', ease: 'linear', duration: 0.05 },
    },
  };

  return (
    <motion.div
      className={cn(
        'fixed top-0 left-0 z-[9999] pointer-events-none',
        'animate-blink'
      )}
      variants={variants}
      animate={cursorType}
    />
  );
};

export default TerminalCursor;
