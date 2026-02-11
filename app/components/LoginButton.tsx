"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar, Mail, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    google: any;
  }
}

export default function LoginButton() {
  const { user, logout, isLoggedIn, login, updateUser } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({ name: '', phone: '' });
  const router = useRouter();

  // ============= GOOGLE SIGN-IN INITIALIZATION =============
  useEffect(() => {
    // Only run on client side and if not logged in
    if (typeof window === 'undefined' || isLoggedIn) return;
    
    // Check if script already exists
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      initializeGoogleSignIn();
      return;
    }
    
    // Create and load script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    script.onerror = () => {
      console.error('Failed to load Google Sign-In script');
    };
    
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [isLoggedIn]);

  // Initialize Google Sign-In
  const initializeGoogleSignIn = () => {
    if (typeof window === 'undefined' || !window.google) return;
    
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      
      if (!clientId) {
        console.error('Google Client ID is missing');
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
        auto_select: false,
        context: 'signin',
        ux_mode: 'popup',
        allowed_parent_origin: [
          'https://tourist-cgw9.vercel.app',
          'http://localhost:3000'
        ]
      });
      
      // Render the button
      const buttonElement = document.getElementById('googleSignIn');
      if (buttonElement) {
        window.google.accounts.id.renderButton(
          buttonElement,
          { 
            theme: 'outline', 
            size: 'large',
            text: 'signin_with',
            shape: 'pill',
            width: 250,
            logo_alignment: 'left'
          }
        );
      }
      
      // Optional: Prompt one-tap sign-in
      // window.google.accounts.id.prompt();
      
    } catch (error) {
      console.error('Google Sign-In initialization error:', error);
    }
  };

  // ============= GOOGLE RESPONSE HANDLER =============
  const handleGoogleResponse = async (response: any) => {
    try {
      console.log('✅ Google response received');
      
      if (!response.credential) {
        throw new Error('No credential received');
      }

      // Decode the JWT token
      const userData = decodeJwtResponse(response.credential);
      
      const user = {
        id: userData.sub,
        name: userData.name,
        email: userData.email,
        picture: userData.picture || '',
        phone: ''
      };
      
      // Login user
      login(user, response.credential);
      toast.success(`Welcome, ${user.name}!`);
      
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed. Please try email login.');
    }
  };

  // Helper function to decode JWT
  const decodeJwtResponse = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      throw error;
    }
  };

  // ============= EMAIL LOGIN FALLBACK =============
  const handleEmailLogin = () => {
    const email = prompt('Enter your email:');
    if (!email) return;
    
    const name = prompt('Enter your name:', 'Guest User');
    if (!name) return;
    
    const phone = prompt('Enter your phone number (optional):');
    
    const user = {
      id: 'email_' + Date.now(),
      name: name,
      email: email,
      picture: '',
      phone: phone || ''
    };
    
    login(user);
    toast.success(`Welcome, ${user.name}!`);
  };

  // ============= PROFILE EDIT =============
  const handleEditSubmit = () => {
    if (editData.name.trim() && user) {
      updateUser({
        name: editData.name,
        phone: editData.phone
      });
      toast.success('Profile updated!');
      setShowEditForm(false);
      setEditData({ name: '', phone: '' });
    }
  };

  // ============= LOGOUT =============
  const handleLogout = () => {
    // Clear Google session
    if (typeof window !== 'undefined' && window.google) {
      try {
        window.google.accounts.id.disableAutoSelect();
        window.google.accounts.id.revoke(user?.email || '', () => {
          console.log('Google session revoked');
        });
      } catch (error) {
        console.error('Error revoking Google session:', error);
      }
    }
    
    logout();
    setShowProfile(false);
  };

  // ============= RENDER PROFILE =============
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
            {user.name?.split(' ')[0] || 'User'}
          </span>
        </button>

        {showProfile && (
          <div className="absolute right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-2xl z-50">
            {/* Profile Header */}
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
              <div className="flex-1">
                <h4 className="font-bold text-white">{user.name}</h4>
                <p className="text-white/80 text-sm break-all">{user.email}</p>
                {user.phone && (
                  <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" /> {user.phone}
                  </p>
                )}
              </div>
            </div>
            
            {/* Edit Form */}
            {showEditForm ? (
              <div className="mb-4 space-y-3">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  placeholder="Your name"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-teal-500"
                />
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  placeholder="Phone number"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-teal-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEditSubmit}
                    className="flex-1 px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowEditForm(false)}
                    className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Action Buttons */
              <div className="space-y-1 mb-4">
                <button 
                  onClick={() => {
                    setShowProfile(false);
                    router.push('/my-bookings');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  My Bookings
                </button>
                <button 
                  onClick={() => {
                    setEditData({ name: user.name, phone: user.phone || '' });
                    setShowEditForm(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            )}
            
            {/* Logout Button */}
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

  // ============= RENDER LOGIN BUTTONS =============
  return (
    <div className="flex items-center gap-3">
      {/* Google Sign In Button Container */}
      <div 
        id="googleSignIn" 
        className="min-w-[250px] min-h-[40px] flex items-center justify-center"
      ></div>
      
      {/* OR Divider */}
      <span className="text-white/50 text-sm hidden sm:inline">or</span>
      
      {/* Email Login Fallback */}
      <button
        onClick={handleEmailLogin}
        className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all flex items-center gap-2 shadow-lg hover:shadow-teal-500/30"
      >
        <Mail className="w-4 h-4" />
        <span className="hidden sm:inline">Email Login</span>
        <span className="sm:hidden">Email</span>
      </button>
    </div>
  );
}