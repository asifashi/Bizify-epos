// db.js
const mysql = require('mysql');
const createTableQueries = [
    { query: require('./usertable'), name: 'Users' },
    { query: require('./customertable'), name: 'Customers' },
    { query: require('./inventory/stockgroup'), name: 'Group' },
    { query: require('./inventory/stockcategory'), name: 'Category' },
    { query: require('./inventory/brand'), name: 'Brand' },
    { query: require('./inventory/units'), name: 'Unit' },
    { query: require('./mastertable'), name: 'Master' },
    { query: require('./account'), name: 'Accounts' },
    { query: require('./Sales/Sales_Voucher'), name: 'Salesv' },
    { query: require('./Sales/Sales_Voucher_Details'), name: 'Sales' },
    { query: require('./inventory/ItemMaster'), name: 'ItemMaster' },
    { query: require('./inventory/stock_register'), name: 'Stock Register' },
    { query: require('./StationMaster'), name: 'Station Master' },
    { query: require('./Sales/Cust_DeliveryNote'), name: 'Delivery note' },
    { query: require('./Sales/Cust_DeliveryNoteDet'), name: 'Delivery note details' },
    { query: require('./Sales/Cust_Quotation'), name: 'Quotation details' },
    { query: require('./Sales/Cust_QuotationDet '), name: 'Quotation details' },
    { query: require('./settings/paymentterms'), name: 'Terms details' },


    
];

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "company"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL Connected...");
    createTableQueries.forEach(({ query, name }) => {
        db.query(query, (err, data) => {
            if (err) throw err;
            console.log(`${name} table created or already exists`);
        });
    });
});

module.exports = db;
