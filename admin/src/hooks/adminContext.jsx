import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [id, setId] = useState(null);
  
  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin')
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin)
      setId(parsedAdmin.id)
    }

  }, [])

  return (
    <AdminContext.Provider value={{ id, setId }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);