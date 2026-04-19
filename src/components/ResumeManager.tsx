import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, Users, Wand2, Shield, Download, Layers, ChevronLeft, ChevronRight } from "lucide-react";

const screenshots = [
    {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
        alt: "Dashboard overview"
    },
    {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        alt: "Editor interface"
    },
    {
        src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop",
        alt: "Analytics view"
    }
];

export const ResumeManager = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % screenshots.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };

    return (
        <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
        >
            <div className="flex flex-col gap-8">
                <div className="relative overflow-hidden rounded-2xl bg-muted/30 aspect-video">
                    {screenshots.map((screenshot, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-500 ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <img 
                                src={screenshot.src} 
                                alt={screenshot.alt}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                    
                    <button 
                        onClick={prevSlide}
                        aria-label="Previous slide"
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={nextSlide}
                        aria-label="Next slide"
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {screenshots.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentSlide ? 'bg-foreground w-4' : 'bg-foreground/50'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                
                <p className="text-lg text-muted-foreground/80 max-w-3xl leading-relaxed">
                    A full-stack, feature-rich application for creating, managing, and optimizing professional resumes. Think of it as your personal resume command center — build once, export anywhere, and let AI help you tailor your story for every opportunity.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">Rich Text Editor</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Clean, intuitive editing with real-time preview. Focus on your content, not the formatting.
                        </p>
                    </div>
                    
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <Layers className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">Handlebars Templates</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Professional, ATS-friendly PDF exports that look great on any device.
                        </p>
                    </div>
                    
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">Multiple Profiles</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Maintain different versions for different roles — one resume doesn't fit all.
                        </p>
                    </div>
                    
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <Download className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">JSON Resume Standard</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Import/export compatibility with the global resume ecosystem.
                        </p>
                    </div>
                    
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <Wand2 className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">AI Enhancements</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Let AI help polish your content, suggest improvements, and tailor for specific jobs.
                        </p>
                    </div>
                    
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">Secure by Design</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            NextAuth.js handles authentication while your data stays encrypted.
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                    {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "PostgreSQL", "Prisma ORM", "NextAuth.js", "OpenAI API"].map((tech) => (
                        <span 
                            key={tech} 
                            className="text-xs font-mono text-muted-foreground/60 bg-muted/30 px-3 py-1.5 rounded-lg"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
