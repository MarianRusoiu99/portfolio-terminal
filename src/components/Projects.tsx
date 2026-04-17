import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import data from "@/lib/data.json";
import { useCursor } from "@/context/CursorContext";
import { ArrowUpRight, Github, CalendarDays, ExternalLink } from "lucide-react";

const ProjectsComponent = () => {
  const { setCursorType } = useCursor();

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="mb-1">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Projects</h2>
        <p className="text-base text-muted-foreground/80">Recent work and personal projects.</p>
      </div>

      <div className="flex flex-col gap-10">
        {data.projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              to={`/projects/${project.slug}`}
              className="group flex flex-col md:flex-row gap-8 md:gap-16 relative"
              onMouseEnter={() => setCursorType('link')}
              onMouseLeave={() => setCursorType('default')}
            >
              <div className="md:w-1/3 shrink-0 pt-1">
                <span className="text-base font-mono text-muted-foreground/60 group-hover:text-primary transition-colors">
                  {project.period}
                </span>
                
                <div className="mt-6 flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground/60 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground/60 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors mb-4 inline-flex items-center gap-2">
                  {project.name}
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h4>
                
                <p className="text-base text-muted-foreground/80 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const Projects = React.memo(ProjectsComponent);