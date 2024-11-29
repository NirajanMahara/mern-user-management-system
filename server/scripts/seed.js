const seedDatabase = require('../utils/seedData');

// Run the seed function
seedDatabase()
    .then(() => {
        console.log('Seeding completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    }); 