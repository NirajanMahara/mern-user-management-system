import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Paper,
    Button,
    Typography,
    Box,
    Grid
} from '@mui/material';
import { register } from '../services/api';
import { ErrorMessage, FormField } from '../components/common';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
        country: '',
        notes: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const { confirmPassword, ...registrationData } = formData;
            await register(registrationData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 8, mb: 4 }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Register
                </Typography>

                {error && <ErrorMessage message={error} />}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Personal Information
                            </Typography>
                        </Grid>

                        <FormField
                            name="firstName"
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            autoFocus
                        />

                        <FormField
                            name="lastName"
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />

                        <FormField
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            xs={12}
                        />

                        <FormField
                            name="dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            InputLabelProps={{ shrink: true }}
                        />

                        <FormField
                            name="phoneNumber"
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            placeholder="+1 (123) 456-7890"
                        />

                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Address Information
                            </Typography>
                        </Grid>

                        <FormField
                            name="address1"
                            label="Address Line 1"
                            value={formData.address1}
                            onChange={handleChange}
                            required
                            xs={12}
                        />

                        <FormField
                            name="address2"
                            label="Address Line 2"
                            value={formData.address2}
                            onChange={handleChange}
                            xs={12}
                        />

                        <FormField
                            name="city"
                            label="City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />

                        <FormField
                            name="postalCode"
                            label="Postal Code"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                        />

                        <FormField
                            name="country"
                            label="Country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />

                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Password
                            </Typography>
                        </Grid>

                        <FormField
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            xs={12}
                        />

                        <FormField
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            xs={12}
                        />

                        <FormField
                            name="notes"
                            label="Notes"
                            value={formData.notes}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            xs={12}
                        />
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Typography color="primary">
                                Already have an account? Login
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register; 