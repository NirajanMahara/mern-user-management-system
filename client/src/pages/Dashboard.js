import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Paper, Button, Typography, Box,
    AppBar, Toolbar, TextField, FormControl,
    InputLabel, Select, MenuItem, Grid
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { getAllUsers, deleteUser, deleteBatchUsers } from '../services/api';
import { ErrorMessage, Loading, ConfirmDialog } from '../components/common';
import Statistics from '../components/Statistics';
import DownloadIcon from '@mui/icons-material/Download';
import { exportToExcel, exportToCSV } from '../utils/exportUtils';

/**
 * Dashboard Component
 * Main interface for user management system
 */
const Dashboard = () => {
    // Navigation and State Management
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState('');
    const [view, setView] = useState('table');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        searchTerm: '',
        filterBy: 'all'
    });
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: '',
        message: '',
        onConfirm: null
    });

    // Grid Column Definitions
    const columns = [
        {
            field: 'firstName',
            headerName: 'First Name',
            sortable: true,
            filter: true,
            checkboxSelection: true,
            headerCheckboxSelection: true
        },
        { field: 'lastName', headerName: 'Last Name', sortable: true, filter: true },
        { field: 'email', headerName: 'Email', sortable: true, filter: true },
        { field: 'phoneNumber', headerName: 'Phone', sortable: true },
        { field: 'city', headerName: 'City', sortable: true, filter: true },
        { field: 'country', headerName: 'Country', sortable: true, filter: true },
        {
            headerName: 'Actions',
            cellRenderer: params => (
                <Box>
                    <Button
                        size="small"
                        onClick={() => navigate(`/user/edit/${params.data._id}`)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(params.data._id)}
                    >
                        Delete
                    </Button>
                </Box>
            )
        }
    ];

    // Fetch Users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    // Single useEffect for initial load
    useEffect(() => {
        fetchUsers();
    }, []);

    // Separate useEffect for filtering
    useEffect(() => {
        if (users.length > 0) {
            filterUsers();
        }
    }, [searchParams, users]);

    /**
     * Filter users based on search parameters
     */
    const filterUsers = () => {
        const { searchTerm, filterBy } = searchParams;
        if (!searchTerm) {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter(user => {
            const searchValue = searchTerm.toLowerCase();
            if (filterBy === 'all') {
                return Object.values(user).some(value => 
                    String(value).toLowerCase().includes(searchValue)
                );
            }
            return String(user[filterBy]).toLowerCase().includes(searchValue);
        });

        setFilteredUsers(filtered);
    };

    /**
     * Handle single user deletion
     */
    const handleDelete = (id) => {
        setConfirmDialog({
            open: true,
            title: 'Delete User',
            message: 'Are you sure you want to delete this user?',
            onConfirm: async () => {
                try {
                    await deleteUser(id);
                    setUsers(users.filter(user => user._id !== id));
                    setError('');
                } catch (error) {
                    setError('Error deleting user');
                }
                setConfirmDialog({ ...confirmDialog, open: false });
            }
        });
    };

    /**
     * Handle batch deletion of users
     */
    const handleBatchDelete = () => {
        if (selectedUsers.length === 0) {
            setError('No users selected');
            return;
        }

        setConfirmDialog({
            open: true,
            title: 'Batch Delete Users',
            message: `Are you sure you want to delete ${selectedUsers.length} selected users?`,
            onConfirm: async () => {
                try {
                    await deleteBatchUsers(selectedUsers);
                    setUsers(users.filter(user => !selectedUsers.includes(user._id)));
                    setSelectedUsers([]);
                    setError('');
                } catch (error) {
                    setError('Error performing batch delete');
                }
                setConfirmDialog({ ...confirmDialog, open: false });
            }
        });
    };

    /**
     * Handle user logout
     */
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    /**
     * Handle grid selection changes
     */
    const onSelectionChanged = (params) => {
        const selectedRows = params.api.getSelectedRows();
        setSelectedUsers(selectedRows.map(row => row._id));
    };

    const handleExport = (type) => {
        try {
            if (type === 'excel') {
                exportToExcel(filteredUsers);
            } else if (type === 'csv') {
                exportToCSV(filteredUsers);
            }
        } catch (error) {
            setError('Error exporting data');
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        User Management System
                    </Typography>
                    <Button 
                        color="inherit" 
                        onClick={() => setView(view === 'table' ? 'stats' : 'table')}
                    >
                        {view === 'table' ? 'Show Statistics' : 'Show Table'}
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/user/add')}>
                        Add User
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                {error && <ErrorMessage message={error} />}

                {/* Search and Filter Controls - Always visible */}
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Search"
                                variant="outlined"
                                value={searchParams.searchTerm}
                                onChange={(e) => setSearchParams(prev => ({
                                    ...prev,
                                    searchTerm: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Filter By</InputLabel>
                                <Select
                                    value={searchParams.filterBy}
                                    label="Filter By"
                                    onChange={(e) => setSearchParams(prev => ({
                                        ...prev,
                                        filterBy: e.target.value
                                    }))}
                                >
                                    <MenuItem value="all">All Fields</MenuItem>
                                    <MenuItem value="firstName">First Name</MenuItem>
                                    <MenuItem value="lastName">Last Name</MenuItem>
                                    <MenuItem value="email">Email</MenuItem>
                                    <MenuItem value="country">Country</MenuItem>
                                    <MenuItem value="city">City</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Export and Batch Delete Controls */}
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        {selectedUsers.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleBatchDelete}
                            >
                                Delete Selected ({selectedUsers.length})
                            </Button>
                        )}
                    </Box>
                    <Box>
                        <Button
                            variant="outlined"
                            onClick={() => handleExport('excel')}
                            startIcon={<DownloadIcon />}
                            sx={{ mr: 1 }}
                        >
                            Export to Excel
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleExport('csv')}
                            startIcon={<DownloadIcon />}
                        >
                            Export to CSV
                        </Button>
                    </Box>
                </Box>

                {/* Main Content */}
                {loading ? (
                    <Loading message="Loading users..." />
                ) : (
                    view === 'table' ? (
                        <Paper sx={{ height: 600 }}>
                            <div className="ag-theme-material" style={{ height: '100%', width: '100%' }}>
                                <AgGridReact
                                    rowData={filteredUsers}
                                    columnDefs={columns}
                                    pagination={true}
                                    paginationPageSize={10}
                                    rowSelection="multiple"
                                    suppressRowClickSelection={true}
                                    onSelectionChanged={onSelectionChanged}
                                />
                            </div>
                        </Paper>
                    ) : (
                        <Statistics users={filteredUsers} />
                    )
                )}

                <ConfirmDialog
                    open={confirmDialog.open}
                    title={confirmDialog.title}
                    message={confirmDialog.message}
                    onConfirm={confirmDialog.onConfirm}
                    onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
                />
            </Container>
        </>
    );
};

export default Dashboard; 