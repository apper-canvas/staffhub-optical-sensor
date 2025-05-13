import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(`${!darkMode ? 'Dark' : 'Light'} mode activated!`, {
      icon: !darkMode ? "🌙" : "☀️",
      position: "bottom-right",
      autoClose: 2000,
    });
  };
  
  // Icon declarations
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">SH</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-primary">StaffHub</h1>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 
                       dark:hover:bg-surface-600 transition-colors neu-light"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-300" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-primary" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </header>
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              &copy; {new Date().getFullYear()} StaffHub. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-surface-500 dark:text-surface-500 text-sm">
                Efficiently manage employee information and HR processes
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-xl shadow-soft"
      />
    </div>
  );
}

export default App;