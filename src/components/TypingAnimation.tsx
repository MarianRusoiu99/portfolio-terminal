import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ITypingAnimationProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TypingAnimation({ text, className, delay = 0 }: ITypingAnimationProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      delay: delay,
      duration: text.length * 0.03, // Faster typing
      ease: "linear",
    });
    return controls.stop;
  }, [text.length, count, delay]);

  return (
    <span className={cn(className)}>
      <motion.span>{displayText}</motion.span>
    </span>
  );
}
