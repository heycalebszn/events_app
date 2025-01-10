'use client';

import { Store } from 'lucide-react';
import { motion } from 'motion/react';

const StoreIcon = () => {
  return (
    <motion.div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <Store size={18} strokeWidth={2} />
    </motion.div>
  );
};

export { StoreIcon };

