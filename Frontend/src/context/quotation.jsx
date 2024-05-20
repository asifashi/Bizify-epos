import React, { createContext, useContext, useState } from 'react';

const QuotationContext = createContext();

export const QuotationProvider = ({ children }) => {
  const [quotations, setQuotation] = useState(false);
  const [qtid, setQtid] = useState('');

  return (
    <QuotationContext.Provider value={{ quotations, setQuotation, qtid, setQtid }}>
      {children}
    </QuotationContext.Provider>
  );
};

export const useQuotation = () => {
  const context = useContext(QuotationContext);
  if (!context) {
    throw new Error('useQuotation must be used within a QuotationProvider');
  }
  return context;
};
