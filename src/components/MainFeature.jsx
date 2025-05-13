import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature({ onAddEmployee }) {
  // Icon declarations at the top
  const UserPlusIcon = getIcon('UserPlus');
  const CheckCircleIcon = getIcon('CheckCircle');
  const XCircleIcon = getIcon('XCircle');
  const SlidersIcon = getIcon('Sliders');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: '',
    position: ''
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sample departments
  const departments = ["Engineering", "Marketing", "Human Resources", "Finance", "Sales", "Operations"];

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
      isValid = false;
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormSubmitted(true);
      
      // Simulate a delay (like an API call)
      setTimeout(() => {
        onAddEmployee(formData);
        setFormSubmitted(false);
        setIsFormOpen(false);
        resetForm();
      }, 1500);
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      department: '',
      position: ''
    });
    setErrors({});
  };

  return (
    <motion.div 
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-accent/10 p-2">
              <UserPlusIcon className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-xl font-bold text-surface-800 dark:text-surface-100">Add New Employee</h2>
          </div>
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)} 
            className="rounded-lg p-2 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label={isFormOpen ? "Close form" : "Open form"}
          >
            <SlidersIcon className="h-5 w-5 text-surface-500" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 overflow-hidden"
          >
            {formSubmitted ? (
              <motion.div 
                className="flex flex-col items-center justify-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold mb-1">Adding Employee...</h3>
                <p className="text-surface-500 dark:text-surface-400">This will only take a moment</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="label">First Name <span className="text-red-500">*</span></label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`input ${errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="label">Last Name <span className="text-red-500">*</span></label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`input ${errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="label">Email Address <span className="text-red-500">*</span></label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="label">Phone Number</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="input"
                    placeholder="555-123-4567"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="department" className="label">Department <span className="text-red-500">*</span></label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className={`input ${errors.department ? 'border-red-500 focus:ring-red-500' : ''}`}
                    >
                      <option value="">Select department</option>
                      {departments.map(department => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="mt-1 text-red-500 text-sm">{errors.department}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="position" className="label">Position <span className="text-red-500">*</span></label>
                    <input
                      id="position"
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className={`input ${errors.position ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter position"
                    />
                    {errors.position && (
                      <p className="mt-1 text-red-500 text-sm">{errors.position}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormOpen(false);
                      resetForm();
                    }}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <XCircleIcon className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    <span>Add Employee</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6"
          >
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <UserPlusIcon className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-surface-800 dark:text-surface-100">
                Add Team Members
              </h3>
              
              <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-xs">
                Expand your team by adding new employees to the system
              </p>
              
              <button
                onClick={() => setIsFormOpen(true)}
                className="btn btn-primary neu-light"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isFormOpen && (
        <div className="px-6 py-4 bg-surface-50 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
          <h3 className="font-medium mb-3 text-surface-700 dark:text-surface-300">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600">
              <p className="text-xs text-surface-500 dark:text-surface-400">Total Departments</p>
              <p className="text-lg font-bold">{departments.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600">
              <p className="text-xs text-surface-500 dark:text-surface-400">This Month</p>
              <p className="text-lg font-bold">+2 new</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default MainFeature;