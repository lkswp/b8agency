"use client";

import { useRef, MouseEvent, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function MagneticButton({ children, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Position motion values for spring-based magnetic attraction
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High fidelity spring configuration for natural physical attraction feel
  const springConfig = { damping: 12, stiffness: 120, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Find the center of the button element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Distance vector from mouse to button center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Move the button 35% towards the cursor coordinates
    const attractionForce = 0.35;
    x.set(distanceX * attractionForce);
    y.set(distanceY * attractionForce);
  }, [shouldReduceMotion, x, y]);

  const handleMouseLeave = useCallback(() => {
    if (shouldReduceMotion) return;
    // Snap back to original center position with physics dampening
    x.set(0);
    y.set(0);
  }, [shouldReduceMotion, x, y]);

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: shouldReduceMotion ? 0 : springX,
        y: shouldReduceMotion ? 0 : springY,
      }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
      className="relative px-8 py-4 bg-transparent border border-white text-white font-sans text-xs font-black uppercase tracking-[0.25em] rounded-full overflow-hidden cursor-pointer transition-colors duration-500 hover:bg-white hover:text-black focus:outline-none shadow-2xl shadow-white/5 active:scale-95 transform-gpu will-change-transform"
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
