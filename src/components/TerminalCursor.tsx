import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { useCursor } from '@/context/CursorContext';
import { cn } from '@/lib/utils';

const TerminalCursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const { cursorType } = useCursor();

  const isLink = cursorType === 'link';

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-foreground z-[9999] pointer-events-none"
        animate={{
          x: x - 4,
          y: y - 4,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {isLink && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 z-[9998] pointer-events-none"
          animate={{
            x: x - 16,
            y: y - 16,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      )}
    </>
  );
};

export default TerminalCursor;