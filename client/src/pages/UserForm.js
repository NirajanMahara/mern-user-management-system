import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Paper,
    Button,
    Typography,
    Box,
    Grid
} from '@mui/material';
import { getAllUsers, updateUser, register } from '../services/api';
import { ErrorMessage, Loading, FormField } from '../components/common';

const UserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(!isEditMode);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
        country: '',
        notes: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (isEditMode) {
            fetchUserData();
        }
    }, [id, isEditMode]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            const user = response.data.find(user => user._id === id);
            if (user) {
                const formattedDate = new Date(user.dateOfBirth)
                    .toISOString()
                    .split('T')[0];
                
                setFormData({
                    ...user,
                    dateOfBirth: formattedDate,
                    password: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            setError('Error fetching user data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            if (showPasswordFields) {
                if (formData.password && formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    return;
                }
            }

            const submitData = { ...formData };
            delete submitData.confirmPassword;
            if (!submitData.password) {
                delete submitData.password;
            }

            if (isEditMode) {
                await updateUser(id, submitData);
            } else {
                if (!submitData.password) {
                    setError('Password is required for new users');
                    return;
                }
                await register(submitData);
            }
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Error saving user');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loading message="Loading user data..." />;

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, my: 4 }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    {isEditMode ? 'Edit User' : 'Add New User'}
                </Typography>

                {error && <ErrorMessage message={error} />}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        {/* Personal Information */}
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

                        {/* Address Information */}
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

                        {/* Password Section */}
                        <Grid item xs={12}>
                            {isEditMode ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Typography variant="h6">
                                        Password
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setShowPasswordFields(!showPasswordFields)}
                                    >
                                        {showPasswordFields ? 'Cancel Password Change' : 'Change Password'}
                                    </Button>
                                </Box>
                            ) : (
                                <Typography variant="h6" gutterBottom>
                                    Password
                                </Typography>
                            )}
                        </Grid>

                        {showPasswordFields && (
                            <>
                                <FormField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required={!isEditMode}
                                    xs={12}
                                />

                                <FormField
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required={!isEditMode}
                                    xs={12}
                                />
                            </>
                        )}

                        {/* Additional Information */}
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

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default UserForm; 