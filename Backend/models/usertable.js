// createTable.js
const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CompanyId VARCHAR(20) NOT NULL,
    role VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = createTableQuery;
