import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import { FiDownload } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '../context/language-context';
import TypeWriter from './TypeWriter';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-40 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <img
            src="/portrait.png"
            alt="Luciano Guerrero"
            className="w-24 h-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl mx-auto"
          />
          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 125, delay: 0.1 }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold">Luciano Guerrero</span>
        <br />
        <span className="block mt-2">
          {t.hero.tagline1}{' '}
          <span className="font-bold text-orange-500">Java Spring Boot</span>,{' '}
          <span className="font-bold text-orange-500">Node.js</span>{' '}
          <span className="font-bold text-orange-500">React</span>,{' '}
          <TypeWriter text={t.hero.tagline2} speed={30} />
        </span>
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <a
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition"
        >
          {t.hero.contactBtn}
          <HiArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </a>

        <Link
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition borderBlack dark:bg-white/10 dark:text-white/60"
          to="/cv"
        >
          {t.hero.cvBtn}
          <FiDownload className="opacity-60 group-hover:translate-y-0.5 transition" />
        </Link>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-110 hover:scale-110 hover:text-gray-950 active:scale-105 transition borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://linkedin.com"
          target="_blank"
        >
          <FaLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-110 hover:scale-110 hover:text-gray-950 active:scale-105 transition borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/lucianogro"
          target="_blank"
        >
          <FaGithub />
        </a>
      </motion.div>
    </section>
  );
}
