import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useSectionInView } from '../lib/hooks';
import { useLanguage } from '../context/language-context';
import T from './T';

export default function About() {
  const { ref } = useSectionInView('About');
  const { t } = useLanguage();

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>{t.about.heading}</SectionHeading>
      <p className="mb-3"><T>{t.about.p1}</T></p>
      <p className="mb-3"><T>{t.about.p2}</T></p>
      {t.about.p3 && <p><T>{t.about.p3}</T></p>}
    </motion.section>
  );
}
