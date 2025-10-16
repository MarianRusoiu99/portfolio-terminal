import React from 'react';
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Minimize2, Maximize2, X } from "lucide-react";
import data from "@/lib/data.json";
import { useCursor } from '@/context/CursorContext';
import { Badge } from '@/components/ui/badge';

const ExperiencePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setCursorType } = useCursor();
  const experience = data.experience.find(e => e.slug === slug);

  if (!experience) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Experience not found. <Link to="/" className="underline">Go back</Link></p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-2 sm:p-4 md:p-8">
      <div className="w-full max-w-5xl min-h-[80vh] bg-card/50 border border-border rounded-lg shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
        <div className="h-8 bg-secondary flex items-center justify-between px-4 border-b border-border flex-shrink-0">
          <p className="text-sm text-muted-foreground">
            ~/experience/{experience.slug}
          </p>
          <div className="flex items-center gap-2">
            <Minimize2 className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            <Maximize2 className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            <Link to="/">
              <X className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
            </Link>
          </div>
        </div>
        <div className="p-4 md:p-6 flex-grow overflow-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            onMouseEnter={() => setCursorType('link')}
            onMouseLeave={() => setCursorType('default')}
          >
            <ArrowLeft size={16} />
            cd ..
          </Link>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary">{experience.role}</h1>
            <h2 className="text-lg text-foreground">{experience.company}</h2>
            <p className="text-sm text-muted-foreground mt-1">{experience.period}</p>
            <p className="mt-4 max-w-3xl">{experience.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Key Projects & Contributions</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {experience.accomplishments.map((item, index) => (
                <div key={index} className="bg-secondary/50 p-4 rounded-md border border-border/50">
                  <h4 className="font-bold text-accent">{item.title}</h4>
                  <p className="text-sm mt-2 mb-4 text-muted-foreground">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-background/80 text-secondary-foreground font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
