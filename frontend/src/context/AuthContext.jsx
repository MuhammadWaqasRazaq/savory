import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setStoredAuth = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const register = useCallback(async (name, email, password) => {
    const data = await authService.register({ name, email, password });
    setStoredAuth(data);
    setUser(data);
    return data;
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authService.login({ email, password });
    setStoredAuth(data);
    setUser(data);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  useEffect(() => {
    const verifyStoredUser = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!storedUser || !token) {
        setLoading(false);
        return;
      }

      try {
        setUser(JSON.parse(storedUser));
        const fresh = await authService.getMe();
        localStorage.setItem('user', JSON.stringify(fresh));
        setUser(fresh);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyStoredUser();
  }, []);

  useEffect(() => {
    const handleExpired = () => {
      setUser(null);
    };
    window.addEventListener('auth-expired', handleExpired);
    return () => window.removeEventListener('auth-expired', handleExpired);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};