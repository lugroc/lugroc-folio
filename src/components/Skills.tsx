import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { skillsData } from '../lib/data';
import { useSectionInView } from '../lib/hooks';
import { useLanguage } from '../context/language-context';

const fadeInVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * idx },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView('Skills');
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      id="skills"
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>{t.skills.heading}</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skillsData.map((skill, idx) => (
          <motion.li
            key={idx}
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={idx}
            className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
