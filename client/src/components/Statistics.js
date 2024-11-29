import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
} from '@mui/material';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Chart color palette
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

/**
 * Statistics Component
 * Displays visual analytics of user data
 * @param {Object[]} users - Array of user objects
 */
const Statistics = ({ users }) => {
    /**
     * Calculate user distribution by country
     */
    const usersByCountry = users.reduce((acc, user) => {
        acc[user.country] = (acc[user.country] || 0) + 1;
        return acc;
    }, {});

    /**
     * Calculate user distribution by city
     */
    const usersByCity = users.reduce((acc, user) => {
        acc[user.city] = (acc[user.city] || 0) + 1;
        return acc;
    }, {});

    // Format data for charts
    const countryData = Object.entries(usersByCountry).map(([name, value]) => ({
        name,
        value
    }));

    // Get top 5 cities by user count
    const cityData = Object.entries(usersByCity)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, value]) => ({
            name,
            value
        }));

    /**
     * Calculate age from date of birth
     * @param {string} birthDate - Date of birth
     * @returns {number} Age in years
     */
    const calculateAge = birthDate => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    /**
     * Calculate age distribution in decades
     */
    const ageGroups = users.reduce((acc, user) => {
        const age = calculateAge(user.dateOfBirth);
        const group = Math.floor(age / 10) * 10;
        acc[`${group}-${group + 9}`] = (acc[`${group}-${group + 9}`] || 0) + 1;
        return acc;
    }, {});

    const ageData = Object.entries(ageGroups)
        .map(([name, value]) => ({
            name,
            value
        }))
        .sort((a, b) => parseInt(a.name) - parseInt(b.name));

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                User Statistics
            </Typography>
            <Grid container spacing={3}>
                {/* Country Distribution Chart */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            Users by Country
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={countryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {countryData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[index % COLORS.length]} 
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Top Cities Chart */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            Top 5 Cities
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={cityData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Age Distribution Chart */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, height: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            Age Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ageData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics; 