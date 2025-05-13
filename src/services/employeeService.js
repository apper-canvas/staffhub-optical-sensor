// This service handles all employee-related API calls

// Fetch all employees
export const fetchEmployees = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "firstName" } },
        { Field: { Name: "lastName" } },
        { Field: { Name: "email" } },
        { Field: { Name: "phoneNumber" } },
        { Field: { Name: "department" } },
        { Field: { Name: "position" } },
        { Field: { Name: "dateHired" } },
        { Field: { Name: "status" } },
        { Field: { Name: "profileImage" } }
      ],
      where: [
        {
          fieldName: "IsDeleted",
          Operator: "ExactMatch",
          values: [false]
        }
      ],
      orderBy: [
        {
          field: "dateHired",
          direction: "DESC"
        }
      ]
    };
    
    const response = await client.fetchRecords("employee", params);
    
    if (!response || !response.data) {
      return { data: [] };
    }
    
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw new Error("Failed to fetch employees. Please try again later.");
  }
};

// Add a new employee
export const addEmployee = async (employeeData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Default profile image if not provided
    if (!employeeData.profileImage) {
      employeeData.profileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop";
    }
    
    // Set default status to active if not specified
    if (!employeeData.status) {
      employeeData.status = "active";
    }
    
    // Format the name field (which is a standard field in most Apper tables)
    employeeData.Name = `${employeeData.firstName} ${employeeData.lastName}`;
    
    const response = await client.createRecord("employee", {
      record: employeeData
    });
    
    if (!response || !response.success || !response.data) {
      throw new Error("Employee creation failed");
    }
    
    return { data: response.data };
  } catch (error) {
    console.error("Error adding employee:", error);
    throw new Error("Failed to add employee. Please try again later.");
  }
};

// Update employee status
export const updateEmployeeStatus = async (employeeId, status) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await client.updateRecord("employee", {
      record: {
        Id: employeeId,
        status: status
      }
    });
    
    if (!response || !response.success || !response.data) {
      throw new Error("Employee status update failed");
    }
    
    return { data: response.data };
  } catch (error) {
    console.error("Error updating employee status:", error);
    throw new Error("Failed to update employee status. Please try again later.");
  }
};

// Delete an employee (soft delete)
export const deleteEmployee = async (employeeId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await client.deleteRecord("employee", {
      RecordIds: [employeeId]
    });
    
    if (!response || !response.success) {
      throw new Error("Employee deletion failed");
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw new Error("Failed to delete employee. Please try again later.");
  }
};

// Get a single employee by ID
export const getEmployeeById = async (employeeId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await client.getRecordById("employee", employeeId);
    
    if (!response || !response.data) {
      throw new Error("Employee not found");
    }
    
    return { data: response.data };
  } catch (error) {
    console.error(`Error fetching employee with ID ${employeeId}:`, error);
    throw new Error("Failed to fetch employee details. Please try again later.");
  }
};