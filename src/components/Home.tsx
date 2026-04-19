import React from "react";
import { motion } from "framer-motion";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { About } from "./About";
import { Experience } from "./Experience";
import { Contact } from "./Contact";

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-6 md:py-8 w-full"
    >
      {children}
    </motion.section>
  );
};

export const Home = () => {
  return (
    <div className="flex flex-col w-full relative pt-8 pb-24 gap-6">
      <RevealSection>
        <Projects />
      </RevealSection>

      <RevealSection>
        <Skills />
      </RevealSection>

      <RevealSection>
        <About />
      </RevealSection>

      <RevealSection>
        <Experience />
      </RevealSection>

      <RevealSection>
        <Contact />
      </RevealSection>
    </div>
  );
};
