const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const users = [
    {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        address1: "123 Main St",
        address2: "Apt 4B",
        city: "New York",
        postalCode: "10001",
        country: "USA",
        phoneNumber: "212-555-1234",
        email: "john.doe@example.com",
        notes: "Senior Developer",
        password: "password123"
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1992-03-15",
        address1: "456 Park Ave",
        address2: "",
        city: "Boston",
        postalCode: "02108",
        country: "USA",
        phoneNumber: "617-555-5678",
        email: "jane.smith@example.com",
        notes: "Project Manager",
        password: "password123"
    },
    {
        firstName: "Michael",
        lastName: "Johnson",
        dateOfBirth: "1985-07-22",
        address1: "789 Oak Road",
        address2: "Suite 3",
        city: "Chicago",
        postalCode: "60601",
        country: "USA",
        phoneNumber: "312-555-9012",
        email: "michael.j@example.com",
        notes: "Technical Lead",
        password: "password123"
    },
    {
        firstName: "Emma",
        lastName: "Wilson",
        dateOfBirth: "1988-11-30",
        address1: "321 Pine Street",
        address2: "",
        city: "San Francisco",
        postalCode: "94105",
        country: "USA",
        phoneNumber: "415-555-3456",
        email: "emma.w@example.com",
        notes: "UX Designer",
        password: "password123"
    },
    {
        firstName: "Luis",
        lastName: "Garcia",
        dateOfBirth: "1993-05-18",
        address1: "567 Maple Ave",
        address2: "Unit 7",
        city: "Miami",
        postalCode: "33101",
        country: "USA",
        phoneNumber: "305-555-7890",
        email: "luis.g@example.com",
        notes: "Frontend Developer",
        password: "password123"
    },
    {
        firstName: "Sophie",
        lastName: "Martin",
        dateOfBirth: "1991-09-25",
        address1: "42 Rue de la Paix",
        address2: "",
        city: "Paris",
        postalCode: "75002",
        country: "France",
        phoneNumber: "33-1-23-45-67-89",
        email: "sophie.m@example.com",
        notes: "Data Analyst",
        password: "password123"
    },
    {
        firstName: "Alessandro",
        lastName: "Rossi",
        dateOfBirth: "1987-12-03",
        address1: "123 Via Roma",
        address2: "Piano 2",
        city: "Rome",
        postalCode: "00184",
        country: "Italy",
        phoneNumber: "39-06-789-0123",
        email: "alex.r@example.com",
        notes: "Backend Developer",
        password: "password123"
    },
    {
        firstName: "Anna",
        lastName: "Kowalski",
        dateOfBirth: "1994-02-14",
        address1: "45 Nowy Świat",
        address2: "",
        city: "Warsaw",
        postalCode: "00-001",
        country: "Poland",
        phoneNumber: "48-22-345-6789",
        email: "anna.k@example.com",
        notes: "QA Engineer",
        password: "password123"
    },
    {
        firstName: "Hans",
        lastName: "Schmidt",
        dateOfBirth: "1986-06-20",
        address1: "789 Berliner Str",
        address2: "",
        city: "Berlin",
        postalCode: "10115",
        country: "Germany",
        phoneNumber: "49-30-234-5678",
        email: "hans.s@example.com",
        notes: "Systems Architect",
        password: "password123"
    },
    {
        firstName: "Maria",
        lastName: "Silva",
        dateOfBirth: "1989-08-07",
        address1: "456 Rua Augusta",
        address2: "Apto 501",
        city: "São Paulo",
        postalCode: "01305-000",
        country: "Brazil",
        phoneNumber: "55-11-3456-7890",
        email: "maria.s@example.com",
        notes: "Product Owner",
        password: "password123"
    },
    {
        firstName: "Yuki",
        lastName: "Tanaka",
        dateOfBirth: "1995-04-12",
        address1: "1-2-3 Shibuya",
        address2: "",
        city: "Tokyo",
        postalCode: "150-0002",
        country: "Japan",
        phoneNumber: "81-3-1234-5678",
        email: "yuki.t@example.com",
        notes: "Mobile Developer",
        password: "password123"
    },
    {
        firstName: "Oliver",
        lastName: "Brown",
        dateOfBirth: "1984-10-28",
        address1: "789 Collins Street",
        address2: "Level 20",
        city: "Melbourne",
        postalCode: "3000",
        country: "Australia",
        phoneNumber: "61-3-9876-5432",
        email: "oliver.b@example.com",
        notes: "DevOps Engineer",
        password: "password123"
    },
    {
        firstName: "Elena",
        lastName: "Popov",
        dateOfBirth: "1993-01-15",
        address1: "42 Nevsky Prospekt",
        address2: "",
        city: "St. Petersburg",
        postalCode: "191186",
        country: "Russia",
        phoneNumber: "7-812-345-6789",
        email: "elena.p@example.com",
        notes: "UI Designer",
        password: "password123"
    },
    {
        firstName: "Mohammed",
        lastName: "Ahmed",
        dateOfBirth: "1988-03-21",
        address1: "123 Sheikh Zayed Rd",
        address2: "Suite 1501",
        city: "Dubai",
        postalCode: "12345",
        country: "UAE",
        phoneNumber: "971-4-234-5678",
        email: "mohammed.a@example.com",
        notes: "Project Coordinator",
        password: "password123"
    },
    {
        firstName: "Isabella",
        lastName: "López",
        dateOfBirth: "1991-07-08",
        address1: "789 Paseo de la Reforma",
        address2: "",
        city: "Mexico City",
        postalCode: "06500",
        country: "Mexico",
        phoneNumber: "52-55-1234-5678",
        email: "isabella.l@example.com",
        notes: "Business Analyst",
        password: "password123"
    },
    {
        firstName: "Lucas",
        lastName: "Anderson",
        dateOfBirth: "1987-05-16",
        address1: "456 Queen Street",
        address2: "",
        city: "Toronto",
        postalCode: "M5H 2N2",
        country: "Canada",
        phoneNumber: "1-416-555-0123",
        email: "lucas.a@example.com",
        notes: "Scrum Master",
        password: "password123"
    },
    {
        firstName: "Sophia",
        lastName: "Lee",
        dateOfBirth: "1994-11-03",
        address1: "789 Orchard Road",
        address2: "#12-34",
        city: "Singapore",
        postalCode: "238839",
        country: "Singapore",
        phoneNumber: "65-6789-0123",
        email: "sophia.l@example.com",
        notes: "Full Stack Developer",
        password: "password123"
    },
    {
        firstName: "Henrik",
        lastName: "Nielsen",
        dateOfBirth: "1986-09-12",
        address1: "123 Strøget",
        address2: "",
        city: "Copenhagen",
        postalCode: "1159",
        country: "Denmark",
        phoneNumber: "45-32-123-456",
        email: "henrik.n@example.com",
        notes: "Security Engineer",
        password: "password123"
    },
    {
        firstName: "Aisha",
        lastName: "Patel",
        dateOfBirth: "1992-12-28",
        address1: "456 Marine Drive",
        address2: "Flat 303",
        city: "Mumbai",
        postalCode: "400002",
        country: "India",
        phoneNumber: "91-22-2345-6789",
        email: "aisha.p@example.com",
        notes: "Database Administrator",
        password: "password123"
    },
    {
        firstName: "Carlos",
        lastName: "Fernández",
        dateOfBirth: "1989-04-05",
        address1: "789 Gran Vía",
        address2: "Piso 4",
        city: "Madrid",
        postalCode: "28013",
        country: "Spain",
        phoneNumber: "34-91-234-5678",
        email: "carlos.f@example.com",
        notes: "Cloud Architect",
        password: "password123"
    },
    {
        firstName: "Eva",
        lastName: "Andersson",
        dateOfBirth: "1990-08-17",
        address1: "123 Drottninggatan",
        address2: "",
        city: "Stockholm",
        postalCode: "111 21",
        country: "Sweden",
        phoneNumber: "46-8-123-456-78",
        email: "eva.a@example.com",
        notes: "Product Designer",
        password: "password123"
    },
    {
        firstName: "David",
        lastName: "Kim",
        dateOfBirth: "1993-06-24",
        address1: "456 Gangnam-daero",
        address2: "Unit 789",
        city: "Seoul",
        postalCode: "06000",
        country: "South Korea",
        phoneNumber: "82-2-3456-7890",
        email: "david.k@example.com",
        notes: "ML Engineer",
        password: "password123"
    },
    {
        firstName: "Sarah",
        lastName: "O'Connor",
        dateOfBirth: "1988-02-09",
        address1: "789 O'Connell Street",
        address2: "",
        city: "Dublin",
        postalCode: "D01 F5P2",
        country: "Ireland",
        phoneNumber: "353-1-234-5678",
        email: "sarah.o@example.com",
        notes: "Software Architect",
        password: "password123"
    },
    {
        firstName: "Thomas",
        lastName: "Miller",
        dateOfBirth: "1991-10-14",
        address1: "321 High Street",
        address2: "Flat 15",
        city: "London",
        postalCode: "SW1A 1AA",
        country: "UK",
        phoneNumber: "44-20-7123-4567",
        email: "thomas.m@example.com",
        notes: "DevOps Manager",
        password: "password123"
    },
    {
        firstName: "Nina",
        lastName: "Berg",
        dateOfBirth: "1987-03-30",
        address1: "456 Karl Johans gate",
        address2: "",
        city: "Oslo",
        postalCode: "0160",
        country: "Norway",
        phoneNumber: "47-22-123-456",
        email: "nina.b@example.com",
        notes: "System Administrator",
        password: "password123"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users');

        // Hash passwords and create users
        const hashedUsers = await Promise.all(users.map(async (user) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            return { ...user, password: hashedPassword };
        }));

        await User.insertMany(hashedUsers);
        console.log('Sample users created successfully');

        mongoose.disconnect();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

module.exports = seedDatabase; 