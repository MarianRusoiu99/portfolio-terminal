import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const TerminalCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const width = useSpring(12, springConfig);
  const height = useSpring(12, springConfig);
  const borderRadius = useSpring(4, springConfig);
  const opacity = useSpring(0, { damping: 25, stiffness: 300 });
  const scale = useSpring(1, { damping: 20, stiffness: 400 });
  
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    opacity.set(1);

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, input, select, textarea, [role="button"], [data-interactive="true"]');
      
      if (interactive) {
        setIsHovered(true);
        const rect = interactive.getBoundingClientRect();
        
        mouseX.set(rect.left + rect.width / 2);
        mouseY.set(rect.top + rect.height / 2);
        
        const padding = 12;
        width.set(rect.width + padding);
        height.set(rect.height + padding);
        
        // Get the element's actual border-radius
        const computedStyle = window.getComputedStyle(interactive);
        const br = parseFloat(computedStyle.borderRadius) || 0;
        
        // If element has rounded corners (> 8px), follow that curve
        // If element has straight/slight corners, use a subtle rounded (8px)
        if (br > 8) {
          borderRadius.set(br + padding / 4); // Follow the curve
        } else {
          borderRadius.set(8); // Subtle rounded, not pill
        }
      } else {
        setIsHovered(false);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        width.set(12);
        height.set(12);
        borderRadius.set(4);
      }
    };

    const handleMouseDown = () => scale.set(0.85);
    const handleMouseUp = () => scale.set(1);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, width, height, borderRadius, opacity, scale]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        width,
        height,
        scale,
        translateX: '-50%',
        translateY: '-50%',
        borderRadius,
        opacity,
        backgroundColor: isHovered ? 'hsla(var(--primary) / 0.15)' : 'hsl(var(--primary))',
        border: isHovered ? '2px solid hsl(var(--primary))' : '0px solid transparent',
        boxShadow: isHovered ? '0 0 15px hsla(var(--primary) / 0.2)' : '0 0 10px hsla(var(--primary) / 0.4)',
      }}
    />
  );
};

export default TerminalCursor;
