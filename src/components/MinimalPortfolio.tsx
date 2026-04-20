import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { 
    Eye, 
    ChevronLeft, 
    ChevronRight,
    Github,
    Linkedin,
    Mail,
    Code2,
    Cpu,
    Smartphone,
    Layout,
    ArrowUpRight,
    Menu,
    X,
    ExternalLink
} from "lucide-react";
import { getProjects, getSocials } from "@/lib/data";

const CONFIG = {
    brand: {
        name: "John Doe",
        initials: "JD",
        role: "Visual Storyteller & Digital Craftsman",
        location: "Neo-Tokyo, JP",
        availability: "Available for worldwide freelance",
        email: "hello@johndoe.design",
    },
    socials: getSocials().map(s => ({
        name: s.label,
        url: s.href,
        icon: s.label === "GitHub" ? Github : s.label === "LinkedIn" ? Linkedin : Mail
    })),
    skills: [
        { title: 'React & TypeScript', desc: 'Expertise in React, Next.js and complex state management patterns.', icon: <Code2 size={24} /> },
        { title: 'Front-End Engineering', desc: 'Building responsive, high-performance interfaces with pixel precision.', icon: <Layout size={24} /> },
        { title: 'Site Performance', desc: 'Optimization for accessibility, SEO, and lightning fast core web vitals.', icon: <Cpu size={24} /> },
        { title: 'Full-Stack Development', desc: 'End-to-end solutions with modern, clean, and maintainable code.', icon: <Smartphone size={24} /> },
    ],
    projects: getProjects().map((p, i) => ({
        id: i + 1,
        title: p.name,
        category: p.description,
        year: p.period.split(" - ")[0],
        color: ['#3d443f', '#1a2b1f', '#2a241f', '#1f2a2e'][i % 4]
    })),
    bio: "Driven by simplicity and organic digital growth. I build bridges between complex engineering and human-centered design.",
    theme: {
        background: "#0F1412",
        accent: "#D9E3D8",
        muted: "#0A0E0C"
    }
};

export const MinimalPortfolio = () => {
    const [showPreview, setShowPreview] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPos, setDragPos] = useState({ x: 40, y: 40 });
    const dragStartPos = useRef({ x: 0, y: 0 });
    const wasDragging = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % CONFIG.projects.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + CONFIG.projects.length) % CONFIG.projects.length);
    };

    const handleDragStart = useCallback((e: React.PointerEvent) => {
        setIsDragging(true);
        wasDragging.current = false;
        dragStartPos.current = { 
            x: e.clientX - dragPos.x, 
            y: e.clientY - dragPos.y 
        };
    }, [dragPos]);

    const handleDrag = useCallback((e: React.PointerEvent) => {
        if (!isDragging) return;
        wasDragging.current = true;
        setDragPos({
            x: e.clientX - dragStartPos.current.x,
            y: e.clientY - dragStartPos.current.y
        });
    }, [isDragging]);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleBackClick = useCallback((e: React.MouseEvent) => {
        if (wasDragging.current) return;
        setShowPreview(false);
    }, []);

    return (
        <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
        >
            <div className="flex flex-col gap-8">
                <div className="relative overflow-hidden rounded-2xl bg-muted/30 aspect-video">
                    {CONFIG.projects.map((project, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-500 ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div 
                                className="w-full h-full flex items-center justify-center"
                                style={{ backgroundColor: project.color }}
                            >
                                <span className="text-4xl font-light text-white/20 uppercase tracking-wider">
                                    {project.title}
                                </span>
                            </div>
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
                        {CONFIG.projects.map((_, index) => (
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

                <button
                    onClick={() => setShowPreview(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                    <Eye className="w-5 h-5" />
                    <span>Preview Full Portfolio</span>
                </button>
                
                <p className="text-lg text-muted-foreground/80 max-w-3xl leading-relaxed">
                    A sophisticated, minimalist portfolio with organic motion and clean aesthetics. Features smooth cursor interactions, animated blob effects, and a refined color palette.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <Eye className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">Custom Cursor</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Spring-based cursor with hover states and smooth animations.
                        </p>
                    </div>
                    
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <ExternalLink className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">Organic Motion</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Animated SVG blob and fluid interactions throughout.
                        </p>
                    </div>
                    
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <ArrowUpRight className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">Loading Screen</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Elegant entrance animation for polished first impression.
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                    {["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"].map((tech) => (
                        <span 
                            key={tech} 
                            className="text-xs font-mono text-muted-foreground/60 bg-muted/30 px-3 py-1.5 rounded-lg"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9998] bg-background overflow-hidden"
                        ref={containerRef}
                        onPointerMove={handleDrag}
                        onPointerUp={handleDragEnd}
                        onPointerLeave={handleDragEnd}
                    >
                        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                            <PreviewContent onClose={() => setShowPreview(false)} />
                        </div>
                        
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="fixed z-[9999] flex items-center gap-2 px-5 py-3 bg-primary/90 backdrop-blur-xl border border-primary text-primary-foreground rounded-full cursor-grab active:cursor-grabbing transition-colors hover:bg-primary"
                            style={{ 
                                left: dragPos.x, 
                                top: dragPos.y 
                            }}
                            onPointerDown={handleDragStart}
                            onClick={handleBackClick}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Back</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, a, .hover-target')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleHover);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleHover);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#D9E3D8] pointer-events-none z-[9999] hidden md:block"
            animate={{
                x: mousePos.x - 16,
                y: mousePos.y - 16,
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? "rgba(217, 227, 216, 0.1)" : "transparent"
            }}
            transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
        />
    );
};

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Projects', href: '#projects' },
        { name: 'Bio', href: '#bio' },
        { name: 'Services', href: '#services' },
        { name: 'Connect', href: '#connect' }
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0F1412]/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[#D9E3D8] font-medium tracking-widest text-sm"
                >
                    {CONFIG.brand.name.toUpperCase()} | FULL-STACK DEVELOPER
                </motion.div>

                <div className="hidden md:flex space-x-10">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-[#D9E3D8]/60 hover:text-[#D9E3D8] transition-colors text-xs uppercase tracking-widest font-medium"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>

                <button className="md:hidden text-[#D9E3D8]" onClick={onMenuClick}>
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
};

const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [blobOffset, setBlobOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            setBlobOffset({
                x: (e.clientX - window.innerWidth / 2) * 0.08,
                y: (e.clientY - window.innerHeight / 2) * 0.08
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const paths = [
        "M47.5,-63.1C59.9,-54.6,67.3,-38.4,71.2,-21.8C75.1,-5.2,75.4,11.8,69,26.6C62.6,41.4,49.5,54,34.7,62.1C19.9,70.1,3.4,73.6,-13.8,70.9C-31,68.2,-48.9,59.3,-58.9,45.4C-68.9,31.6,-71,12.8,-69.1,-4.9C-67.1,-22.6,-61.1,-39.3,-49.8,-48.1C-38.6,-56.9,-22.1,-57.8,-4.2,-61.8C13.7,-65.8,27.4,-72.8,42.5,-72.5C44.4,-72.5,45.8,-67.7,47.5,-63.1Z",
        "M42.2,-60.2C54.1,-52.3,62.8,-39.5,67.6,-25.2C72.4,-10.9,73.2,4.8,69.5,19.9C65.8,35,57.6,49.4,45.4,59.3C33.2,69.1,17,74.4,0.5,73.7C-16,73,-32,66.3,-44.6,56.1C-57.2,45.9,-66.4,32.2,-70.5,16.8C-74.6,1.4,-73.6,-15.7,-66.6,-29.9C-59.6,-44.1,-46.6,-55.4,-32.8,-62.4C-19,-69.4,-4.4,-72.1,10.1,-69.8C24.6,-67.5,30.3,-68.1,42.2,-60.2Z",
        "M45.7,-65.5C57.4,-57.1,64.2,-41.8,68.4,-26.1C72.6,-10.4,74.1,5.6,70.3,20.8C66.5,36,57.3,50.3,44.6,59.5C31.9,68.7,15.7,72.8,-1.2,74.5C-18.1,76.2,-36.3,75.5,-50.2,67C-64.1,58.5,-73.8,42.3,-78.3,25.2C-82.8,8.1,-82.1,-9.9,-75.4,-25.5C-68.7,-41.1,-56,-54.3,-41.7,-62.1C-27.4,-69.9,-11.5,-72.4,4,-77.9C19.5,-83.4,34,-81.9,45.7,-65.5Z"
    ];

    return (
        <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden pb-12 md:pb-24">
            <motion.div 
                animate={{ x: blobOffset.x, y: blobOffset.y }}
                transition={{ type: "spring", stiffness: 45, damping: 35, mass: 2 }}
                className="absolute top-[-15%] right-[-15%] w-[650px] h-[650px] pointer-events-none md:block hidden"
            >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                    <motion.path 
                        animate={{ d: paths }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="fill-[#3D5245] opacity-20 blur-2xl"
                        transform="translate(100 100)" 
                    />
                    <motion.path 
                        animate={{ d: paths }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="fill-[#3D5245] opacity-25"
                        transform="translate(100 100)" 
                        style={{ shapeRendering: "geometricPrecision" }}
                    />
                </svg>
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <div className="lg:col-span-8">
                        <div className="overflow-hidden mb-2">
                            <motion.span 
                                initial={{ y: "100%" }} 
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                className="block text-xs md:text-sm uppercase tracking-[0.5em] text-[#D9E3D8]/40 font-semibold"
                            >
                                {CONFIG.brand.availability}
                            </motion.span>
                        </div>
                        <h1 className="text-[14vw] lg:text-[10vw] font-light leading-[0.85] text-[#D9E3D8] tracking-tighter uppercase mb-6">
                            <div className="overflow-hidden">
                                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
                                    Digital <span className="italic font-normal opacity-60">Craft</span>
                                </motion.div>
                            </div>
                            <div className="overflow-hidden">
                                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}>
                                    Experience
                                </motion.div>
                            </div>
                        </h1>
                    </div>
                    <div className="lg:col-span-4 lg:pb-6">
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.8 }} className="border-l border-[#D9E3D8]/20 pl-8 space-y-6">
                            <p className="text-[#D9E3D8]/60 text-lg font-light leading-relaxed max-w-sm">
                                I help brands grow by creating sophisticated, high-performance web solutions with an emphasis on <span className="text-[#D9E3D8]">organic motion</span> and clean aesthetics.
                            </p>
                            <div className="flex items-center space-x-6">
                                <a href="#projects" className="group flex items-center space-x-3 text-xs uppercase tracking-widest font-bold text-[#D9E3D8]">
                                    <span className="relative">See Works<span className="absolute bottom-[-4px] left-0 w-full h-px bg-[#D9E3D8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span></span>
                                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="mt-24 border-y border-[#D9E3D8]/10 py-6 overflow-hidden relative">
                <div className="flex items-center">
                    <motion.div 
                        animate={{ x: ["0%", "-50%"] }} 
                        transition={{ duration: 40, ease: "linear", repeat: Infinity }} 
                        className="flex space-x-12 items-center text-[#D9E3D8]/20 uppercase text-[10px] tracking-[0.6em] font-black whitespace-nowrap"
                    >
                        {[...Array(4)].map((_, i) => (
                            <React.Fragment key={i}>
                                <span>React Engineering</span><div className="w-2 h-2 rounded-full bg-[#D9E3D8]/20 flex-shrink-0"></div>
                                <span>Minimalist Design</span><div className="w-2 h-2 rounded-full bg-[#D9E3D8]/20 flex-shrink-0"></div>
                                <span>Sustainable Code</span><div className="w-2 h-2 rounded-full bg-[#D9E3D8]/20 flex-shrink-0"></div>
                                <span>Creative Interaction</span><div className="w-2 h-2 rounded-full bg-[#D9E3D8]/20 flex-shrink-0"></div>
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState<typeof CONFIG.projects[0] | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    return (
        <section id="projects" className="py-48 px-6 relative" onMouseMove={handleMouseMove}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-4">
                    <div className="space-y-4">
                        <h2 className="text-xs uppercase tracking-[0.5em] text-[#D9E3D8]/30">Portfolio</h2>
                        <h3 className="text-6xl md:text-8xl font-light text-[#D9E3D8] tracking-tighter uppercase">Selected <br/><span className="italic opacity-50">Works</span></h3>
                    </div>
                    <p className="text-[#D9E3D8]/40 text-sm tracking-widest uppercase mb-4 max-w-[200px]">Focused on motion, interaction, and high-performance engineering.</p>
                </div>

                <div className="relative z-10">
                    {CONFIG.projects.map((project, i) => (
                        <motion.div 
                            key={project.id}
                            className="border-b border-[#D9E3D8]/10 group py-12 md:py-20 relative cursor-pointer"
                            onMouseEnter={() => setHoveredProject(project)}
                            onMouseLeave={() => setHoveredProject(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center justify-between pointer-events-none">
                                <div className="flex items-baseline space-x-6 md:space-x-12">
                                    <span className="text-xs md:text-sm font-medium text-[#D9E3D8]/20">0{i + 1}</span>
                                    <h4 className="text-4xl md:text-7xl font-light text-[#D9E3D8] uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">{project.title}</h4>
                                </div>
                                <div className="hidden md:flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-xs uppercase tracking-widest">{project.category}</span>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold mt-2">{project.year}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {hoveredProject && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }} 
                            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                            exit={{ opacity: 0, scale: 0.8, rotate: 5 }} 
                            className="fixed top-0 left-0 w-80 h-[450px] z-0 pointer-events-none overflow-hidden rounded-sm hidden md:block"
                            style={{ 
                                left: mousePos.x, 
                                top: mousePos.y,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <div className="w-full h-full relative transition-colors duration-700" style={{ backgroundColor: hoveredProject.color }}>
                                <div className="absolute inset-0 opacity-40 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-[#D9E3D8]">
                                    <div className="text-[10px] uppercase tracking-[0.3em] mb-1">{hoveredProject.category}</div>
                                    <div className="text-xl uppercase tracking-tighter italic">View Concept</div>
                                </div>
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#D9E3D8 1px, transparent 1px), linear-gradient(90deg, #D9E3D8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div 
                    animate={{ backgroundColor: hoveredProject ? `${hoveredProject.color}33` : 'rgba(15, 20, 18, 0)' }} 
                    className="fixed inset-0 pointer-events-none transition-colors duration-1000 -z-10" 
                />
            </div>
        </section>
    );
};

const Bio = () => {
    return (
        <section id="bio" className="py-32 bg-[#D9E3D8] text-[#0F1412]">
            <div className="max-w-7xl mx-auto px-6 overflow-hidden">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }} 
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }} 
                    className="flex whitespace-nowrap text-[12vw] font-light uppercase opacity-10 select-none"
                >
                    {[...Array(4)].map((_, i) => (<span key={i}>CREATIVE DEVELOPER • PROBLEM SOLVER • DESIGN ENTHUSIAST •&nbsp;</span>))}
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mt-20">
                    <div className="text-4xl md:text-5xl font-light leading-snug">
                        Driven by <span className="italic underline underline-offset-8">simplicity</span> and organic digital growth. I build bridges between complex engineering and human-centered design.
                    </div>
                    <div className="space-y-6 text-[#0F1412]/70 text-lg leading-relaxed">
                        <p>{CONFIG.bio}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    return (
        <section id="services" className="py-32 bg-[#0A0E0C]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-24 text-center">
                    <h2 className="text-xs uppercase tracking-[0.4em] text-[#D9E3D8]/40 mb-4">Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-light text-[#D9E3D8] uppercase tracking-tighter">Technical Proficiencies</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D9E3D8]/10 border border-[#D9E3D8]/10">
                    {CONFIG.skills.map((skill, i) => (
                        <motion.div 
                            key={i} 
                            whileHover={{ backgroundColor: "rgba(217, 227, 216, 0.05)" }} 
                            className="p-10 bg-[#0A0E0C] transition-colors flex flex-col"
                        >
                            <div className="text-[#D9E3D8]/60 mb-8">{skill.icon}</div>
                            <h4 className="text-[#D9E3D8] text-lg uppercase tracking-widest mb-4 font-light">[{skill.title}]</h4>
                            <p className="text-[#D9E3D8]/40 text-sm leading-relaxed font-light">{skill.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Connect = () => {
    return (
        <section id="connect" className="py-32 px-6">
            <div className="max-w-7xl mx-auto border-t border-[#D9E3D8]/10 pt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-6xl md:text-8xl font-light text-[#D9E3D8] leading-none mb-12 uppercase">LET'S <br /> <span className="italic opacity-50">CONNECT.</span></h2>
                        <div className="flex space-x-6">
                            {CONFIG.socials.map((social) => (
                                <a 
                                    key={social.name} 
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-[#D9E3D8]/20 flex items-center justify-center text-[#D9E3D8]/60 hover:text-[#D9E3D8] hover:border-[#D9E3D8] transition-all"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-[#D9E3D8]/60 text-xl font-light leading-relaxed mb-12">Available for freelance collaborations and permanent roles. Currently based in {CONFIG.brand.location} — working worldwide.</p>
                        <div className="space-y-4">
                            <a href={`mailto:${CONFIG.brand.email}`} className="text-2xl text-[#D9E3D8] hover:underline underline-offset-8 transition-all font-light">{CONFIG.brand.email}</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="py-12 px-6 border-t border-[#D9E3D8]/5 text-[10px] uppercase tracking-[0.2em] text-[#D9E3D8]/30">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div>© 2024 {CONFIG.brand.name.toUpperCase()}. FULL-STACK DEVELOPMENT. CLEAN CODE.</div>
                <div className="flex space-x-8 mt-4 md:mt-0">
                    {CONFIG.socials.map((social) => (
                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#D9E3D8]">{social.name}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

const PreviewContent = ({ onClose }: { onClose: () => void }) => {
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => { 
        const timer = setTimeout(() => setLoading(false), 2000); 
        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className="bg-[#0F1412] min-h-screen text-[#D9E3D8] font-sans selection:bg-[#D9E3D8] selection:text-[#0F1412] overflow-x-hidden">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div 
                        key="loader" 
                        exit={{ y: '-100%' }} 
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
                        className="fixed inset-0 z-[100] bg-[#F2F0E9] flex flex-col items-center justify-center text-[#0F1412]"
                    >
                        <div className="text-4xl md:text-6xl font-light tracking-[0.3em] uppercase italic">{CONFIG.brand.initials}</div>
                        <div className="w-48 h-px bg-[#0F1412] mt-4" />
                    </motion.div>
                ) : (
                    <motion.main 
                        key="content" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }}
                    >
                        <CustomCursor />
                        <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
                        <Hero />
                        <Projects />
                        <Bio />
                        <Services />
                        <Connect />
                        <Footer />
                    </motion.main>
                )}
            </AnimatePresence>
        </div>
    );
};
