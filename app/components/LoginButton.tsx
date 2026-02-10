// app/components/LoginButton.tsx
"use client";

import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar, Settings, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const { user, logout, isLoggedIn, loginWithGoogle } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load Google Identity Services script
    if (!isLoggedIn) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        if (window.google) {
          loginWithGoogle();
        }
      };
    }
  }, [isLoggedIn, loginWithGoogle]);

  const handleLogout = () => {
    logout();
    setShowProfile(false);
  };

  const navigateTo = (path: string) => {
    setShowProfile(false);
    router.push(path);
  };

  if (isLoggedIn && user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          {user.picture ? (
            <img 
              src={user.picture} 
              alt={user.name} 
              className="w-8 h-8 rounded-full border-2 border-teal-400"
            />
          ) : (
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          )}
          <span className="text-white font-medium hidden md:inline">
            {user.name.split(' ')[0]}
          </span>
        </button>

        {showProfile && (
          <div className="absolute right-0 mt-2 w-64 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-4 shadow-2xl z-50">
            <div className="flex items-center gap-3 mb-4">
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full border-2 border-teal-400"
                />
              ) : (
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <h4 className="font-bold text-white">{user.name}</h4>
                <p className="text-white/80 text-sm">{user.email}</p>
              </div>
            </div>
            
            <div className="space-y-1 mb-4">
              <button 
                onClick={() => navigateTo('/my-bookings')}
                className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4" />
                My Bookings
              </button>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">

      
      {/* Google Sign In Button Container */}
      <div id="googleSignInButton"></div>
    </div>
  );
}