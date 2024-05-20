const TermsTable = `CREATE TABLE IF NOT EXISTS paymentterms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    terms VARCHAR(100000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = TermsTable;