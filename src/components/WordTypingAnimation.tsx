import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface IWordTypingAnimationProps {
  words: string[];
  className?: string;
  delay?: number;
}

export default function WordTypingAnimation({ words, className, delay = 0 }: IWordTypingAnimationProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => words[wordIndex].slice(0, latest));

  useEffect(() => {
    const text = words[wordIndex];
    const controls = animate(count, text.length, {
      type: "tween",
      delay: delay,
      duration: text.length * 0.08,
      ease: "linear",
      onComplete: () => {
        setTimeout(() => {
          const backspaceControls = animate(count, 0, {
            type: "tween",
            duration: text.length * 0.05,
            ease: "linear",
            onComplete: () => {
              setWordIndex((prev) => (prev + 1) % words.length);
            }
          });
          return backspaceControls.stop;
        }, 1000); // Pause before deleting
      }
    });
    return controls.stop;
  }, [wordIndex, words, count, delay]);

  return (
    <span className={cn("inline-block", className)}>
      <motion.span>{displayText}</motion.span>
      <span className="animate-blink inline-block w-2 h-5 bg-foreground ml-1 -mb-1"></span>
    </span>
  );
}
