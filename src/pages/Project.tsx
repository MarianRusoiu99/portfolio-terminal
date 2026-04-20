import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { ResumeManager } from "@/components/ResumeManager";
import { DeveloperPortfolio } from "@/components/DeveloperPortfolio";
import { MinimalPortfolio } from "@/components/MinimalPortfolio";
import { getProjects } from "@/lib/data";
import { useCursor } from '@/context/CursorContext';
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft, Calendar, Folder } from "lucide-react";

const componentMap = {
  ResumeManager,
  DeveloperPortfolio,
  MinimalPortfolio
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setCursorType, setCursorImage } = useCursor();
  const projects = getProjects();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    setCursorType('default');
    setCursorImage(null);
  }, [slug, setCursorType, setCursorImage]);

  if (!project) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-border px-4 py-2.5 rounded-xl w-fit group"
          onMouseEnter={() => setCursorType('link')}
          onMouseLeave={() => setCursorType('default')}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="tracking-wide">Back to Projects</span>
        </Link>
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Project not found.</p>
        </div>
      </div>
    );
  }

  const ProjectComponent = componentMap[project.component as keyof typeof componentMap];

  return (
    <div className="flex flex-col gap-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-border px-4 py-2.5 rounded-xl w-fit group"
          onMouseEnter={() => setCursorType('link')}
          onMouseLeave={() => setCursorType('default')}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="tracking-wide">Back to Projects</span>
        </Link>
      </motion.div>

      <motion.div 
        className="flex flex-col gap-6 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground/60 mb-3">
              <Calendar className="w-4 h-4" />
              <span>{project.period}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {project.name}
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all bg-muted/30 hover:bg-muted/50 px-4 py-2.5 rounded-xl"
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
              >
                <Github size={16} />
                <span>Source</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-all px-4 py-2.5 rounded-xl"
                onMouseEnter={() => setCursorType('link')}
                onMouseLeave={() => setCursorType('default')}
              >
                <ExternalLink size={16} />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl leading-relaxed">
          {project.description}
        </p>
      </motion.div>

      {ProjectComponent ? (
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ProjectComponent />
        </motion.div>
      ) : (
        <motion.div 
          className="w-full flex items-center justify-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-muted-foreground/50 text-lg">No additional content available</p>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectPage;