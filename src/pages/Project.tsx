import React from 'react';
import { useParams, Link } from "react-router-dom";
import { ResumeManager } from "@/components/ResumeManager";
import data from "@/lib/data.json";
import { useCursor } from '@/context/CursorContext';
import { Github, ExternalLink, ArrowLeft } from "lucide-react";

const componentMap = {
  ResumeManager
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setCursorType } = useCursor();
  const project = data.projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit group"
          onMouseEnter={() => setCursorType('link')}
          onMouseLeave={() => setCursorType('default')}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-medium text-sm tracking-wide">Back to Projects</span>
        </Link>
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Project not found.</p>
        </div>
      </div>
    );
  }

  const ProjectComponent = componentMap[project.component as keyof typeof componentMap];

  return (
    <div className="flex flex-col gap-8 w-full">
      <Link 
        to="/projects" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit group"
        onMouseEnter={() => setCursorType('link')}
        onMouseLeave={() => setCursorType('default')}
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        <span className="font-medium text-sm tracking-wide">Back to Projects</span>
      </Link>
      
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {project.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-secondary/50 px-4 py-2 rounded-full border border-border"
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
            >
              <Github size={16} />
              <span>View Source</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors px-4 py-2 rounded-full shadow-lg shadow-primary/20"
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
        <p className="text-lg md:text-xl text-muted-foreground/90 max-w-3xl mt-4 leading-relaxed">
          {project.description}
        </p>
      </div>

      {ProjectComponent ? (
        <div className="w-full mt-8">
          <ProjectComponent />
        </div>
      ) : (
        <div className="w-full mt-8 flex items-center justify-center p-12 bg-secondary/20 rounded-3xl border border-white/5">
          <p className="text-muted-foreground text-center">Interactive component not available for this project.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;