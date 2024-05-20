const UnitTable = `CREATE TABLE IF NOT EXISTS invunit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shortname VARCHAR(50) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    status tinyint(1) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = UnitTable;
