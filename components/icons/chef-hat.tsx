'use client';

import { motion, useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 }
    }
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 }
    }
  }
};

const ChefHatIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M11.57 5.97C15.2 1.48 21.7 7.87 16.58 11.35C17.62 13 19.55 16.93 17.35 18.33C15.18 19.63 12.66 20.77 10.08 20.53C8.13 20.3 8.05 18.1 7.71 16.57C7.51 15.63 7.4 14.66 7.18 13.72C2.54 14.69 1.92 9.43 5.87 7.96C5.92 7.94 5.98 7.89 5.99 7.84C6.69 5.52 9.61 4.66 11.57 5.97Z"
          stroke="#000000"
          variants={pathVariants}
          initial="normal"
          animate={controls}
        />
        <motion.path
          d="M7.22 7.78C8.22 5.78 11.77 6.32 11.87 8.62C11.84 8.98 12.1 9.34 12.45 9.33C12.76 9.34 12.89 8.98 13.04 8.77C13.19 7.37 12.18 6.78 12.53 6.5C13.82 5.02 16.05 5.52 16.93 6.9C18.22 9.21 15.77 11.23 13.43 10.81C12.66 10.8 12.59 11.88 13.35 11.97C13.98 12.05 14.62 12.05 15.25 11.89C15.39 11.85 15.45 11.9 15.49 12.02C15.69 12.37 15.86 12.73 16.13 13.03C16.53 13.48 16.73 14.07 16.9 14.65C17.06 15.17 17.06 15.17 16.63 15.51C14.55 17.17 11.91 17.88 9.28 17.85C9.13 17.85 9.08 17.8 9.06 17.66C8.79 16.23 8.46 14.81 8.17 13.39C8.16 13.34 8.22 13.28 8.26 13.25C8.86 12.88 9.41 12.37 9.65 11.7C9.81 10.99 8.85 10.7 8.53 11.33C7.8 13.06 3.81 13.26 4.51 10.8C5.03 9.09 7.06 8.35 8.58 9.3C8.8 9.4 9.03 9.32 9.17 9.17C9.76 8.33 7.82 7.78 7.22 7.78Z"
          fill="white"
          stroke="#000000"
          variants={pathVariants}
          initial="normal"
          animate={controls}
        />
        <motion.path
          d="M17.12 15.97C17.27 16.98 16.47 17.6 15.66 17.99C14.28 18.6 9.96 20.68 9.28 18.48C12.17 18.49 14.78 17.69 17.12 15.97Z"
          fill="white"
          stroke="#000000"
          variants={pathVariants}
          initial="normal"
          animate={controls}
        />
      </svg>
    </div>
  );
};

export default ChefHatIcon;