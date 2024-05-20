const Grouptable = `CREATE TABLE IF NOT EXISTS invgroup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    groupName VARCHAR(50) NOT NULL,
    status tinyint(1) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = Grouptable;
