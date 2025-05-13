import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');

  return (
    <motion.div 
      className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-amber-100 dark:bg-amber-900/30">
            <AlertTriangleIcon className="h-16 w-16 text-amber-500" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-surface-800 dark:text-surface-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-2">Page Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="btn btn-primary inline-flex items-center gap-2 neu-light"
        >
          <HomeIcon className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default NotFound;