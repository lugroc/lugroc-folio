'use client';

import { useState, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import Project from './Project';
import { useSectionInView } from '../lib/hooks';
import { useLanguage } from '../context/language-context';
import { Project as ProjectType } from '../lib/translations';
import { checkBackendOnline } from '../api/client';

interface Props {
  onProjectClick?: (project: ProjectType) => void;
}

export default function Projects({ onProjectClick }: Props) {
  const { ref } = useSectionInView('Projects', 0.5);
  const { t } = useLanguage();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    checkBackendOnline().then(setIsOnline);
  }, []);

  const projects = t.projectsData.map((p) => ({
    ...p,
    flags: isOnline ? p.flags : p.flags.filter((f) => f !== 'Online'),
  }));

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>{t.projects.heading}</SectionHeading>
      <div>
        {projects.map((project, idx) => (
          <Project key={idx} project={project} onClick={onProjectClick} />
        ))}
      </div>
    </section>
  );
}
