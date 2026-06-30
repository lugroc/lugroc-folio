import { Fragment } from 'react';

export default function T({ children, cls }: { children: string; cls?: string }) {
  const parts = children.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <span key={i} className={`font-medium ${cls || ''}`}>{part.slice(2, -2)}</span>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <i key={i} className={cls || ''}>{part.slice(1, -1)}</i>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
