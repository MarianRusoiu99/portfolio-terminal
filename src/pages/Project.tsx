import React from 'react';
import { useParams, Link } from "react-router-dom";
import { BrowserDiff } from "@/components/BrowserDiff";

import { PocketAI } from "@/components/PocketAI";
import { ArrowLeft, Minimize2, Maximize2, X } from "lucide-react";
import data from "@/lib/data.json";
import { useCursor } from '@/context/CursorContext';

const componentMap = {
  BrowserDiff,
  PocketAI,
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setCursorType } = useCursor();
  const project = data.projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Project not found. <Link to="/" className="underline">Go back</Link></p>
      </div>
    );
  }

  const ProjectComponent = componentMap[project.component as keyof typeof componentMap];

  return (
    <div className="flex justify-center p-2 sm:p-4 md:p-8">
      <div className="w-full max-w-5xl min-h-[80vh] bg-card/50 border border-border rounded-lg shadow-2xl shadow-black/50 overflow-hidden">
        <div className="h-8 bg-secondary flex items-center justify-between px-4 border-b border-border">
          <p className="text-sm text-muted-foreground">
            ~/projects/{project.slug}
          </p>
          <div className="flex items-center gap-2">
            <Minimize2 className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            <Maximize2 className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            <Link to="/">
              <X className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
            </Link>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
            >
              <ArrowLeft size={16} />
              cd ..
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
              >
                <span className="uppercase tracking-wide">git</span>
                <span>{project.githubUrl}</span>
              </a>
            )}
          </div>
          {ProjectComponent ? <ProjectComponent /> : (
            <div>
              <h1 className="text-2xl font-bold text-accent">{project.name}</h1>
              <p className="text-muted-foreground mt-2">{project.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
