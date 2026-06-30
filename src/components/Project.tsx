'use client';

import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import { Project as ProjectType } from '../lib/translations';

interface Props {
  project: ProjectType;
  onClick?: (project: ProjectType) => void;
}

export default function Project({ project, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const { title, description, tags, flags, imageUrl, url, target } = project;
  const Wrapper = onClick ? 'div' : url ? 'a' : 'div';

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <Wrapper
        href={!onClick ? url : undefined}
        target={!onClick ? target : undefined}
        onClick={onClick ? () => onClick(project) : undefined}
        className={`bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 block ${onClick ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-white/20' : 'hover:bg-gray-200 dark:hover:bg-white/20'}`}
      >
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">{description}</p>
          <ul className="flex flex-wrap mt-4 gap-2">
            {flags.map((f, i) => (
              <li key={i} className="bg-green-300/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-black rounded-full">{f}</li>
            ))}
            {tags.map((t, i) => (
              <li key={i} className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70">{t}</li>
            ))}
          </ul>
        </div>
        {imageUrl && (
          <img src={imageUrl} alt={title}
            className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl transition group-hover:scale-[1.04] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 group-even:-right-[initial] group-even:-left-40"
          />
        )}
      </Wrapper>
    </motion.div>
  );
}
