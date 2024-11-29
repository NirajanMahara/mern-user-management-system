import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

/**
 * Format date to local string
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

/**
 * Prepare user data for export by formatting and cleaning
 * @param {Object[]} users - Array of user objects
 * @returns {Object[]} Formatted user data for export
 */
const prepareUserData = (users) => {
    return users.map(user => ({
        'First Name': user.firstName,
        'Last Name': user.lastName,
        'Email': user.email,
        'Date of Birth': formatDate(user.dateOfBirth),
        'Phone Number': user.phoneNumber,
        'Address': user.address1,
        'Address 2': user.address2 || '',
        'City': user.city,
        'Postal Code': user.postalCode,
        'Country': user.country,
        'Notes': user.notes || ''
    }));
};

/**
 * Export data to Excel file
 * @param {Object[]} users - Array of user objects
 */
export const exportToExcel = (users) => {
    try {
        // Format the data
        const formattedData = prepareUserData(users);
        
        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(formattedData);
        
        // Create workbook and append worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Users");
        
        // Generate Excel file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        
        // Create Blob and save file
        const dataBlob = new Blob([excelBuffer], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        
        // Generate filename with current date
        const fileName = `users_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        
        saveAs(dataBlob, fileName);
    } catch (error) {
        console.error('Excel export error:', error);
        throw new Error('Failed to export Excel file');
    }
};

/**
 * Export data to CSV file
 * @param {Object[]} users - Array of user objects
 */
export const exportToCSV = (users) => {
    try {
        // Format the data
        const formattedData = prepareUserData(users);
        
        // Create worksheet and convert to CSV
        const ws = XLSX.utils.json_to_sheet(formattedData);
        const csv = XLSX.utils.sheet_to_csv(ws);
        
        // Create Blob and save file
        const dataBlob = new Blob([csv], { 
            type: 'text/csv;charset=utf-8' 
        });
        
        // Generate filename with current date
        const fileName = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
        
        saveAs(dataBlob, fileName);
    } catch (error) {
        console.error('CSV export error:', error);
        throw new Error('Failed to export CSV file');
    }
}; 