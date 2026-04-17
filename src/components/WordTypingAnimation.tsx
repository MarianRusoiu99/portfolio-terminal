import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface IWordTypingAnimationProps {
  words: string[];
  className?: string;
  delay?: number;
}

export default function WordTypingAnimation({ words, className, delay = 0 }: IWordTypingAnimationProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        }, 50); // Delete speed
      }
    } else {
      if (displayText.length === currentWord.length) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause before deleting
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        }, 100); // Type speed
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <motion.span>{displayText}</motion.span>
      <span className="animate-blink inline-block w-2.5 h-6 bg-primary mx-1 -mb-0.5 opacity-80"></span>
    </span>
  );
}
