
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isloggedIn, setisloggedIn] = useState(false);

  const login = () => setisloggedIn(true);
  const logout = () =>{
    localStorage.removeItem("user");
     setisloggedIn(false)};

  return (
    <AuthContext.Provider value={{ isloggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
