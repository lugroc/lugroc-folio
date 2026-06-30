import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '../context/active-section-context';
import type { SectionName } from './types';

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  const { setActiveSection, timeOfLastClick } = useActiveSection();
  const { ref, inView } = useInView({ threshold });

  if (inView && Date.now() - timeOfLastClick > 1000) {
    setActiveSection(sectionName);
  }

  return { ref };
}
