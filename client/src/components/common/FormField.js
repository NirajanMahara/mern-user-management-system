import React from 'react';
import { TextField, Grid } from '@mui/material';

/**
 * Common Form Field Component
 * @param {Object} props
 * @param {string} props.name - Field name
 * @param {string} props.label - Field label
 * @param {string} props.value - Field value
 * @param {function} props.onChange - Handle change
 * @param {boolean} props.required - Is field required
 * @param {string} props.type - Input type
 * @param {number} props.xs - Grid xs value
 * @param {number} props.sm - Grid sm value
 */
const FormField = ({
    name,
    label,
    value,
    onChange,
    required = false,
    type = 'text',
    xs = 12,
    sm = 6,
    ...props
}) => {
    return (
        <Grid item xs={xs} sm={sm}>
            <TextField
                fullWidth
                name={name}
                label={label}
                value={value}
                onChange={onChange}
                required={required}
                type={type}
                {...props}
            />
        </Grid>
    );
};

export default FormField; 