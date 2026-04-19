import React from 'react';
import { useParams, Link } from "react-router-dom";
import { getExperience } from "@/lib/data";
import { ArrowLeft, Building2, Calendar, MapPin, Sparkles } from "lucide-react";
import { useCursor } from "@/context/CursorContext";
import { motion } from "framer-motion";

const ExperiencePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setCursorType } = useCursor();
  const experience = getExperience().find(e => e.slug === slug);

  if (!experience) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <Link 
          to="/experience" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-border px-4 py-2.5 rounded-xl w-fit group"
          onMouseEnter={() => setCursorType('link')}
          onMouseLeave={() => setCursorType('default')}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="tracking-wide">Back to Experience</span>
        </Link>
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Experience not found.</p>
        </div>
      </div>
    );
  }

  const location = experience.period.split('·')[1]?.trim() || '';
  const period = experience.period.split('·')[0]?.trim() || experience.period;

  return (
    <div className="flex flex-col gap-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link 
          to="/experience" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-border px-4 py-2.5 rounded-xl w-fit group"
          onMouseEnter={() => setCursorType('link')}
          onMouseLeave={() => setCursorType('default')}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="tracking-wide">Back to Experience</span>
        </Link>
      </motion.div>
      
      <motion.div 
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div>
          <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground/50 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{period}</span>
            {location && (
              <>
                <span className="text-muted-foreground/30">•</span>
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            {experience.role}
          </h1>
          
          <div className="flex items-center gap-2 text-xl md:text-2xl text-primary font-medium">
            <Building2 className="w-5 h-5" />
            <span>{experience.company}</span>
          </div>
        </div>

        <p className="text-base text-muted-foreground/90 leading-relaxed max-w-3xl">
          {experience.description}
        </p>

        {experience.tags && experience.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {experience.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs font-mono text-muted-foreground/70 bg-muted/30 px-3 py-2 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {experience.accomplishments && experience.accomplishments.length > 0 && (
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Key Projects & Contributions
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experience.accomplishments.map((item, index) => (
              <motion.div 
                key={index} 
                className="group relative p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative z-10">
                  <h4 className="font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs font-mono text-muted-foreground/60 bg-muted/30 px-3 py-1.5 rounded-full group-hover:bg-muted/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExperiencePage;