import { motion } from "framer-motion";

// export the animations
export { AnimateRightLeft, AnimateFadeDrop };

// ==============================
// Custom Animations
// ==============================

/**
 * Animate from right to left
 */
const AnimateRightLeft = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: "-100%" }}
      animate={{ opacity: 1, translateX: "0%" }}
      exit={{ opacity: 0, translateX: "-100%" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Animate fade drop
 */
const AnimateFadeDrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: "-5%" }}
      animate={{ opacity: 1, translateY: "0%" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
