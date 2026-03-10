'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

/* ============================================
   GLASS CARD COMPONENT
   Premium frosted glass container
============================================ */

interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'hover' | 'glow';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-12',
};

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
  full: 'rounded-full',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', padding = 'md', rounded = 'lg', children, ...props }, ref) => {
    const baseClasses = cn(
      'relative overflow-hidden',
      'bg-gradient-to-br from-[rgba(15,15,35,0.6)] to-[rgba(15,15,35,0.3)]',
      'backdrop-blur-xl',
      'border border-[rgba(124,92,255,0.15)]',
      'transition-all duration-500 ease-out',
      paddingClasses[padding],
      roundedClasses[rounded],
      variant === 'hover' && 'hover:border-[rgba(124,92,255,0.3)] hover:shadow-[0_20px_60px_-15px_rgba(124,92,255,0.2)] hover:-translate-y-1',
      variant === 'glow' && 'shadow-[0_0_40px_rgba(124,92,255,0.15)] hover:shadow-[0_0_60px_rgba(124,92,255,0.25)]',
      className
    );

    return (
      <motion.div ref={ref} className={baseClasses} {...props}>
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);
GlassCard.displayName = 'GlassCard';


/* ============================================
   GLASS BUTTON COMPONENT
   Interactive button with glass aesthetics
============================================ */

interface GlassButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'default' | 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const buttonSizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variantClasses = {
      default: cn(
        'bg-gradient-to-br from-[rgba(124,92,255,0.15)] to-[rgba(124,92,255,0.05)]',
        'backdrop-blur-sm border border-[rgba(124,92,255,0.2)]',
        'hover:border-primary hover:shadow-[0_0_30px_rgba(124,92,255,0.3)]',
        'text-text-main'
      ),
      primary: cn(
        'bg-gradient-to-r from-primary to-[#6B4FE0]',
        'hover:shadow-[0_10px_40px_rgba(124,92,255,0.4)]',
        'text-white border-none'
      ),
      outline: cn(
        'bg-transparent border border-primary/50',
        'hover:bg-primary/10 hover:border-primary',
        'text-primary hover:text-white'
      ),
      ghost: cn(
        'bg-transparent border-none',
        'hover:bg-white/5',
        'text-text-muted hover:text-text-main'
      ),
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative overflow-hidden',
          'font-display font-semibold uppercase tracking-wider',
          'transition-all duration-300 ease-out',
          'cursor-hover',
          buttonSizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);
GlassButton.displayName = 'GlassButton';


/* ============================================
   GLASS BADGE COMPONENT
   Small label/tag with glass effect
============================================ */

interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary';
}

export const GlassBadge = forwardRef<HTMLSpanElement, GlassBadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-white/5 border-white/10 text-text-muted',
      primary: 'bg-primary/10 border-primary/30 text-primary',
      secondary: 'bg-secondary/10 border-secondary/30 text-secondary',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5',
          'px-3 py-1 text-xs font-mono uppercase tracking-wider',
          'backdrop-blur-sm border rounded-full',
          'transition-all duration-300',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
GlassBadge.displayName = 'GlassBadge';


/* ============================================
   GLASS SECTION COMPONENT
   Full-width section with glass styling
============================================ */

interface GlassSectionProps extends React.HTMLAttributes<HTMLElement> {
  gradient?: boolean;
}

export const GlassSection = forwardRef<HTMLElement, GlassSectionProps>(
  ({ className, gradient = false, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          gradient && 'bg-gradient-to-b from-transparent via-[rgba(124,92,255,0.02)] to-transparent',
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
GlassSection.displayName = 'GlassSection';


/* ============================================
   GRADIENT ORB BACKGROUND
   Animated floating gradient orbs
============================================ */

interface GradientOrbsProps {
  variant?: 'hero' | 'section' | 'subtle';
}

export function GradientOrbs({ variant = 'section' }: GradientOrbsProps) {
  const orbConfigs = {
    hero: [
      { size: 'w-[600px] h-[600px]', position: 'top-[-10%] right-[-10%]', color: 'primary', delay: 0 },
      { size: 'w-[500px] h-[500px]', position: 'bottom-[-20%] left-[-15%]', color: 'secondary', delay: 2 },
      { size: 'w-[300px] h-[300px]', position: 'top-[40%] left-[20%]', color: 'primary', delay: 4 },
    ],
    section: [
      { size: 'w-[400px] h-[400px]', position: 'top-[-15%] right-[-10%]', color: 'primary', delay: 0 },
      { size: 'w-[300px] h-[300px]', position: 'bottom-[-10%] left-[-5%]', color: 'secondary', delay: 3 },
    ],
    subtle: [
      { size: 'w-[250px] h-[250px]', position: 'top-[10%] right-[5%]', color: 'primary', delay: 0 },
    ],
  };

  const orbs = orbConfigs[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={cn(
            'absolute rounded-full blur-[100px] opacity-30',
            orb.size,
            orb.position,
            orb.color === 'primary' 
              ? 'bg-gradient-radial from-primary/40 to-transparent' 
              : 'bg-gradient-radial from-secondary/30 to-transparent'
          )}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}


/* ============================================
   SECTION HEADER COMPONENT
   Consistent section titles
============================================ */

interface SectionHeaderProps {
  badge?: string;
  badgeNumber?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ 
  badge, 
  badgeNumber,
  title, 
  titleAccent,
  description,
  align = 'left' 
}: SectionHeaderProps) {
  return (
    <div className={cn('space-y-4', align === 'center' && 'text-center')}>
      {(badge || badgeNumber) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2"
          style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}
        >
          {badgeNumber && (
            <span className="font-mono text-xs text-primary/60">{badgeNumber}</span>
          )}
          {badge && (
            <GlassBadge variant="primary">{badge}</GlassBadge>
          )}
        </motion.div>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
      >
        <span className="text-text-main">{title}</span>
        {titleAccent && (
          <span className="gradient-text-static ml-2">{titleAccent}</span>
        )}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={cn(
            'font-mono text-text-muted text-sm md:text-base leading-relaxed',
            align === 'left' && 'max-w-xl'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}


/* ============================================
   GLASS DIVIDER
   Styled horizontal divider
============================================ */

export function GlassDivider({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        'h-px w-full',
        'bg-gradient-to-r from-transparent via-primary/30 to-transparent',
        className
      )} 
    />
  );
}


/* ============================================
   ICON CONTAINER
   Styled container for icons
============================================ */

interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'glow';
}

export const IconContainer = forwardRef<HTMLDivElement, IconContainerProps>(
  ({ className, size = 'md', variant = 'default', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-10 h-10',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    };

    const variantClasses = {
      default: 'bg-white/5 border-white/10',
      primary: 'bg-primary/10 border-primary/30',
      glow: 'bg-primary/10 border-primary/30 shadow-[0_0_20px_rgba(124,92,255,0.3)]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center rounded-xl border',
          'transition-all duration-300',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
IconContainer.displayName = 'IconContainer';
