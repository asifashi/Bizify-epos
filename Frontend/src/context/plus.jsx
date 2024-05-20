import React, { createContext, useContext, useState } from 'react';

const PlusContext = createContext();

export const PlusProvider = ({ children }) => {
  const [plus, setPlus] = useState(false);

  return (
    <PlusContext.Provider value={{ plus, setPlus }}>
      {children}
    </PlusContext.Provider>
  );
};

export const usePlus = () => {
  const context = useContext(PlusContext);
  if (!context) {
    throw new Error('usePlus must be used within a PlusProvider');
  }
  return context;
};
