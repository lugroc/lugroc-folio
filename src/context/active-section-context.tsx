import { createContext, useContext, useState, ReactNode } from 'react';
import type { SectionName } from '../lib/types';

interface ActiveSectionContextValue {
  activeSection: SectionName;
  setActiveSection: (section: SectionName) => void;
  timeOfLastClick: number;
  setTimeOfLastClick: (time: number) => void;
}

const ActiveSectionContext =
  createContext<ActiveSectionContextValue | null>(null);

export function ActiveSectionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeSection, setActiveSection] = useState<SectionName>('Home');
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const ctx = useContext(ActiveSectionContext);
  if (!ctx)
    throw new Error(
      'useActiveSection must be used within ActiveSectionContextProvider'
    );
  return ctx;
}
