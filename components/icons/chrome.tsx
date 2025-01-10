'use client';

import React from 'react';
import { motion, useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';

const bodyVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.9, 1],
    transition: {
      duration: 0.4,
    },
  },
};

const ChromeIcon = () => {
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.start('animate');
  };

  const handleMouseLeave = () => {
    controls.start('normal');
  };

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M32 8C17.637 8 6 19.642 6 34c0 14.358 11.643 26 26 26c21.688 0 26.577-20.134 24.543-30.332H50.66h-1.912H32v8.666h16.764c-1.928 7.47-8.691 13-16.764 13c-9.572 0-17.334-7.76-17.334-17.334C14.666 24.428 22.428 16.666 32 16.666c4.353 0 8.32 1.616 11.363 4.266l6.154-6.154C44.894 10.566 38.75 8 32 8z"
          variants={bodyVariants}
          initial="normal"
          animate={controls}
        />
      </svg>
    </div>
  );
};

export default ChromeIcon;

