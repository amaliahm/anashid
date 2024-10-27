import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedinUser, setLoggedinUser] = useState(null);
  // setLoggedinUser(storedUser.id)
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setLoggedinUser(parsedUser.id)
    }

  }, [])

  return (
    <UserContext.Provider value={{ loggedinUser, setLoggedinUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);