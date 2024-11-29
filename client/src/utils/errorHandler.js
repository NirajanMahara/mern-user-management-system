export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error
        return error.response.data.message || 'An error occurred';
    } else if (error.request) {
        // Request made but no response
        return 'No response from server';
    } else {
        // Other errors
        return 'An error occurred';
    }
}; 