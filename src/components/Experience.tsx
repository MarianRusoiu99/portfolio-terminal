import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import data from "@/lib/data.json";
import { ArrowUpRight, Building2, Calendar } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

const ExperienceComponent = () => {
  const { setCursorType } = useCursor();

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="mb-1">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Experience</h2>
        <p className="text-base text-muted-foreground/80">My professional journey in tech.</p>
      </div>

      <div className="flex flex-col gap-10">
        {data.experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              to={`/experience/${exp.slug}`}
              className="group flex flex-col md:flex-row gap-6 md:gap-12 relative"
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
            >
              <div className="md:w-1/3 shrink-0 pt-1">
                <span className="text-sm font-mono text-muted-foreground/60 group-hover:text-primary transition-colors">
                  {exp.period}
                </span>
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors mb-1 inline-flex items-center gap-2">
                  {exp.role}
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h4>
                <div className="text-base text-primary/80 font-medium mb-4">
                  {exp.company}
                </div>
                
                <p className="text-base text-muted-foreground/80 mb-6 leading-relaxed">
                  {exp.description}
                </p>
                
                {exp.tags && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {exp.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {exp.tags.length > 4 && (
                      <span
                        className="text-xs font-mono text-muted-foreground/50 px-3 py-1.5"
                      >
                        +{exp.tags.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const Experience = React.memo(ExperienceComponent);