'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type PerformanceLevel = 'high' | 'mid' | 'low';

interface PerformanceContextType {
  performanceLevel: PerformanceLevel;
  setPerformanceLevel: (level: PerformanceLevel) => void;
  cyclePerformanceLevel: () => void;
  // Keep isPerformanceMode for backward compatibility if needed, 
  // but better to migrate all components to use performanceLevel
  isPerformanceMode: boolean; 
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [performanceLevel, setPerformanceLevelState] = useState<PerformanceLevel>('high');

  useEffect(() => {
    // Load preference from localStorage
    const saved = localStorage.getItem('performance-level') as PerformanceLevel;
    if (saved && ['high', 'mid', 'low'].includes(saved)) {
      setPerformanceLevelState(saved);
    }
  }, []);

  const setPerformanceLevel = (level: PerformanceLevel) => {
    setPerformanceLevelState(level);
    localStorage.setItem('performance-level', level);
  };

  const cyclePerformanceLevel = () => {
    const levels: PerformanceLevel[] = ['high', 'mid', 'low'];
    const currentIndex = levels.indexOf(performanceLevel);
    const nextIndex = (currentIndex + 1) % levels.length;
    setPerformanceLevel(levels[nextIndex]);
  };

  useEffect(() => {
    // Remove all classes first
    document.body.classList.remove('perf-high', 'perf-mid', 'perf-low', 'perf-mode');
    
    // Add the current class
    document.body.classList.add(`perf-${performanceLevel}`);
    
    // Maintain perf-mode for backward compatibility if components rely on it
    if (performanceLevel === 'low') {
      document.body.classList.add('perf-mode');
    }
  }, [performanceLevel]);

  return (
    <PerformanceContext.Provider value={{ 
      performanceLevel, 
      setPerformanceLevel, 
      cyclePerformanceLevel,
      isPerformanceMode: performanceLevel === 'low'
    }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}
