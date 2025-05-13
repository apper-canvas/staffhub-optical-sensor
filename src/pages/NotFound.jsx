import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  // Icon declarations
  const AlertTriangleIcon = getIcon('AlertTriangle');
  const HomeIcon = getIcon('Home');
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 p-6 rounded-full bg-orange-100 dark:bg-orange-900/20"
      >
        <AlertTriangleIcon className="h-16 w-16 md:h-24 md:w-24 text-orange-500" />
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        404
      </motion.h1>
      
      <motion.h2 
        className="text-2xl md:text-3xl font-bold mb-4 text-surface-800 dark:text-surface-100"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Page Not Found
      </motion.h2>
      
      <motion.p 
        className="text-lg text-surface-600 dark:text-surface-400 max-w-lg mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link 
          to="/" 
          className="btn btn-primary flex items-center gap-2 mx-auto neu-light"
        >
          <HomeIcon className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default NotFound;