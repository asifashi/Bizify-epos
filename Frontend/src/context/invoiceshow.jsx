import React, { createContext, useContext, useState } from 'react';

const InvoiceShowContext = createContext();

export const InvoiceShowProvider = ({ children }) => {
  const [invoiceShow, setinvoiceShow] = useState(false);

  return (
    <InvoiceShowContext.Provider value={{ invoiceShow, setinvoiceShow }}>
      {children}
    </InvoiceShowContext.Provider>
  );
};

export const useInvoiceShow = () => {
  const context = useContext(InvoiceShowContext);
  if (!context) {
    throw new Error('useInvoiceShow must be used within an InvoiceShowProvider');
  }
  return context;
};
