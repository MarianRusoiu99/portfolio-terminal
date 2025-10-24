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
          <div key={project.slug} className="pl-4 border-l-2 border-transparent hover:border-primary transition-colors">
            <Link 
              to={`/projects/${project.slug}`} 
              className="block"
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
            >
              <p className="text-sm text-muted-foreground">{project.period}</p>
              <h4 className="font-bold text-primary">{project.name}</h4>
              <p className="text-foreground">{project.description}</p>
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
                onClick={(event) => event.stopPropagation()}
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
              >
                <span className="text-primary">git</span>
                <span>{project.githubUrl}</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Projects = React.memo(ProjectsComponent);
