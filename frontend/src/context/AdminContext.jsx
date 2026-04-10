import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => !!sessionStorage.getItem('adminToken'));

  const login = (password) => {
    sessionStorage.setItem('adminToken', password);
    setIsAdmin(true);
  };

  const logout = () => {
    sessionStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  const getToken = () => sessionStorage.getItem('adminToken');

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, getToken }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
