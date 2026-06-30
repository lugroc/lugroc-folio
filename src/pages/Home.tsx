'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import SectionDivider from '../components/SectionDivider';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Contact from '../components/Contact';
import ProjectModal from '../components/ProjectModal';
import BackToTop from '../components/BackToTop';
import type { Project } from '../lib/translations';

interface Props {
  onLoginClick?: () => void;
}

export default function Home({ onLoginClick }: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  function handleProjectClick(project: Project) {
    if (onLoginClick && project.flags?.includes('Online') && !project.url) {
      onLoginClick();
    } else {
      setSelectedProject(project);
    }
  }

  return (
    <main className="flex flex-col items-center px-4 pt-28 sm:pt-24">
      <div className="fixed top-[-6rem] right-[-10rem] w-[35rem] h-[35rem] rounded-full bg-[#fbe2e3] blur-[10rem] -z-10 dark:bg-[#946263]" />
      <div className="fixed top-[-1rem] left-[-10rem] w-[35rem] h-[35rem] rounded-full bg-[#dbd7fb] blur-[10rem] -z-10 dark:bg-[#676394]" />
      <Hero />
      <SectionDivider />
      <About />
      <Projects onProjectClick={handleProjectClick} />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <BackToTop />
    </main>
  );
}
