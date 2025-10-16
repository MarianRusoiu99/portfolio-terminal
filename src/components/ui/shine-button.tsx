import React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

const ShineButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          "bg-gradient-to-r from-accent to-purple-600 text-accent-foreground",
          "hover:shadow-[0_0_20px_theme(colors.accent.DEFAULT)] transition-shadow duration-300",
          className,
        )}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div
          className="absolute inset-0 z-0 h-full w-full animate-background-pan bg-[linear-gradient(to_right,transparent,white,transparent)] bg-[length:200%_100%] opacity-20"
          aria-hidden="true"
        />
      </Button>
    );
  },
);

ShineButton.displayName = "ShineButton";

export { ShineButton };
