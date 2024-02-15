import React, { createContext, useContext, useState } from 'react';

// Creating a context
const UserContext = createContext();

// Provider component that wraps your app and makes the user object available to any child component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Pretend we fetch this user object from your authentication flow
  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
