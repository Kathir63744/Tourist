// app/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

interface User {
  phone: any;
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user
    const savedUser = localStorage.getItem('hillescape_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('hillescape_user');
      }
    }
    setIsLoading(false);
  }, []);

  const loginWithGoogle = () => {
    // Initialize Google Identity Services
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      
      // Show the Google Sign In button
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        {
          theme: 'filled_black',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: 250
        }
      );
      
      // Also show the One Tap prompt
      window.google.accounts.id.prompt();
    }
  };

  const handleGoogleResponse = (response: any) => {
    try {
      const decoded: any = jwtDecode(response.credential);
      
      const userData: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        phone: undefined
      };

      setUser(userData);
      localStorage.setItem('hillescape_user', JSON.stringify(userData));
      localStorage.setItem('hillescape_token', response.credential);
      
      toast.success(`Welcome, ${decoded.name}!`);
      
      // Redirect to home page after successful login
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to sign in with Google');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hillescape_user');
    localStorage.removeItem('hillescape_token');
    
    // Clear any Google session
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      loginWithGoogle, 
      logout,
      isLoggedIn: !!user 
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

// Add global type for Google
declare global {
  interface Window {
    google: any;
  }
}