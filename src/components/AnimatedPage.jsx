// src/components/AnimatedPage.jsx
import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, scale: 0.9 },  // Empieza invisible y 20px más abajo
  animate: { opacity: 1, scale: 1 },    // Termina totalmente visible y en su posición original
  exit: { opacity: 0, scale: 0.9 },   // Al salir, se desvanece y se desliza 20px hacia arriba
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }} // Duración de la animación
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;