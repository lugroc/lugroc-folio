import { motion } from 'framer-motion';
import { links } from '../lib/data';
import { useActiveSection } from '../context/active-section-context';
import { useLanguage } from '../context/language-context';

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSection();
  const { t } = useLanguage();

  function handleClick(hash: string, name: typeof links[number]['name']) {
    setActiveSection(name);
    setTimeOfLastClick(Date.now());
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 -translate-x-1/2 min-h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:min-h-[3.25rem] sm:w-[44rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
      />
      <nav className="flex fixed left-1/2 min-h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:min-h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {links.map(link => {
            const key = link.name.toLowerCase() as keyof typeof t.nav;
            return (
              <li
                key={link.hash}
                className="h-3/4 flex items-center justify-center relative"
              >
                <a
                  className="flex w-full items-center justify-center whitespace-nowrap px-3 py-3 hover:text-gray-950 transition dark:text-gray-300 dark:hover:text-white"
                  href={link.hash}
                  onClick={e => {
                    e.preventDefault();
                    handleClick(link.hash, link.name);
                  }}
                >
                  {t.nav[key]}
                  {link.name === activeSection && (
                    <motion.span
                      className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-700"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}

        </ul>
      </nav>
    </header>
  );
}
