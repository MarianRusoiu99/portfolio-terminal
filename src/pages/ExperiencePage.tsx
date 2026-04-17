import React from 'react';
import { useParams, Link } from "react-router-dom";
import data from "@/lib/data.json";
import { ArrowLeft } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

const ExperiencePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setCursorType } = useCursor();
  const experience = data.experience.find(e => e.slug === slug);

  if (!experience) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <Link 
          to="/experience" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit group"
          onMouseEnter={() => setCursorType('link')}
          onMouseLeave={() => setCursorType('default')}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-medium text-sm tracking-wide">Back to Experience</span>
        </Link>
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Experience not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <Link 
        to="/experience" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit group"
        onMouseEnter={() => setCursorType('link')}
        onMouseLeave={() => setCursorType('default')}
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        <span className="font-medium text-sm tracking-wide">Back to Experience</span>
      </Link>
      
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
          {experience.role}
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">
          {experience.company}
        </h2>
        <p className="text-sm font-mono text-muted-foreground mb-6">
          {experience.period}
        </p>
        <p className="text-base text-muted-foreground/90 leading-relaxed max-w-3xl">
          {experience.description}
        </p>
      </div>

      {experience.accomplishments && experience.accomplishments.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold tracking-tight text-foreground mb-6 border-b border-border pb-2">
            Key Projects & Contributions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experience.accomplishments.map((item, index) => (
              <div 
                key={index} 
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors flex flex-col h-full"
              >
                <h4 className="font-semibold text-lg text-foreground mb-3">{item.title}</h4>
                <p className="text-sm text-muted-foreground/90 leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs font-mono text-muted-foreground bg-black/20 px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperiencePage;