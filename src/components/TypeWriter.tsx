import { useState, useEffect } from 'react';

interface Props {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypeWriter({ text, speed = 40, className = '' }: Props) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + text[idx]);
        setIdx(i => i + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [idx, text, speed]);

  return <span className={className}>{displayed}</span>;
}
