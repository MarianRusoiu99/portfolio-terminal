import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { 
    Eye, 
    ChevronLeft, 
    ChevronRight,
    Plus,
    ArrowUpRight,
    Github,
    Linkedin,
    Mail,
    X
} from "lucide-react";
import { getProjects, getSkills, getContact, getName, getHeadline, getSocials } from "@/lib/data";

const CONFIG = {
    brand: {
        name: getName().toUpperCase(),
        shortName: getName().split(" ")[0].toUpperCase(),
        role: getHeadline(),
        location: "Timișoara, RO",
        availability: "Available for new projects",
        email: getContact().email,
    },
    socials: getSocials().map(s => ({
        name: s.label,
        url: s.href,
        icon: s.label === "GitHub" ? Github : s.label === "LinkedIn" ? Linkedin : Mail
    })),
    services: [
        { 
            id: "01",
            title: "Full-Stack Development", 
            desc: "Building scalable, performant web applications with modern frameworks and best practices.",
        },
        { 
            id: "02",
            title: "UI/UX Implementation", 
            desc: "Transforming designs into pixel-perfect, accessible, and responsive interfaces.",
        },
        { 
            id: "03",
            title: "Technical Architecture", 
            desc: "Designing robust systems and infrastructure for sustainable growth.",
        }
    ],
    projects: getProjects().map((p, i) => ({
        id: String(i + 1).padStart(2, "0"),
        title: p.name.toUpperCase(),
        category: p.description,
        image: p.image,
    })),
    theme: {
        background: "#050505",
        accent: "#f5f5f5",
        muted: "#1a1a1a"
    }
};

export const DeveloperPortfolio = () => {
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
                            <img 
                                src={project.image} 
                                alt={project.title}
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
                    A premium, high-end portfolio template designed for developers who want to make a statement. Features cinematic animations, custom cursor, and a dark aesthetic that exudes sophistication.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <Eye className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">Custom Cursor</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Interactive cursor with hover states and dynamic text reveal.
                        </p>
                    </div>
                    
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <Plus className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">Smooth Animations</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Cinematic reveals and micro-interactions throughout.
                        </p>
                    </div>
                    
                    <div className="group p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <ArrowUpRight className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground">Responsive Design</h5>
                        </div>
                        <p className="text-sm text-muted-foreground/70">
                            Flawless experience across all device sizes.
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

const PreviewContent = ({ onClose }: { onClose: () => void }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState("");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeProject, setActiveProject] = useState<string | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrollProgress(winScroll / height);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen text-[#f5f5f5] font-sans selection:bg-white selection:text-black overflow-x-hidden relative" style={{ backgroundColor: CONFIG.theme.background }}>
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <div className="fixed top-0 left-0 w-full h-[3px] z-[101] origin-left bg-white/5">
                <div 
                    className="h-full bg-white transition-transform duration-150 ease-out" 
                    style={{ transform: `scaleX(${scrollProgress})` }}
                />
            </div>

            <div 
                className={`fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9999] transition-all duration-500 mix-blend-difference ease-[cubic-bezier(0.23,1,0.32,1)] hidden md:flex ${isHovering ? 'w-28 h-28 bg-white' : 'w-5 h-5 bg-white'}`}
                style={{ transform: `translate3d(${mousePos.x - (isHovering ? 56 : 10)}px, ${mousePos.y - (isHovering ? 56 : 10)}px, 0)` }}
            >
                {isHovering && (
                    <span className="text-black text-[10px] font-black uppercase tracking-widest animate-fade-in text-center px-4 leading-tight">
                        {cursorText || "VIEW"}
                    </span>
                )}
            </div>

            <nav className="fixed w-full z-50 px-6 md:px-16 py-10 flex justify-between items-center mix-blend-difference">
                <a 
                    href="#" 
                    className="text-sm md:text-base font-black tracking-tight group overflow-hidden"
                    onMouseEnter={() => { setIsHovering(true); setCursorText("HOME"); }}
                    onMouseLeave={() => { setIsHovering(false); setCursorText(""); }}
                >
                    <div className="relative flex flex-col uppercase tracking-tighter">
                        <span className="transition-transform duration-500 group-hover:-translate-y-full whitespace-nowrap">{CONFIG.brand.name}</span>
                        <span className="absolute top-full transition-transform duration-500 group-hover:-translate-y-full whitespace-nowrap italic text-zinc-400">{CONFIG.brand.shortName}</span>
                    </div>
                </a>
                
                <div className="flex items-center space-x-12">
                    <div className="hidden lg:flex space-x-10 text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
                        <a href="#work" className="hover:opacity-100 transition-opacity">Work</a>
                        <a href="#services" className="hover:opacity-100 transition-opacity">Expertise</a>
                    </div>
                    <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="group flex flex-col items-end space-y-2 p-2"
                        onMouseEnter={() => { setIsHovering(true); setCursorText("MENU"); }}
                        onMouseLeave={() => { setIsHovering(false); setCursorText(""); }}
                    >
                        <div className="h-[1px] bg-white w-8 transition-all duration-500" />
                        <div className="h-[1px] bg-white w-5 group-hover:w-8 transition-all duration-500" />
                    </button>
                </div>
            </nav>

            <div className={`fixed inset-0 bg-[#080808] z-[110] transition-all duration-[1s] ease-[cubic-bezier(0.85,0,0.15,1)] ${isMenuOpen ? 'clip-path-open' : 'clip-path-closed'}`}>
                <div className="absolute top-0 w-full px-6 md:px-16 py-10 flex justify-between items-center">
                    <span className="text-sm font-black tracking-tight opacity-40 uppercase">{CONFIG.brand.name}</span>
                    <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-4 rounded-full bg-white/5 border border-white/10 group hover:bg-white transition-all duration-500"
                        onMouseEnter={() => { setIsHovering(true); setCursorText("CLOSE"); }}
                        onMouseLeave={() => { setIsHovering(false); setCursorText(""); }}
                    >
                        <X className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                    </button>
                </div>

                <div className="h-full grid grid-cols-1 md:grid-cols-2">
                    <div className="hidden md:flex flex-col justify-between p-16 lg:p-24 border-r border-white/5 bg-black/40">
                        <div className="text-zinc-600 text-[10px] font-black tracking-[0.5em] uppercase">Connect</div>
                        <div className="space-y-4">
                            <a href={`mailto:${CONFIG.brand.email}`} className="text-3xl lg:text-4xl font-light hover:text-zinc-400 transition-colors block">{CONFIG.brand.email}</a>
                            <p className="text-zinc-500 font-mono text-sm opacity-60 mb-12">{CONFIG.brand.location}</p>
                            <div className="flex space-x-8">
                                {CONFIG.socials.map((social) => (
                                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
                                        <social.icon size={22} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center px-8 md:px-24 space-y-6 md:space-y-8">
                        {['Home', 'Work', 'Services', 'Contact'].map((item, i) => (
                            <a 
                                key={item} 
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="group relative inline-block text-6xl md:text-8xl lg:text-[7vw] font-black tracking-tighter transition-all duration-700 overflow-hidden"
                            >
                                <span className="flex items-baseline transition-transform duration-700 group-hover:-translate-y-full">
                                    <span className="text-xs md:text-sm mr-4 font-normal opacity-20">0{i+1}</span>{item}
                                </span>
                                <span className="absolute top-full left-0 flex items-baseline transition-transform duration-700 group-hover:-translate-y-full italic text-zinc-600">
                                    <span className="text-xs md:text-sm mr-4 font-normal opacity-20">0{i+1}</span>{item}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <section className="relative min-h-[100svh] flex flex-col justify-center items-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div 
                        className="absolute top-1/2 left-1/2 w-[140vw] h-[140vw] blur-[150px] rounded-full bg-gradient-to-br from-white/[0.04] to-transparent transition-transform duration-700 ease-out"
                        style={{ transform: `translate3d(${(mousePos.x - window.innerWidth/2) * 0.08}px, ${(mousePos.y - window.innerHeight/2) * 0.08}px, 0) translate(-50%, -50%)` }}
                    />
                </div>

                <div className="z-10 text-center w-full max-w-screen-2xl mt-12">
                    <div className="overflow-hidden mb-8 md:mb-12">
                        <p className="text-[10px] md:text-[12px] tracking-[0.6em] uppercase font-black text-zinc-500 animate-reveal-up opacity-80">
                            {CONFIG.brand.role}
                        </p>
                    </div>
                    
                    <h1 className="text-[clamp(3.5rem,14vw,12rem)] font-black leading-[0.85] tracking-tighter inline-block relative w-full">
                        <div className="overflow-hidden"><span className="block animate-reveal-up" style={{ transitionDelay: '0.1s' }}>BUILDING</span></div>
                        <div className="overflow-hidden py-1 md:py-3"><span className="block italic text-zinc-700 animate-reveal-up opacity-20 select-none" style={{ transitionDelay: '0.2s' }}>DIGITAL</span></div>
                        <div className="overflow-hidden"><span className="block animate-reveal-up" style={{ transitionDelay: '0.3s' }}>EXPERIENCES</span></div>
                    </h1>

                    <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 md:px-12 gap-12 md:gap-0">
                        <div className="text-[10px] text-zinc-500 uppercase leading-relaxed font-black tracking-[0.4em] text-center md:text-left">
                            {CONFIG.brand.location} <br /> Est. MMXXII
                        </div>
                        <div className="text-[10px] text-zinc-500 uppercase leading-relaxed font-black tracking-[0.4em] text-center md:text-right">
                            Full-Stack <br /> Developer
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="py-32 md:py-56 px-6 md:px-16 lg:px-32 border-t border-white/5 bg-[#060606]">
                <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-5 flex flex-col justify-start">
                        <div className="sticky top-32">
                            <span className="text-[10px] font-black tracking-[0.6em] text-zinc-700 uppercase mb-8 block">Services</span>
                            <h2 className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-[0.9] mb-12">Precision <br/><span className="italic text-zinc-600">Driven.</span></h2>
                            <p className="text-zinc-500 text-lg leading-relaxed max-w-sm hidden lg:block border-l border-white/10 pl-8 font-light italic text-balance">
                                "Bridging creative vision with technical excellence to build products that last."
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-7 divide-y divide-white/5">
                        {CONFIG.services.map((s) => (
                            <div 
                                key={s.id} 
                                className="group relative py-12 md:py-16 hover:px-6 transition-all duration-500 cursor-pointer overflow-hidden"
                                onMouseEnter={() => { setIsHovering(true); setCursorText("DISCOVER"); }}
                                onMouseLeave={() => { setIsHovering(false); setCursorText(""); }}
                            >
                                <div className="absolute inset-0 bg-white/[0.01] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex items-start space-x-8 md:space-x-16">
                                        <span className="text-zinc-800 text-sm font-black pt-2">{s.id}</span>
                                        <div>
                                            <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 group-hover:translate-x-4 transition-transform duration-500">{s.title}</h3>
                                            <p className="max-w-md text-zinc-500 text-sm md:text-base opacity-40 group-hover:opacity-100 transition-opacity duration-700">{s.desc}</p>
                                        </div>
                                    </div>
                                    <Plus className="w-5 h-5 text-zinc-800 group-hover:text-white transition-all mt-3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="work" className="py-32 md:py-56 bg-black border-t border-white/5 relative">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="px-6 md:px-16 lg:px-32 mb-20 md:mb-40 flex flex-col md:flex-row justify-between items-start md:items-end">
                        <h2 className="text-[clamp(4rem,10vw,12rem)] font-black tracking-tighter leading-none uppercase italic">Selected</h2>
                        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em] md:pb-4">Projects Archive</p>
                    </div>

                    <div className="flex flex-col border-t border-white/10 relative">
                        {CONFIG.projects.map((project) => (
                            <div 
                                key={project.id} 
                                className="group relative border-b border-white/10 py-20 md:py-32 px-6 md:px-16 lg:px-32 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer overflow-hidden"
                                onMouseEnter={() => { 
                                    setIsHovering(true); 
                                    setCursorText("EXPLORE");
                                    setActiveProject(project.image);
                                }}
                                onMouseLeave={() => { 
                                    setIsHovering(false); 
                                    setCursorText("");
                                    setActiveProject(null);
                                }}
                            >
                                <div className="relative z-20 flex items-baseline space-x-12">
                                    <span className="text-zinc-900 font-black text-lg">{project.id}</span>
                                    <h3 className="text-5xl md:text-8xl lg:text-[7vw] font-black tracking-tighter leading-none group-hover:translate-x-6 transition-transform duration-500 uppercase">{project.title}</h3>
                                </div>
                                <div className="relative z-20 mt-10 md:mt-0 flex flex-col items-start md:items-end w-full md:w-auto">
                                    <span className="text-zinc-600 text-[10px] font-black tracking-[0.4em] uppercase mb-4">{project.category}</span>
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                                        <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black" />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {activeProject && (
                            <div 
                                className="fixed pointer-events-none z-[100] w-[350px] h-[450px] overflow-hidden rounded-xl shadow-2xl hidden lg:block transition-transform duration-300 ease-out"
                                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: 'translate3d(-50%, -50%, 0)' }}
                            >
                                <img src={activeProject} alt="Preview" className="w-full h-full object-cover scale-110" />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section id="contact" className="py-40 md:py-60 px-6 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-start">
                        <div>
                            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-16">GET IN <br/> <span className="text-zinc-600 italic">TOUCH.</span></h2>
                            <div className="space-y-16">
                                <div className="group cursor-pointer block max-w-fit">
                                    <p className="text-zinc-700 text-[10px] font-black tracking-[0.4em] uppercase mb-6">Inquiry</p>
                                    <a href={`mailto:${CONFIG.brand.email}`} className="text-2xl md:text-4xl font-black block border-b border-white/5 pb-2 group-hover:border-white transition-all">{CONFIG.brand.email}</a>
                                    <p className="text-zinc-500 mt-4 font-mono">{CONFIG.brand.location}</p>
                                </div>
                                <div className="flex flex-wrap gap-20">
                                    <div>
                                        <p className="text-zinc-800 text-[10px] font-black tracking-[0.4em] uppercase mb-4">Availability</p>
                                        <p className="text-xl font-bold">{CONFIG.brand.availability}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/[0.02] backdrop-blur-3xl p-8 md:p-16 rounded-[2rem] border border-white/10">
                            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                                <input type="text" placeholder="Full Name" className="bg-transparent w-full outline-none text-2xl font-bold placeholder:text-zinc-800 border-b border-white/5 focus:border-white transition-all pb-6" />
                                <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none text-2xl font-bold placeholder:text-zinc-800 border-b border-white/5 focus:border-white transition-all pb-6" />
                                <textarea rows={2} placeholder="Your Vision..." className="bg-transparent w-full outline-none text-2xl font-bold placeholder:text-zinc-800 border-b border-white/5 focus:border-white transition-all pb-6 resize-none" />
                                <button className="w-full py-7 bg-white text-black font-black text-xs tracking-[0.5em] uppercase rounded-full hover:bg-zinc-200 transition-all">
                                    Initiate Project
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-16 px-10 md:px-24 border-t border-white/5">
                <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black tracking-[0.5em] text-zinc-800 uppercase">
                    <span>©2024 {CONFIG.brand.name}</span>
                    <div className="flex space-x-12">
                        {CONFIG.socials.map(s => (
                            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{s.name}</a>
                        ))}
                    </div>
                    <div className="hidden md:block lowercase italic text-xs font-normal">crafted with precision</div>
                </div>
            </footer>

            <style>{`
                @keyframes reveal-up {
                    from { transform: translateY(110%) skewY(6deg); opacity: 0; }
                    to { transform: translateY(0) skewY(0); opacity: 1; }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-reveal-up { animation: reveal-up 1.4s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
                .animate-fade-in { animation: fade-in 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
                .clip-path-open { clip-path: circle(150% at 100% 0); }
                .clip-path-closed { clip-path: circle(0% at 100% 0); }
                html { scroll-behavior: smooth; }
                body { overscroll-behavior: none; }
            `}</style>
        </div>
    );
};
