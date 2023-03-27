// Endpoints
export const EMPLOYEES_ENDPOINT = 'employees';
export const DEPARTMENTS_ENDPOINT = 'departments';
export const STATUS_ENDPOINT = 'statuses';
export const EMPLOYEE_ACTIONS_ENDPOINTS = {
  POST: 'add-employee',
  PUT: 'update-employee',
  DELETE: 'delete-employee'
}

// Page Headers
export const HOME_PAGE = "HOME";
export const VIEW_EMPLOYEES_PAGE = "MANAGE EMPLOYEES";
export const EDIT_PROFILE_PAGE = "EDIT PROFILE";
export const ADD_EMPLOYEE_PAGE = "ADD EMPLOYEE";
export const VIEW_DEPARTMENTS_PAGE = "MANAGE DEPARTMENTS";

// Colors
export const DEFAULT_PAGE_HEADER_COLOR = '#008CC9';
export const DEFAULT_PAGE_HEADER_TEXT_COLOR = '#fff';
export const STATES = {
  active: {
    textColor: 'rgb(92,166,124)',
    backgroundColor: 'rgb(242, 255, 246)',
    borderColor: 'rgb(204,240,210)'
  },
  holiday: {
    textColor: 'rgb(242,191,140)',
    backgroundColor: 'rgb(254,253,245)',
    borderColor: 'rgb(253,247,232)'
  },
  fired: {
    textColor: 'rgb(247, 141, 117)',
    backgroundColor: 'rgb(255, 223, 217)',
    borderColor: 'rgb(227, 165, 147)'
  }
}

// Hooks Data
export const HANDLE_ENPLOYEE_INPUT = {
  POST: {
    success: 'Successfully added employee to database.',
    failed: 'Failed to add employee. Please try again later.'
  },
  PUT: {
    success: 'Employee updated successfully.',
    failed: 'Failed to update employee. Please try again later.'
  },
  DELETE: {
    success: 'Employee deleted successfully',
    failed: 'Failed to delete employee. Pleaste try again later'
  }
}

// Others
export const DEFAULT_PROFILE_PICTURE = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';