import React from "react";
import { motion } from "framer-motion";
import { getSkills } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const SkillsComponent = () => {
  const skills = getSkills();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="mb-1">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Skills</h2>
        <p className="text-base text-muted-foreground/80">Technologies and tools I work with daily.</p>
      </div>

      <div className="relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3 relative z-10"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group"
            >
              <div className="px-4 py-2 text-sm font-medium bg-secondary/30 text-foreground/90 rounded-full border border-border/50 hover:border-primary/30 hover:bg-secondary/50 hover:text-primary transition-all cursor-default flex items-center">
                <span className="font-mono text-xs opacity-50 mr-2 group-hover:text-primary group-hover:opacity-100 transition-colors">{'/>'}</span>
                {skill}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const Skills = React.memo(SkillsComponent);