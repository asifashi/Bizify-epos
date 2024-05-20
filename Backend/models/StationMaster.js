const createStationMaster=`CREATE TABLE IF NOT EXISTS StationMaster (
    StationCode VARCHAR(30) PRIMARY KEY,
    StationName VARCHAR(200) NOT NULL,
    Address VARCHAR(200),
    City VARCHAR(100),
    PostOffice VARCHAR(100),
    Tele1 VARCHAR(30),
    Tele2 VARCHAR(30),
    Fax VARCHAR(30),
    Email VARCHAR(100),
    WebSite VARCHAR(100),
    Country VARCHAR(50),
    LogoPath VARCHAR(100),
    SignPath VARCHAR(100),
    LogoImg LONGBLOB,
    SignImg LONGBLOB,
    SealImg LONGBLOB,
    Vat_No NVARCHAR(200),
    BankName VARCHAR(100),
    AccountName VARCHAR(100),
    AccountNo VARCHAR(100),
    IBAN VARCHAR(100),
    SwiftCode VARCHAR(100),
    BankBranch VARCHAR(100),
    BankCurrency VARCHAR(100),
    CityID INT,
    CountryID INT,
    RegCode VARCHAR(100),
    CurrencyID INT,
    Stamp LONGBLOB,
    Stamp_Path NVARCHAR(150),
    Periodicity VARCHAR(30),
    Reg_Date DATETIME,
    Enable_Tax BIT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     
)`;

module.exports = createStationMaster;


