// app/signin/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mountain, ArrowLeft, Shield } from 'lucide-react';
import TouristNavbar from '../components/Navbar';

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      // For demo - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real implementation, implement Google OAuth here
      console.log('Google sign in initiated');
      
      // Redirect after successful login
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: '🎯',
      title: 'Exclusive Deals',
      description: 'Get special discounts and offers'
    },
    {
      icon: '💎',
      title: 'Priority Booking',
      description: 'Early access to new resorts'
    },
    {
      icon: '🎁',
      title: 'Reward Points',
      description: 'Earn points on every booking'
    },
    {
      icon: '🛡️',
      title: 'Secure Payments',
      description: '100% secure transaction'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <TouristNavbar initialTransparent={false} />
      
      <div className="container mx-auto px-4 py-16">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Benefits */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl">
                    <Mountain className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-white">
                    Welcome to <span className="text-teal-300">HillEscape</span>
                  </h1>
                </div>
                
                <p className="text-white/90 text-lg mb-8">
                  Join thousands of travelers experiencing luxury hill station resorts.
                  Sign in with Google to manage your bookings.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Member Benefits</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-teal-500/30 transition-colors">
                      <div className="text-3xl mb-2">{benefit.icon}</div>
                      <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                      <p className="text-white/80 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl border border-teal-500/20">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-300">24+</div>
                    <div className="text-white/80 text-sm">Premium Resorts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-300">98%</div>
                    <div className="text-white/80 text-sm">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-300">10K+</div>
                    <div className="text-white/80 text-sm">Happy Guests</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Google Login */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/30 p-8 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Sign In with Google
                </h2>
                <p className="text-white/80">
                  Quick and secure sign in using your Google account
                </p>
              </div>

              <div className="space-y-6">
                {/* Google Login Button */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-lg">
                    {isLoading ? 'Signing in...' : 'Continue with Google'}
                  </span>
                </button>

                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-white/20"></div>
                  <span className="text-white/50 text-sm">Why Google?</span>
                  <div className="flex-1 h-px bg-white/20"></div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                    <div className="text-teal-400">✓</div>
                    <div>
                      <h4 className="font-semibold text-white">One-click login</h4>
                      <p className="text-white/70 text-sm">No passwords to remember</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                    <div className="text-teal-400">✓</div>
                    <div>
                      <h4 className="font-semibold text-white">Enhanced security</h4>
                      <p className="text-white/70 text-sm">Google's security protects your account</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                    <div className="text-teal-400">✓</div>
                    <div>
                      <h4 className="font-semibold text-white">Instant account</h4>
                      <p className="text-white/70 text-sm">No sign-up forms to fill</p>
                    </div>
                  </div>
                </div>

                {/* Terms & Security */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                    <Shield className="w-4 h-4" />
                    <span>Your data is secure and encrypted</span>
                  </div>
                  <p className="text-center text-sm text-white/60 mt-4">
                    By continuing, you agree to our terms and acknowledge our privacy policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}