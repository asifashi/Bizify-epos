const CategoryTable = `CREATE TABLE IF NOT EXISTS invcategory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    itemcategory VARCHAR(50) NOT NULL,
    status tinyint(1) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = CategoryTable;
