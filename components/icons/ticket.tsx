
'use client';

import { motion, useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';

const rectVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const lineVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const TagIcon = () => {
  const rectControls = useAnimation();
  const pathControls = useAnimation();
  const lineControls = useAnimation();

  const handleMouseEnter = () => {
    rectControls.start('animate');
    pathControls.start('animate');
    lineControls.start('animate');
  };

  const handleMouseLeave = () => {
    rectControls.start('normal');
    pathControls.start('normal');
    lineControls.start('normal');
  };

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          variants={rectVariants}
          initial="normal"
          animate={rectControls}
          d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
        />
        <motion.line
          variants={lineVariants}
          initial="normal"
          animate={lineControls}
          x1="7"
          y1="7"
          x2="7.01"
          y2="7"
        />
      </svg>
    </div>
  );
};

export { TagIcon };
