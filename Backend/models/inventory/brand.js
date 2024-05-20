const BrandTable = `CREATE TABLE IF NOT EXISTS invbrand (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brandname VARCHAR(50) NOT NULL,
    status tinyint(1) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = BrandTable;
