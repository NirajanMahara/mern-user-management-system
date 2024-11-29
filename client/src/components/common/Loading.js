import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * Common Loading Component
 * @param {Object} props
 * @param {string} props.message - Optional loading message
 */
const Loading = ({ message = 'Loading...' }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
        >
            <CircularProgress size={40} />
            <Typography variant="body1" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </Box>
    );
};

export default Loading; 