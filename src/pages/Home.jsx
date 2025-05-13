import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Sample employee data to simulate backend data
const initialEmployees = [
  {
    id: 1,
    firstName: "Jessica",
    lastName: "Chen",
    email: "jessica.chen@staffhub.com",
    phoneNumber: "555-123-4567",
    department: "Engineering",
    position: "Senior Developer",
    dateHired: "2020-06-15",
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Rodriguez",
    email: "michael.r@staffhub.com",
    phoneNumber: "555-987-6543",
    department: "Marketing",
    position: "Marketing Manager",
    dateHired: "2019-02-20",
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@staffhub.com",
    phoneNumber: "555-345-6789",
    department: "Human Resources",
    position: "HR Specialist",
    dateHired: "2021-04-10",
    status: "on leave",
    profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"
  }
];

// Sample departments
const departments = ["All", "Engineering", "Marketing", "Human Resources", "Finance", "Sales", "Operations"];

function Home() {
  // Icon declarations at the top
  const UsersIcon = getIcon('Users');
  const UserPlusIcon = getIcon('UserPlus');
  const UserCheckIcon = getIcon('UserCheck');
  const UserXIcon = getIcon('UserX');
  const SearchIcon = getIcon('Search');
  const FilterIcon = getIcon('Filter');
  const ChevronDownIcon = getIcon('ChevronDown');
  
  const [employees, setEmployees] = useState(initialEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  // Handle search and filtering
  useEffect(() => {
    let results = employees;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(
        employee => 
          employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply department filter
    if (selectedDepartment !== 'All') {
      results = results.filter(employee => employee.department === selectedDepartment);
    }
    
    // Apply status filter
    if (selectedStatus !== 'All') {
      results = results.filter(employee => employee.status === selectedStatus.toLowerCase());
    }
    
    setFilteredEmployees(results);
  }, [searchTerm, selectedDepartment, selectedStatus, employees]);
  
  // Handle adding a new employee from the MainFeature component
  const handleAddEmployee = (newEmployee) => {
    const updatedEmployees = [...employees, {
      ...newEmployee,
      id: employees.length + 1,
      status: 'active',
      dateHired: new Date().toISOString().slice(0, 10),
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    }];
    
    setEmployees(updatedEmployees);
    toast.success(`${newEmployee.firstName} ${newEmployee.lastName} added successfully!`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-surface-800 dark:text-surface-100">
            Employee Management Dashboard
          </h1>
          <p className="text-surface-600 dark:text-surface-400 text-base md:text-lg">
            View, filter and manage your team members in one place
          </p>
        </header>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mr-4">
              <UsersIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-surface-500 dark:text-surface-400">Total Employees</h3>
              <p className="text-2xl font-bold">{employees.length}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mr-4">
              <UserCheckIcon className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-sm text-surface-500 dark:text-surface-400">Active</h3>
              <p className="text-2xl font-bold">
                {employees.filter(emp => emp.status === 'active').length}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center">
            <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 mr-4">
              <UserXIcon className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm text-surface-500 dark:text-surface-400">On Leave</h3>
              <p className="text-2xl font-bold">
                {employees.filter(emp => emp.status === 'on leave').length}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 mr-4">
              <UserPlusIcon className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-sm text-surface-500 dark:text-surface-400">Departments</h3>
              <p className="text-2xl font-bold">
                {new Set(employees.map(emp => emp.department)).size}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <motion.div 
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0 text-surface-800 dark:text-surface-100">
                Employee Directory
              </h2>
              
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                <div className="relative w-full sm:w-64">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    className="input pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button 
                  className="btn btn-outline flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FilterIcon className="h-4 w-4" />
                  <span>Filters</span>
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
            
            {showFilters && (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label htmlFor="department" className="label">Department</label>
                  <select
                    id="department"
                    className="input"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="status" className="label">Status</label>
                  <select
                    id="status"
                    className="input"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </motion.div>
            )}
            
            <div className="overflow-x-auto">
              {filteredEmployees.length > 0 ? (
                <div className="grid gap-4">
                  {filteredEmployees.map((employee) => (
                    <motion.div
                      key={employee.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 border border-surface-200 dark:border-surface-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center w-full sm:w-auto mb-3 sm:mb-0">
                        <img 
                          src={employee.profileImage} 
                          alt={`${employee.firstName} ${employee.lastName}`}
                          className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-white dark:border-surface-700 shadow-sm"
                        />
                        <div>
                          <h3 className="font-semibold text-base md:text-lg">
                            {employee.firstName} {employee.lastName}
                          </h3>
                          <p className="text-sm text-surface-500 dark:text-surface-400">
                            {employee.position}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 ml-0 sm:ml-auto mt-2 sm:mt-0">
                        <div>
                          <p className="text-xs text-surface-500 dark:text-surface-400">Department</p>
                          <p className="text-sm font-medium">{employee.department}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-surface-500 dark:text-surface-400">Email</p>
                          <p className="text-sm font-medium">{employee.email}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-surface-500 dark:text-surface-400">Status</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employee.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <SearchIcon className="h-12 w-12 mx-auto text-surface-300 dark:text-surface-600 mb-4" />
                  <h3 className="text-lg font-medium text-surface-700 dark:text-surface-300 mb-1">No employees found</h3>
                  <p className="text-surface-500 dark:text-surface-400">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        <div>
          <MainFeature onAddEmployee={handleAddEmployee} />
        </div>
      </div>
    </div>
  );
}

export default Home;