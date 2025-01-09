'use client'

import { useAnimation, motion } from 'motion/react'
import { BarChart3 } from 'lucide-react'

const BarChart3Icon = () => {
  const controls = useAnimation()

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      <motion.div
        initial="normal"
        animate={controls}
      >
        <BarChart3 size={18} strokeWidth={2}>
          <motion.rect
            width="4"
            height="5"
            x="3"
            y="14"
            rx="1"
            initial="normal"
            animate={controls}
            variants={{
              normal: { opacity: 1, scaleY: 1 },
              animate: {
                opacity: [0, 1],
                scaleY: [0, 1],
                transition: {
                  opacity: { duration: 0.5, times: [0.2, 1] },
                  duration: 0.5,
                },
              },
            }}
          />
          <motion.rect
            width="4"
            height="10"
            x="10"
            y="9"
            rx="1"
            initial="normal"
            animate={controls}
            variants={{
              normal: { opacity: 1, scaleY: 1 },
              animate: {
                opacity: [0, 1],
                scaleY: [0, 1],
                transition: {
                  opacity: { duration: 0.7, times: [0.3, 1] },
                  scaleY: { delay: 0.2 },
                  duration: 0.5,
                },
              },
            }}
          />
          <motion.rect
            width="4"
            height="15"
            x="17"
            y="4"
            rx="1"
            initial="normal"
            animate={controls}
            variants={{
              normal: { opacity: 1, scaleY: 1 },
              animate: {
                opacity: [0, 1],
                scaleY: [0, 1],
                transition: {
                  opacity: { duration: 0.8, times: [0.4, 1] },
                  scaleY: { delay: 0.4 },
                  duration: 0.5,
                },
              },
            }}
          />
        </BarChart3>
      </motion.div>
    </div>
  )
}

export { BarChart3Icon }

