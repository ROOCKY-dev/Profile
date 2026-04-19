'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const top = h.scrollTop || document.body.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const progress = max > 0 ? (top / max) * 100 : 0;
      setWidth(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      id="progress"
      className="fixed top-0 left-0 h-[3px] bg-ink z-50 transition-[width] duration-100 ease-linear"
      style={{ width: `${width}%` }}
    />
  );
}
