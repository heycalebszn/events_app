'use client'

import { useAnimation, motion } from 'motion/react'
import { Ticket } from 'lucide-react'

const TicketIcon = () => {
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
        <Ticket size={18} strokeWidth={2}>
          <motion.rect
            width="18"
            height="7"
            x="3"
            y="3"
            rx="1"
            initial="normal"
            animate={controls}
            variants={{
              normal: { opacity: 1, translateY: 0 },
              animate: {
                opacity: [0, 1],
                translateY: [-5, 0],
                transition: {
                  opacity: { duration: 0.5, times: [0.2, 1] },
                  duration: 0.5,
                },
              },
            }}
          />
          <motion.rect
            width="7"
            height="7"
            x="3"
            y="14"
            rx="1"
            initial="normal"
            animate={controls}
            variants={{
              normal: { opacity: 1, translateX: 0 },
              animate: {
                opacity: [0, 1],
                translateX: [-10, 0],
                transition: {
                  opacity: { duration: 0.7, times: [0.5, 1] },
                  translateX: { delay: 0.3 },
                  duration: 0.5,
                },
              },
            }}
          />
          <motion.rect
            width="7"
            height="7"
            x="14"
            y="14"
            rx="1"
            initial="normal"
            animate={controls}
            variants={{
              normal: { opacity: 1, translateX: 0 },
              animate: {
                opacity: [0, 1],
                translateX: [10, 0],
                transition: {
                  opacity: { duration: 0.8, times: [0.5, 1] },
                  translateX: { delay: 0.4 },
                  duration: 0.5,
                },
              },
            }}
          />
        </Ticket>
      </motion.div>
    </div>
  )
}

export { TicketIcon }

