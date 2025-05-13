// This service handles authentication-related functions

// Check if user is authenticated
export const checkAuthStatus = () => {
  try {
    const { ApperUI } = window.ApperSDK;
    return ApperUI.isAuthenticated();
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
};

// Logout the user
export const logout = async () => {
  try {
    const { ApperUI } = window.ApperSDK;
    await ApperUI.logout();
    return { success: true };
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Logout failed. Please try again.");
  }
};

// Get current user information
export const getCurrentUser = () => {
  try {
    const { ApperUI } = window.ApperSDK;
    return ApperUI.getCurrentUser();
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};