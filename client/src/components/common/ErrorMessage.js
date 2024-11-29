import React from 'react';
import { Alert } from '@mui/material';

/**
 * Common Error Message Component
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {string} props.severity - Error severity (error, warning, info, success)
 */
const ErrorMessage = ({ message, severity = 'error' }) => {
    if (!message) return null;
    
    return (
        <Alert severity={severity} sx={{ mb: 2 }}>
            {message}
        </Alert>
    );
};

export default ErrorMessage; 