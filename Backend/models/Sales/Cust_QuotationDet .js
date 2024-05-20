const Quotation = `CREATE TABLE IF NOT EXISTS Cust_QuotationDet (
    SDet_ID BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    VoucherNo VARCHAR(20) NOT NULL,
    ItemId NUMERIC(18, 0) NOT NULL,
    Description NVARCHAR(1000),
    BatchCode VARCHAR(50),
    UnitId VARCHAR(20),
    Sold_Qty NUMERIC(18, 3),
    UnitPrice NUMERIC(18, 4),
    CostPrice NUMERIC(18, 4),
    GrossAmt NUMERIC(18, 4),
    status VARCHAR(20),
    Discount NUMERIC(18, 4),
    NetAmount NUMERIC(18, 4),
    FSNO NUMERIC(18, 0) NOT NULL,
    SNO INT,
    DeliveryNote BIGINT,
    LocationID INT,
    CompanyId VARCHAR(20), 
    POD_ID BIGINT,
    delv_id BIGINT,
    Del_DetId INT,
    VatAmount NUMERIC(18, 4),
    Delv_No VARCHAR(50),
    Delv_Date DATETIME,
    WorkPeriodID INT,
    StationID INT,
    SV_Remarks_V NVARCHAR(500),
    SV_Origin_V NVARCHAR(500),
    SerialNo_V NVARCHAR(2000),
    SV_VendorName_V NVARCHAR(500),
    SalesManid INT,
    CostPriceBk NUMERIC(18, 4),
    S_Barcode NVARCHAR(80),
    Addi_Desc NVARCHAR(500),
    LedgerHead NVARCHAR(50),
    CostCenterid INT,
    CustomerID INT,
    Disc_Perc DECIMAL(18, 3),
    SERIEALNO INT,
    Exp_Date DATETIME
)`;


module.exports = Quotation