# User Management System

A comprehensive full-stack application for user management, featuring authentication, CRUD operations, and advanced data visualization.

---




## Screenshots

<div align="center">

![1](screenshots/Screenshot%202024-11-29%20at%201.38.09%20PM.png)

![1](screenshots/Screenshot%202024-11-29%20at%201.38.49%20PM.png)

![1](screenshots/Screenshot%202024-11-29%20at%201.39.38%20PM.png)

![1](screenshots/Screenshot%202024-11-29%20at%201.39.55%20PM.png)

![1](screenshots/Screenshot%202024-11-29%20at%201.43.34%20PM.png)

![1](screenshots/Screenshot%202024-11-29%20at%201.43.56%20PM.png)

![1](screenshots/Screenshot%202024-11-29%20at%201.51.21%20PM.png)

![1](screenshots/Screenshot%202024-11-29%20at%201.51.34%20PM.png)

![1](screenshots/Screenshot%202024-11-29%20at%201.59.24%20PM.png)

![2](screenshots/Screenshot%202024-11-29%20at%202.00.01%20PM.png)

![2](screenshots/Screenshot%202024-11-29%20at%202.00.17%20PM.png)

![2](screenshots/Screenshot%202024-11-29%20at%202.01.30%20PM.png)

![3](screenshots/Screenshot%202024-11-29%20at%203.07.18%20AM.png)

![3](screenshots/Screenshot%202024-11-29%20at%203.07.44%20AM.png)

![3](screenshots/Screenshot%202024-11-29%20at%203.08.32%20AM.png)

![3](screenshots/Screenshot%202024-11-29%20at%203.09.01%20AM.png)

![3](screenshots/Screenshot%202024-11-29%20at%203.09.30%20AM.png)

![3](screenshots/Screenshot%202024-11-29%20at%203.09.45%20AM.png)

![10](screenshots/Screenshot%202024-12-02%20at%2010.17.04%20PM.png)

![9](screenshots/Screenshot%202024-12-02%20at%209.55.46%20PM.png)

![9](screenshots/Screenshot%202024-12-02%20at%209.57.14%20PM.png)

![Test Login API endpoint on Postman 10](screenshots/Test%20Login%20API%20endpoint%20on%20Postman%20Screenshot%202024-11-28%20at%2010.29.34%20PM.png)

![Test registration API endpoint on Postman 10](screenshots/Test%20registration%20API%20endpoint%20on%20Postman%20Screenshot%202024-11-28%20at%2010.27.34%20PM.png)

</div>

## Features

### Authentication & Security
- Secure login and registration
- JWT-based authentication
- Password encryption using bcrypt
- Session and token management

### User Management
- Create, read, update, and delete users
- Manage user information via an interactive data grid
- Batch operations (e.g., delete multiple users)
- Password management features

### Advanced Functionality
- Real-time search and filtering
- Export data to Excel/CSV
- Interactive data grid with AG-Grid
- Statistical visualization with charts
- Responsive design for all devices

### Data Visualization
- Charts for user distribution by:
  - Country (Pie Chart)
  - Age (Bar Chart)
  - City
- Interactive charts with tooltips and responsive layouts
- Various chart types: Bar, Pie, Area, Radar

### User Interface
- Dark/Light theme toggle with persistent preferences
- Material-UI design for responsiveness and aesthetics
- Custom AG-Grid styling with theme support
- Dashboard with advanced data visualization

---

## Tech Stack

### Frontend
- **React 18**
- **Material-UI v6** for styling
- **AG-Grid Enterprise** for advanced grids
- **Recharts** for data visualization
- **Context API** for state management
- **Formik & Yup** for form handling and validation
- **Axios** for API communication
- **React Router v7** for navigation

### Backend
- **Node.js** and **Express.js**
- **MongoDB** with Mongoose for database management
- **JWT** for authentication
- **Bcrypt** for password hashing

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd user-management-system
   ```

2. **Install dependencies**

   ```bash
   # Backend dependencies
   cd server
   npm install

   # Frontend dependencies
   cd client
   npm install
   ```

3. **Environment Setup**

   Create `.env` files in both the `client` and `server` directories.

   **Server .env:**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

   **Client .env:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Database Setup**

   Optionally seed the database:
   ```bash
   cd server
   npm run seed
   ```

5. **Start the Application**

   ```bash
   # Start backend server
   cd server
   npm start

   # Start frontend application
   cd client
   npm start
   ```

---

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

---

## API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/users/register`

  **Request Body:**
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

#### Login User
- **POST** `/api/users/login`

  **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### User Management Endpoints

#### Get All Users
- **GET** `/api/users/all`

#### Update User
- **PUT** `/api/users/:id`

#### Delete User
- **DELETE** `/api/users/:id`

#### Batch Delete Users
- **POST** `/api/users/batch-delete`

  **Request Body:**
  ```json
  {
    "ids": ["string"]
  }
  ```

---

## Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- Comprehensive error handling

---

## Testing

### Unit Testing
- React Testing Library for components
- Mock service workers for API testing
- Form and validation tests

### Integration Testing
- Authentication flows
- CRUD operations
- Database interactions

---

## Deployment

### Prerequisites
- Configure `.env` files for production
- Set up MongoDB in production
- Use a process manager like PM2 for the backend
- Build the frontend with `npm run build`

Deploy both backend and frontend to a hosting service of your choice (e.g., AWS, Heroku).
