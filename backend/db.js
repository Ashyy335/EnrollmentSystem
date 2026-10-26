const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool to manage concurrent student workflows
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection setup immediately upon server boot
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to XAMPP MySQL database (school_db).');
        connection.release();
    }
});

// Export the promise-based wrapper so you can use clean async/await functions
module.exports = pool.promise();