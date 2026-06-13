'use client';

import { useState, useEffect } from 'react';

export function useClock(tz: string) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: tz,
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}
