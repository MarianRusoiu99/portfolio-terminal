import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjects } from "@/lib/data";
import { useCursor } from "@/context/CursorContext";
import { ArrowUpRight, Github, ExternalLink, Folder } from "lucide-react";

const ProjectsComponent = () => {
  const { setCursorType, setCursorImage } = useCursor();
  const projects = getProjects();

  const handleMouseEnter = (image?: string) => {
    setCursorType('link');
    setCursorImage(image || null);
  };

  const handleMouseLeave = () => {
    setCursorType('default');
    setCursorImage(null);
  };

  const handleClick = () => {
    setCursorType('default');
    setCursorImage(null);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Projects</h2>
        <p className="text-base text-muted-foreground/80">Recent work and personal projects.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          >
            <Link
              to={`/projects/${project.slug}`}
              className="group relative block p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-500"
              onMouseEnter={() => handleMouseEnter(project.image)}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                <div className="md:w-1/3 shrink-0">
                  <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors">
                    <Folder className="w-4 h-4" />
                    <span>{project.period}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-4">
                    {project.githubUrl && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary transition-colors">
                        <Github className="w-4 h-4" />
                        <span>Source</span>
                      </span>
                    )}
                    {project.liveUrl && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>Live</span>
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h4>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  
                  <p className="text-base text-muted-foreground/80 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <motion.div 
          className="flex flex-col items-center justify-center py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-4">
            <Folder className="w-8 h-8 text-muted-foreground/30" />
          </div>
          <p className="text-muted-foreground">No projects to display yet.</p>
        </motion.div>
      )}
    </div>
  );
};

export const Projects = React.memo(ProjectsComponent);