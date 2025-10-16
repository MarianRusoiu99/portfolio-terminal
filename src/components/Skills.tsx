import React from "react";
import { motion } from "framer-motion";
import data from "@/lib/data.json";
import { useCursor } from "@/context/CursorContext";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.03 * index,
    },
  }),
};

const SkillsComponent = () => {
  const { setCursorType } = useCursor();
  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-primary">$</span>
        <p className="text-foreground">less ./skills.json</p>
      </div>
      <div 
        className="flex flex-wrap justify-start gap-x-4 gap-y-2"
        onMouseEnter={() => setCursorType('default')}
        onMouseLeave={() => setCursorType('default')}
      >
        <span className="text-muted-foreground">{`[`}</span>
        {data.skills.map((skill, index) => (
          <motion.div
            key={skill}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            className="flex items-center"
          >
            <span className="text-accent">"{skill}"</span>
            {index < data.skills.length - 1 && <span className="text-muted-foreground">,</span>}
          </motion.div>
        ))}
        <span className="text-muted-foreground">{`]`}</span>
      </div>
    </div>
  );
};

export const Skills = React.memo(SkillsComponent);
