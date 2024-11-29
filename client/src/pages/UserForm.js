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
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';

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
            <Paper 
                elevation={0}
                sx={{ 
                    p: 4, 
                    my: 4,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography 
                        component="h1" 
                        variant="h4" 
                        sx={{ 
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 1
                        }}
                    >
                        {isEditMode ? 'Edit User' : 'Add New User'}
                    </Typography>
                    <Typography 
                        color="text.secondary"
                        variant="body1"
                    >
                        {isEditMode 
                            ? 'Update user information and preferences' 
                            : 'Create a new user account with details'
                        }
                    </Typography>
                </Box>

                {error && (
                    <ErrorMessage 
                        message={error}
                        sx={{ mb: 3 }}
                    />
                )}

                <Box 
                    component="form" 
                    onSubmit={handleSubmit}
                    sx={{ 
                        mt: 2,
                        '& .MuiTextField-root': { mb: 2 }
                    }}
                >
                    <Grid container spacing={3}>
                        {/* Section: Personal Information */}
                        <Grid item xs={12}>
                            <Box sx={{ 
                                p: 2, 
                                bgcolor: 'background.default',
                                borderRadius: 1,
                                mb: 2
                            }}>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        mb: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: 'primary.main'
                                    }}
                                >
                                    <PersonIcon /> Personal Information
                                </Typography>
                                <Grid container spacing={2}>
                                    <FormField
                                        name="firstName"
                                        label="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                        xs={12}
                                        sm={6}
                                    />
                                    <FormField
                                        name="lastName"
                                        label="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        xs={12}
                                        sm={6}
                                    />
                                    <FormField
                                        name="email"
                                        label="Email Address"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        xs={12}
                                        sm={6}
                                    />
                                    <FormField
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                        xs={12}
                                        sm={6}
                                    />
                                    <FormField
                                        name="phoneNumber"
                                        label="Phone Number"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        placeholder="+1 (123) 456-7890"
                                        xs={12}
                                        sm={6}
                                    />
                                </Grid>
                            </Box>
                        </Grid>

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

                        {/* Action Buttons */}
                        <Grid item xs={12}>
                            <Box sx={{ 
                                display: 'flex', 
                                gap: 2,
                                justifyContent: 'flex-end',
                                mt: 2 
                            }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/dashboard')}
                                    startIcon={<ArrowBackIcon />}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                                >
                                    {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default UserForm; 