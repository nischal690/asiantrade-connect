// This is a simple authentication check
// In a real application, you would want to use a proper authentication system

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);
}

export function useAuth() {
  const navigate = useNavigate();

  const login = (password: string): boolean => {
    if (password === "admin123") {
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin');
      return true;
    }
    return false;
  };

  const logout = (): void => {
    sessionStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const isAuthenticated = (): boolean => {
    return sessionStorage.getItem('isAdmin') === 'true';
  };

  return { login, logout, isAuthenticated };
}
