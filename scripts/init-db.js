const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '3306'),
};

async function initDatabase() {
  let connection;
  
  try {
    // Connect to MySQL server (without specifying database)
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
    });

    console.log('Connected to MySQL server successfully');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'school_management';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database '${dbName}' created or already exists`);

    // Use the database
    await connection.execute(`USE ${dbName}`);

    // Create schools table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        contact BIGINT NOT NULL,
        image TEXT NOT NULL,
        email_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createTableQuery);
    console.log('Table "schools" created or already exists');

    // Insert sample data (optional)
    const sampleSchools = [
      {
        name: 'Sunshine Elementary School',
        address: '123 Sunshine Street',
        city: 'Springfield',
        state: 'IL',
        contact: '5551234567',
        image: '/sample-school-1.jpg',
        email_id: 'info@sunshine-elem.edu'
      },
      {
        name: 'Riverside High School',
        address: '456 River Road',
        city: 'Springfield',
        state: 'IL',
        contact: '5559876543',
        image: '/sample-school-2.jpg',
        email_id: 'contact@riverside-hs.edu'
      }
    ];

    // Check if table is empty before inserting sample data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM schools');
    if (rows[0].count === 0) {
      console.log('Inserting sample data...');
      for (const school of sampleSchools) {
        await connection.execute(
          'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [school.name, school.address, school.city, school.state, school.contact, school.image, school.email_id]
        );
      }
      console.log('Sample data inserted successfully');
    } else {
      console.log('Table already contains data, skipping sample data insertion');
    }

    console.log('\n✅ Database initialization completed successfully!');
    console.log(`\nDatabase: ${dbName}`);
    console.log('Table: schools');
    console.log('\nYou can now run the application with: npm run dev');

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.error('\nPlease check your MySQL connection settings:');
    console.error(`- Host: ${dbConfig.host}`);
    console.error(`- User: ${dbConfig.user}`);
    console.error(`- Port: ${dbConfig.port}`);
    console.error('\nMake sure MySQL server is running and credentials are correct.');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Load environment variables from .env.local
try {
  require('dotenv').config({ path: '.env.local' });
  console.log('Environment variables loaded from .env.local');
} catch (error) {
  console.log('dotenv not found, using default environment variables');
}

// Run the initialization
initDatabase();
