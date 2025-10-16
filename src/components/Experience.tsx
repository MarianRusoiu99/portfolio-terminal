import React from "react";
import { Link } from "react-router-dom";
import data from "@/lib/data.json";
import { Badge } from "@/components/ui/badge";
import { useCursor } from "@/context/CursorContext";

const ExperienceComponent = () => {
  const { setCursorType } = useCursor();

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-primary">$</span>
        <p className="text-foreground">cat ./experience.log</p>
      </div>
      <div className="relative space-y-8">
        {data.experience.map((exp, index) => (
          <Link
            to={`/experience/${exp.slug}`}
            key={index}
            className="block pl-4 border-l-2 border-border/30 hover:border-primary transition-colors"
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
          >
            <p className="text-sm text-muted-foreground">{exp.period}</p>
            <h4 className="font-bold text-primary">{exp.role}</h4>
            <p className="text-foreground">{exp.company}</p>
            <p className="text-sm mt-2 text-muted-foreground">{exp.description}</p>
            {exp.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-secondary/80 text-secondary-foreground font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const Experience = React.memo(ExperienceComponent);
