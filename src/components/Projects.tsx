import React from "react";
import { Link } from "react-router-dom";
import data from "@/lib/data.json";
import { useCursor } from "@/context/CursorContext";

const ProjectsComponent = () => {
  const { setCursorType } = useCursor();

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-primary">$</span>
        <p className="text-foreground">ls -l ./projects</p>
      </div>
      <div 
        className="relative space-y-6"
      >
        {data.projects.map((project) => (
          <Link 
            to={`/projects/${project.slug}`} 
            key={project.slug} 
            className="block pl-4 border-l-2 border-transparent hover:border-primary transition-colors"
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
          >
            <p className="text-sm text-muted-foreground">{project.period}</p>
            <h4 className="font-bold text-primary">{project.name}</h4>
            <p className="text-foreground">{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const Projects = React.memo(ProjectsComponent);
