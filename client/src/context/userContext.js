import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // axios for making HTTP requests

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (username, password) => {
    try {
      // Replace with your actual login endpoint
      const response = await axios.post('/api/login', { username, password });
      const { user, token } = response.data;
      setCurrentUser(user);
      localStorage.setItem('token', token); // Save the token in local storage (or another secure place)
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show an error message)
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token'); // Clear the token on logout
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
