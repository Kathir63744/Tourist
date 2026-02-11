"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User, token?: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('hillescape_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('hillescape_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, token?: string) => {
    const userWithDefaults = {
      ...userData,
      phone: userData.phone || ''
    };
    
    setUser(userWithDefaults);
    localStorage.setItem('hillescape_user', JSON.stringify(userWithDefaults));
    
    if (token) {
      localStorage.setItem('hillescape_token', token);
    }
    
    toast.success(`Welcome back, ${userData.name}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hillescape_user');
    localStorage.removeItem('hillescape_token');
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('hillescape_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout,
      isLoggedIn: !!user,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}