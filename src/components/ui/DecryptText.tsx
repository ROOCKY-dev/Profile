'use client';

import { useEffect, useState } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

export default function DecryptText({ text, reveal, className }: { text: string, reveal: boolean, className?: string }) {
  // Deterministic initial state (pseudo-random looking) to avoid hydration mismatch
  const [displayText, setDisplayText] = useState(
    text.split('').map((_, i) => CHARS[i % CHARS.length]).join('')
  );
  const [isDecrypted, setIsDecrypted] = useState(false);

  useEffect(() => {
    if (reveal && !isDecrypted) {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(prev =>
          prev.split('').map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsDecrypted(true);
        }

        iteration += 1 / 2; // Speed of decryption
      }, 30);

      return () => clearInterval(interval);
    }
  }, [reveal, text, isDecrypted]);

  return <span className={className}>{displayText}</span>;
}
