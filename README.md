# User Management System

A full-stack application for managing user data with authentication, CRUD operations, and data visualization.

## Features

### User Authentication & Management
- Secure Login/Register system
- JWT-based authentication
- Password encryption
- Session management

### User Operations
- Create new users with comprehensive details
- View user information in a data grid
- Update user information
- Delete single/multiple users
- Password management system

### Advanced Features
- Interactive data grid with AG-Grid
- Real-time search and filtering
- Batch operations (multiple delete)
- Data export to Excel/CSV
- Statistical visualization with charts
- Responsive design for all devices

### Data Visualization
- User distribution by country (Pie Chart)
- Age distribution (Bar Chart)
- City-wise user distribution
- Interactive charts with tooltips

## Tech Stack

### Frontend
- React 18
- Material-UI v6
- AG-Grid for data management
- Recharts for data visualization
- Axios for API communication
- React Router v7 for navigation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd user-management-system
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd client
   npm install
   ```

3. Environment Setup

   Create `.env` files in both client and server directories:

   Server `.env`:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

   Client `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Database Setup
   ```bash
   # Run database seeder (optional)
   cd server
   npm run seed
   ```

5. Start the Application
   ```bash
   # Start backend server (from server directory)
   npm start

   # Start frontend application (from client directory)
   npm start
   ```

## Project Structure

```
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   │   ├── ErrorMessage.js
│       │   │   ├── Loading.js
│       │   │   ├── ConfirmDialog.js
│       │   │   └── FormField.js
│       │   ├── Statistics.js
│       │   └── PrivateRoute.js
│       ├── pages/
│       │   ├── Dashboard.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── UserForm.js
│       ├── services/
│       │   └── api.js
│       ├── utils/
│       │   └── exportUtils.js
│       └── App.js
└── server/
    ├── controllers/
    │   └── userController.js
    ├── models/
    │   └── User.js
    ├── routes/
    │   └── userRoutes.js
    ├── middleware/
    │   └── authMiddleware.js
    └── utils/
        └── seedData.js
```

## API Documentation

### Authentication Endpoints

#### Register User
POST /api/users/register

Request body:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "dateOfBirth": "string",
  "phoneNumber": "string",
  "address1": "string",
  "city": "string",
  "postalCode": "string",
  "country": "string"
}
```

#### Login
POST /api/users/login

Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

### User Management Endpoints

#### Get All Users
GET /api/users/all

#### Update User
PUT /api/users/:id

#### Delete User
DELETE /api/users/:id

#### Batch Delete Users
POST /api/users/batch-delete

Request body:
```json
{
  "ids": ["string"]
}
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- Error handling and logging

## Error Handling

The application includes comprehensive error handling:
- Client-side form validation
- Server-side data validation
- API error responses
- User-friendly error messages
- Loading states and indicators

## Features Implementation Details

### Authentication
- JWT token-based authentication
- Secure password hashing using bcrypt
- Protected routes using React Router
- Session management with local storage

### User Management
- Complete CRUD operations
- Batch operations support
- Real-time search and filtering
- Data export functionality
- Form validation and error handling

### Data Visualization
- Interactive charts using Recharts
- Dynamic data updates
- Responsive design
- Multiple chart types (Pie, Bar)

## Development Guidelines

### Code Style
- ESLint configuration for code consistency
- Prettier for code formatting
- Component-based architecture
- Custom hooks for logic reuse
- Common components for UI consistency

### Best Practices
- Proper error handling
- Loading states management
- Form validation
- Secure authentication
- Responsive design
- Code splitting
- Performance optimization

### Testing
- Unit tests for components
- API endpoint testing
- Integration testing
- Error scenario testing
- Authentication testing

## Deployment

### Prerequisites
- Node.js environment
- MongoDB instance
- Environment variables configured

### Steps
1. Build the frontend
   ```bash
   cd client
   npm run build
   ```

2. Configure server
   - Set up environment variables
   - Configure MongoDB connection
   - Set up JWT secret

3. Deploy backend
   - Set up Node.js environment
   - Install dependencies
   - Start server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Write clear commit messages
- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

## Support

For support, please email [your-email] or open an issue in the repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the UI components
- AG-Grid for the powerful data grid
- Recharts for the visualization components
- MongoDB for the database
- Express.js for the backend framework
- React team for the frontend framework

---
Last Updated: Nov 29, 2024
Version: 1.0.0