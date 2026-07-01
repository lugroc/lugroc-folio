'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiExternalLink } from 'react-icons/hi';
import { Project } from '../lib/translations';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <div className="relative">
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 sm:h-64 object-cover rounded-t-2xl" />
            <button onClick={onClose} className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-1.5 hover:bg-black/60 transition"><HiX className="w-5 h-5" /></button>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.flags.map((f, i) => {
                const color = f === 'EC2' || f === 'Lambda' ? 'bg-black/[0.7] text-white' : 'bg-green-300/[0.7]';
                return <span key={i} className={`${color} px-3 py-1 text-[0.7rem] uppercase tracking-wider text-black rounded-full`}>{f}</span>;
              })}
              {project.tags.map((t, i) => (
                <span key={i} className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70">{t}</span>
              ))}
            </div>
            {project.url && (
              <a href={project.url} target={project.target || '_blank'} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full text-sm font-medium hover:opacity-90 transition">
                {project.url.includes('github') ? 'View on GitHub' : 'View Project'} <HiExternalLink />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
