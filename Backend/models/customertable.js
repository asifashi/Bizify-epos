const createTable = `CREATE TABLE IF NOT EXISTS customers (
    type VARCHAR(20),
    types VARCHAR(10),
    customerId INT  PRIMARY KEY,
    accno varchar(20),
    relativeno varchar(20),
    salutation VARCHAR(50),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    primaryContact VARCHAR(50),
    customerDisplayName VARCHAR(50),
    companyName VARCHAR(50),
    currency VARCHAR(10),
    customerEmail VARCHAR(50),
    customerPhone VARCHAR(20),
    workPhone VARCHAR(20),
    mobile VARCHAR(20),
    dueOnReceipt VARCHAR(50),
    paymentTerms VARCHAR(50),
    billingAttention VARCHAR(50),
    billingCountry VARCHAR(50),
    billingAddress VARCHAR(255),
    billingCity VARCHAR(50),
    billingState VARCHAR(50),
    billingZipCode VARCHAR(20),
    billingPhone VARCHAR(20),
    billingFax VARCHAR(20),
    billingEmail VARCHAR(50),
    shippingAttention VARCHAR(50),
    shippingCountry VARCHAR(50),
    shippingAddress VARCHAR(255),
    shippingCity VARCHAR(50),
    shippingState VARCHAR(50),
    shippingZipCode VARCHAR(20),
    shippingPhone VARCHAR(20),
    shippingFax VARCHAR(20),
    shippingEmail VARCHAR(50),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = createTable;
