import React, { useState, useMemo } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    IconButton,
    Tooltip,
    useTheme,
    Tab,
    Tabs,
    CircularProgress,
    Fade,
    Divider
} from '@mui/material';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    Area,
    AreaChart,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from 'recharts';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';

const Statistics = ({ users, loading = false }) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);

    // Enhanced color palette with opacity variations
    const COLORS = {
        primary: [
            theme.palette.primary.main,
            theme.palette.primary.light,
            theme.palette.primary.dark,
        ],
        secondary: [
            theme.palette.secondary.main,
            theme.palette.secondary.light,
            theme.palette.secondary.dark,
        ],
        success: theme.palette.success.main,
        warning: theme.palette.warning.main,
        error: theme.palette.error.main,
        info: theme.palette.info.main,
        chart: [
            '#2563eb', '#7c3aed', '#22c55e', '#eab308', 
            '#ef4444', '#06b6d4', '#ec4899', '#8b5cf6'
        ]
    };

    // Memoized Statistics Calculations
    const statistics = useMemo(() => {
        if (!users.length) return null;

        const totalUsers = users.length;
        const uniqueCountries = new Set(users.map(user => user.country)).size;
        const uniqueCities = new Set(users.map(user => user.city)).size;

        // Geographic Distribution
        const countryData = Object.entries(
            users.reduce((acc, user) => {
                acc[user.country] = (acc[user.country] || 0) + 1;
                return acc;
            }, {})
        )
            .map(([name, value]) => ({
                name,
                value,
                percentage: ((value / totalUsers) * 100).toFixed(1)
            }))
            .sort((a, b) => b.value - a.value);

        // City Distribution
        const cityData = Object.entries(
            users.reduce((acc, user) => {
                acc[user.city] = (acc[user.city] || 0) + 1;
                return acc;
            }, {})
        )
            .map(([name, value]) => ({
                name,
                value,
                percentage: ((value / totalUsers) * 100).toFixed(1)
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10); // Top 10 cities

        // Age Demographics
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

        const ageGroups = users.reduce((acc, user) => {
            const age = calculateAge(user.dateOfBirth);
            const group = Math.floor(age / 10) * 10;
            const groupName = `${group}-${group + 9}`;
            acc[groupName] = (acc[groupName] || 0) + 1;
            return acc;
        }, {});

        const ageData = Object.entries(ageGroups)
            .map(([range, count]) => ({
                range,
                count,
                percentage: ((count / totalUsers) * 100).toFixed(1)
            }))
            .sort((a, b) => parseInt(a.range) - parseInt(b.range));

        // User Growth Trends
        const monthlyTrends = users.reduce((acc, user) => {
            const date = new Date(user.dateOfBirth);
            const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
            acc[monthYear] = (acc[monthYear] || 0) + 1;
            return acc;
        }, {});

        const trendData = Object.entries(monthlyTrends)
            .map(([date, count]) => ({
                date,
                count,
                cumulative: count // Will be updated below
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        // Calculate cumulative growth
        let cumulative = 0;
        trendData.forEach(item => {
            cumulative += item.count;
            item.cumulative = cumulative;
        });

        // User Activity Metrics (example metrics)
        const activityMetrics = {
            totalUsers,
            activeUsers: Math.floor(totalUsers * 0.8), // Example metric
            newUsersThisMonth: trendData[trendData.length - 1]?.count || 0,
            userGrowthRate: ((trendData[trendData.length - 1]?.count / totalUsers) * 100).toFixed(1)
        };

        return {
            totalUsers,
            uniqueCountries,
            uniqueCities,
            countryData,
            cityData,
            ageData,
            trendData,
            activityMetrics
        };
    }, [users]);

    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Card sx={{ 
                    p: 1.5, 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: theme.shadows[3]
                }}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                        {label}
                    </Typography>
                    {payload.map((entry, index) => (
                        <Typography key={index} variant="body2" sx={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                            {entry.payload.percentage && ` (${entry.payload.percentage}%)`}
                        </Typography>
                    ))}
                </Card>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!statistics) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                    No data available
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4 }}>
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Total Users Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card 
                        elevation={0} 
                        sx={{ 
                            borderRadius: 2,
                            border: 1,
                            borderColor: 'divider',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: theme.shadows[4]
                            }
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PeopleIcon color="primary" />
                                <Typography variant="h6">Total Users</Typography>
                            </Box>
                            <Typography variant="h4" sx={{ mt: 2, fontWeight: 600 }}>
                                {statistics.totalUsers.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Growth rate: {statistics.activityMetrics.userGrowthRate}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Active Users Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={0} sx={{ /* same styles */ }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <GroupIcon color="secondary" />
                                <Typography variant="h6">Active Users</Typography>
                            </Box>
                            <Typography variant="h4" sx={{ mt: 2, fontWeight: 600 }}>
                                {statistics.activityMetrics.activeUsers.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {((statistics.activityMetrics.activeUsers / statistics.totalUsers) * 100).toFixed(1)}% of total
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Geographic Coverage */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={0} sx={{ /* same styles */ }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PublicIcon color="success" />
                                <Typography variant="h6">Coverage</Typography>
                            </Box>
                            <Typography variant="h4" sx={{ mt: 2, fontWeight: 600 }}>
                                {statistics.uniqueCountries}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Countries | {statistics.uniqueCities} Cities
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* New Users Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={0} sx={{ /* same styles */ }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon color="info" />
                                <Typography variant="h6">New Users</Typography>
                            </Box>
                            <Typography variant="h4" sx={{ mt: 2, fontWeight: 600 }}>
                                {statistics.activityMetrics.newUsersThisMonth.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                This month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Paper 
                elevation={0} 
                sx={{ 
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'divider',
                    overflow: 'hidden'
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    sx={{ 
                        borderBottom: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.default'
                    }}
                >
                    <Tab 
                        icon={<PublicIcon sx={{ mr: 1 }} />}
                        label="Geographic" 
                        iconPosition="start"
                    />
                    <Tab 
                        icon={<GroupIcon sx={{ mr: 1 }} />}
                        label="Demographics" 
                        iconPosition="start"
                    />
                    <Tab 
                        icon={<TimelineIcon sx={{ mr: 1 }} />}
                        label="Trends" 
                        iconPosition="start"
                    />
                </Tabs>

                <Box sx={{ p: 3 }}>
                    <Fade in={true} timeout={500}>
                        <div>
                            {/* Geographic Distribution */}
                            {activeTab === 0 && (
                                <Grid container spacing={3}>
                                    {/* Country Distribution */}
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ height: 400 }}>
                                            <Typography variant="h6" gutterBottom>
                                                Users by Country
                                            </Typography>
                                            <ResponsiveContainer>
                                                <PieChart>
                                                    <Pie
                                                        data={statistics.countryData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={80}
                                                        paddingAngle={5}
                                                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                                                    >
                                                        {statistics.countryData.map((entry, index) => (
                                                            <Cell 
                                                                key={`cell-${index}`} 
                                                                fill={COLORS.chart[index % COLORS.chart.length]}
                                                            />
                                                        ))}
                                                    </Pie>
                                                    <RechartsTooltip content={<CustomTooltip />} />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Grid>

                                    {/* City Distribution */}
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ height: 400 }}>
                                            <Typography variant="h6" gutterBottom>
                                                Top 10 Cities
                                            </Typography>
                                            <ResponsiveContainer>
                                                <BarChart
                                                    data={statistics.cityData}
                                                    layout="vertical"
                                                    margin={{ left: 100 }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis type="number" />
                                                    <YAxis 
                                                        dataKey="name" 
                                                        type="category"
                                                        tick={{ fontSize: 12 }}
                                                    />
                                                    <RechartsTooltip content={<CustomTooltip />} />
                                                    <Bar 
                                                        dataKey="value" 
                                                        fill={COLORS.primary[0]}
                                                        radius={[0, 4, 4, 0]}
                                                    >
                                                        {statistics.cityData.map((entry, index) => (
                                                            <Cell 
                                                                key={`cell-${index}`}
                                                                fill={COLORS.chart[index % COLORS.chart.length]}
                                                            />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Grid>

                                    {/* Geographic Metrics */}
                                    <Grid item xs={12}>
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Total Countries: {statistics.uniqueCountries} | 
                                                Total Cities: {statistics.uniqueCities}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            )}

                            {/* Demographics */}
                            {activeTab === 1 && (
                                <Grid container spacing={3}>
                                    {/* Age Distribution */}
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ height: 400 }}>
                                            <Typography variant="h6" gutterBottom>
                                                Age Distribution
                                            </Typography>
                                            <ResponsiveContainer>
                                                <BarChart data={statistics.ageData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="range" />
                                                    <YAxis />
                                                    <RechartsTooltip content={<CustomTooltip />} />
                                                    <Bar 
                                                        dataKey="count" 
                                                        fill={COLORS.primary[0]}
                                                        radius={[4, 4, 0, 0]}
                                                    >
                                                        {statistics.ageData.map((entry, index) => (
                                                            <Cell 
                                                                key={`cell-${index}`}
                                                                fill={COLORS.chart[index % COLORS.chart.length]}
                                                            />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Grid>

                                    {/* Demographics Radar */}
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ height: 400 }}>
                                            <Typography variant="h6" gutterBottom>
                                                User Demographics Overview
                                            </Typography>
                                            <ResponsiveContainer>
                                                <RadarChart outerRadius={90} data={statistics.ageData}>
                                                    <PolarGrid />
                                                    <PolarAngleAxis dataKey="range" />
                                                    <PolarRadiusAxis />
                                                    <Radar
                                                        name="Age Groups"
                                                        dataKey="count"
                                                        stroke={COLORS.primary[0]}
                                                        fill={COLORS.primary[0]}
                                                        fillOpacity={0.6}
                                                    />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Grid>
                                </Grid>
                            )}

                            {/* Trends */}
                            {activeTab === 2 && (
                                <Grid container spacing={3}>
                                    {/* Growth Trend */}
                                    <Grid item xs={12}>
                                        <Box sx={{ height: 400 }}>
                                            <Typography variant="h6" gutterBottom>
                                                User Growth Trend
                                            </Typography>
                                            <ResponsiveContainer>
                                                <AreaChart data={statistics.trendData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis 
                                                        dataKey="date"
                                                        tick={{ fontSize: 12 }}
                                                        angle={-45}
                                                        textAnchor="end"
                                                        height={70}
                                                    />
                                                    <YAxis />
                                                    <RechartsTooltip content={<CustomTooltip />} />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="cumulative"
                                                        name="Total Users"
                                                        stroke={COLORS.primary[0]}
                                                        fill={COLORS.primary[1]}
                                                        fillOpacity={0.3}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="count"
                                                        name="New Users"
                                                        stroke={COLORS.secondary[0]}
                                                        fill={COLORS.secondary[1]}
                                                        fillOpacity={0.3}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Grid>

                                    {/* Growth Metrics */}
                                    <Grid item xs={12}>
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Monthly Growth Rate: {statistics.activityMetrics.userGrowthRate}% | 
                                                New Users This Month: {statistics.activityMetrics.newUsersThisMonth}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            )}
                        </div>
                    </Fade>
                </Box>
            </Paper>
        </Box>
    );
};

export default Statistics; 