import { createTheme } from '@mui/material/styles';

export const getTheme = (darkMode) => createTheme({
    palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
            main: darkMode ? '#60a5fa' : '#2563eb',
            light: darkMode ? '#93c5fd' : '#60a5fa',
            dark: darkMode ? '#2563eb' : '#1e40af',
        },
        secondary: {
            main: darkMode ? '#a78bfa' : '#7c3aed',
            light: darkMode ? '#c4b5fd' : '#a78bfa',
            dark: darkMode ? '#7c3aed' : '#5b21b6',
        },
        background: {
            default: darkMode ? '#0f172a' : '#f8fafc',
            paper: darkMode ? '#1e293b' : '#ffffff',
        },
        text: {
            primary: darkMode ? '#f1f5f9' : '#1e293b',
            secondary: darkMode ? '#94a3b8' : '#64748b',
        }
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                }
            }
        }
    }
});

export default getTheme; 