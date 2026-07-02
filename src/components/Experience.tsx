import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useSectionInView } from '../lib/hooks';
import { useLanguage } from '../context/language-context';

export default function Experience() {
  const { ref } = useSectionInView('Experience');
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      id="experience"
      className="scroll-mt-28 mb-28 sm:mb-40"
    >
      <SectionHeading>{t.experience.heading}</SectionHeading>
      <div className="relative max-w-[42rem] mx-auto">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
        <ol className="flex flex-col">
          {t.experience.items.map((item, idx) => (
            <motion.li
              key={idx}
              className="mb-10 last:mb-0 relative pl-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
            >
              <div className="absolute left-[10.5px] top-1 w-[13px] h-[13px] bg-gray-400 rounded-full border-2 border-white dark:border-gray-900 dark:bg-gray-500" />
              <div className="bg-gray-100 border border-black/5 rounded-lg p-6 dark:bg-white/10 dark:text-white/80">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-white/50">{item.location}</p>
                <p className="mt-3 leading-relaxed text-gray-700 dark:text-white/70">{item.description}</p>
                <span className="text-xs text-gray-400 dark:text-white/40 mt-2 block">{item.date}</span>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
