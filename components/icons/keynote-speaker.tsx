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

const KeynoteSpeakerIcon = () => {
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
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M24,19v4.6H0V19h19.6c0-1-0.2-2.1-0.8-2.9c-0.5-0.7-1.4-1.1-2.5-1.2c-0.1,0.2-0.3,0.3-0.5,0.3h-1
            c-0.3,0-0.5-0.2-0.5-0.5c0-0.3,0.2-0.5,0.5-0.5h1c0.2,0,0.4,0.2,0.5,0.4c1.2,0.1,2.2,0.5,2.8,1.4c0.7,0.9,0.9,2.1,0.9,3.1H24V19z
            M12,10.6c2.8,0,5-2.2,5-5s-2.2-5-5-5s-5,2.2-5,5S9.2,10.6,12,10.6z M18.2,16.6c-0.4-0.5-0.9-0.8-1.6-0.9c-0.2,0.2-0.5,0.3-0.8,0.3h-1
            c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3h1c0.4,0,0.7,0.2,0.9,0.4c1.1,0.1,2,0.6,2.6,1.3c0-0.1,0-0.1,0-0.1l-0.2-1.2
            c-0.6-1.8-2-3.2-3.9-3.7c-0.9,0.8-2,1.3-3.3,1.3s-2.4-0.5-3.3-1.3C7,11.4,5.2,13.5,5.2,16v2.8h14.1C18.7,17.7,18.5,17.1,18.2,16.6z"
          variants={pathVariants}
          initial="normal"
          animate={controls}
        />
      </svg>
    </div>
  );
};

export default KeynoteSpeakerIcon;