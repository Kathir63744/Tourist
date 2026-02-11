"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar, Mail, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
  clientId?: string;
}

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

  // Initialize Google Sign-In
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoggedIn) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            context: 'signin'
          });
          
          // Render button
          window.google.accounts.id.renderButton(
            document.getElementById('googleSignIn'),
            { 
              theme: 'outline', 
              size: 'large',
              text: 'signin_with',
              shape: 'pill'
            }
          );
        }
      };
    }
  }, [isLoggedIn]);

 const handleGoogleResponse = async (response: GoogleCredentialResponse) => {
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${response.credential}` }
    });
    
    const userData = await res.json();
    
    const user = {
      id: userData.sub,
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
    };
    
    login(user, response.credential);
    toast.success(`Welcome, ${user.name}!`);
    
  } catch (error) {
    console.error('Google login error:', error);
    toast.error('Google login failed. Please try email login.');
    handleEmailLogin();
  }
};

  const handleEmailLogin = () => {
    const name = prompt('Enter your name:', 'Guest User');
    if (!name) return;
    
    const email = prompt('Enter your email:');
    if (!email) return;
    
    const phone = prompt('Enter your phone (optional):');
    
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
          <div className="absolute right-0 mt-2 w-72 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-4 shadow-2xl z-50">
            {/* Profile Info */}
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
                <p className="text-white/80 text-sm">{user.email}</p>
                {user.phone && (
                  <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" /> {user.phone}
                  </p>
                )}
              </div>
            </div>
            
            {showEditForm ? (
              // Edit Form
              <div className="mb-4 space-y-3">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  placeholder="Your name"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                />
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  placeholder="Phone number"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEditSubmit}
                    className="flex-1 px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowEditForm(false)}
                    className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Action Buttons
              <div className="space-y-1 mb-4">
                <button 
                  onClick={() => router.push('/my-bookings')}
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
            
            {/* Logout */}
            <div className="pt-4 border-t border-white/20">
              <button 
                onClick={logout}
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
      {/* Google Sign In Button */}
      <div id="googleSignIn" className="min-w-[200px]"></div>
      
      {/* OR divider */}
      <span className="text-white/50 text-sm">or</span>
      
    </div>
  );
}