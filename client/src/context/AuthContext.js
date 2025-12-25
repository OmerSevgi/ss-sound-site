import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // Import the api instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Use api.post instead of fetch
      const response = await api.post('/auth/login', { username, password });
      const data = response.data;

      // Axios wraps the response, so we don't need to check response.ok the same way
      // A successful request (2xx status code) will resolve the promise.
      // An unsuccessful one (4xx, 5xx) will reject it and be caught in the catch block.
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data)); // Store full user object
      setUser(data);
      return { success: true };

    } catch (error) {
      console.error('Giriş hatası:', error);
      // Axios places the server's response data in error.response.data
      const message = error.response?.data?.message || 'Sunucuya bağlanılamadı';
      return { success: false, message: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser'); // Remove user object as well
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
