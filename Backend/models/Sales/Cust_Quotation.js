const Quotation =`CREATE TABLE IF NOT EXISTS Cust_Quotation (
    V_ID BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    VoucherNo VARCHAR(20) NOT NULL,
    ShortNo BIGINT NOT NULL,
    VoucherDate DATETIME,
    Voucher_Type VARCHAR(20),
    CustomerName VARCHAR(250),
    Customer_ID NUMERIC(18, 0),
    status VARCHAR(20),
    Location BIGINT,
    Salesman BIGINT,
    Discount NUMERIC(18, 4),
    GrossAmount NUMERIC(18, 4),
    NetAmount NUMERIC(18, 4),
    Remarks TEXT,
    UserId BIGINT,
    CurrencyId BIGINT,
    FSNO NUMERIC(18, 0),
    Description VARCHAR(250),
    CONO VARCHAR(50),
    DeliveryNote VARCHAR(100),
    Cust_PONo VARCHAR(20),
    Fc_Rate NUMERIC(18, 4),
    CompanyId VARCHAR(20),
    JobId BIGINT,
    Currency_ID BIGINT,
    Refrence VARCHAR(50),
    Cust_PODate DATETIME,
    NetDiscount NUMERIC(18, 4),
    CashCustName VARCHAR(100),
    DiscountPer NUMERIC(18, 4),
    Shipping_Address NVARCHAR(200),
    InvoiceType VARCHAR(50),
    ContractId BIGINT,
    PamentTerms_V VARCHAR(1000),
    PaymentTerms_V NVARCHAR(1000),
    TermsAndConditions_V NVARCHAR(1000),
    InvoiceStatus VARCHAR(50),
    SV_QtnID_N INT,
    CREDIT_CUST_ID BIGINT,
    VatAmount NUMERIC(18, 4),
    Vat_Per NUMERIC(18, 4),
    Vat_RoundSign NVARCHAR(1),
    Vat_RountAmt NUMERIC(18, 4),
    DeptID BIGINT,
    Name VARCHAR(50),
    Currency_Rate NUMERIC(18, 4),
    Advance DECIMAL(18, 3),
    Vat_No VARCHAR(50),
    ExcludeVAT BIT,
    CAddress VARCHAR(500),
    VATNo VARCHAR(50),
    KFCAmount DECIMAL(18, 5),
    KFC_perc DECIMAL(18, 5),
    StationID INT,
    WorkPeriodID INT,
    Vatable_TotAmt FLOAT,
    SV_VesselId INT,
    HOLD_B BIT,
    Counter_ID_N INT,
    Shift_ID_N INT,
    Retail_B BIT,
    Vat_AMT NUMERIC(18, 4),
    SVVatPosted BIT,
    QtnCode VARCHAR(80),
    DueDate DATETIME,
    ContactPerson NVARCHAR(150),
    sales_Acc NVARCHAR(80),
    CompBranchId INT,
    Branchid INT,
    Salesman_perc DECIMAL(18, 2),
    Salesman_perc_Value DECIMAL(18, 2),
    Adv_V_no NVARCHAR(50),
    Isposted BIT,
    PaidAmount INT,
    IsCust_GroupWise INT,
    Mobile NVARCHAR(20),
    Vehicil_no NVARCHAR(25),
    StationCode INT,
    VehicleDetails VARCHAR(150),
    VehicleNo VARCHAR(50),
    ItemDiscount DECIMAL(18, 2),
    vehicleCustomer VARCHAR(150),
    VeichleCust_Mobile VARCHAR(50),
    Coupen INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;


 
module.exports = Quotation;