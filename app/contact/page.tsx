"use client";

import TouristNavbar from "../components/Navbar";
import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  Home,
  Mountain,
  Map,
  Navigation,
  MessageCircle,
  Clock,
  Shield,
  Users,
  CheckCircle
} from "lucide-react";

export default function ContactPage() {
  const phoneNumber = "+919876543210";
  const whatsappNumber = "+919876543210";
  const email = "support@hillescape.com";

  const locationMaps = [
    {
      id: 1,
      name: "Valparai-Solaiyur",
      address: "Valparai Hills, Tamil Nadu 642127",
      coordinates: "10.3266° N, 76.9510° E",
      mapLink: "https://maps.app.goo.gl/Mx8bbPRbTePoL6Nx5",
      icon: <Home className="w-6 h-6" />,
      description: "Nestled in the Anamalai Hills, perfect for nature lovers and adventure seekers",
      features: ["Mountain View", "Waterfalls", "Wildlife", "Trekking"],
      color: "emerald"
    },
    {
      id: 2,
      name: "Kothagiri",
      address: "Kothagiri, Nilgiris, Tamil Nadu 643217",
      coordinates: "11.4161° N, 76.8186° E",
      mapLink: "https://maps.app.goo.gl/BN3BYVFeUzTuoyb66",
      icon: <Mountain className="w-6 h-6" />,
      description: "Beautiful hill station in the Nilgiris known for tea plantations and misty weather",
      features: ["Tea Gardens", "Campfire", "Barbecue", "Scenic Views"],
      color: "orange"
    }
  ];

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const message = "Hello, I'm interested in booking a hill station resort. Can you help me?";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen font-sans antialiased relative overflow-hidden">
      {/* Background Image with Light Overlay */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=2000')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/30 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/10 via-transparent to-emerald-900/10" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(15, 23, 42, 0.3) 100%)'
        }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <TouristNavbar initialTransparent={false} />
        
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)'
            }} />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full text-center">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl shadow-2xl">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
                  Contact <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">Us</span>
                </h1>
              </div>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-lg">
                Quick and easy ways to reach us for your hill station getaway
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Quick Contact Buttons */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {/* Call Button */}
              <button
                onClick={handleCall}
                className="group bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-8 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 text-center"
              >
                <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl w-fit mx-auto mb-6">
                  <Phone className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Call Now</h3>
                <p className="text-lg font-semibold text-emerald-400 mb-3">{phoneNumber}</p>
                <p className="text-white/70 text-sm">Tap to dial instantly</p>
                <div className="mt-4 text-xs text-white/50">Available 24/7</div>
              </button>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                className="group bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-8 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 text-center"
              >
                <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl w-fit mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-green-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-lg font-semibold text-green-400 mb-3">Chat with us</p>
                <p className="text-white/70 text-sm">Instant messaging support</p>
                <div className="mt-4 text-xs text-white/50">Quick replies guaranteed</div>
              </button>

              {/* Email Button */}
              <button
                onClick={handleEmail}
                className="group bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-8 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 text-center"
              >
                <div className="p-4 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl w-fit mx-auto mb-6">
                  <Mail className="w-10 h-10 text-teal-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Email</h3>
                <p className="text-lg font-semibold text-teal-400 mb-3 truncate">{email}</p>
                <p className="text-white/70 text-sm">Send us your queries</p>
                <div className="mt-4 text-xs text-white/50">Response within 2 hours</div>
              </button>
            </div>

            {/* Dual Location Maps Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl">
                    <Map className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white">
                    Our <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">Locations</span>
                  </h2>
                </div>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Find our beautiful hill station resorts across two stunning locations
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {locationMaps.map((location) => (
                  <div 
                    key={location.id} 
                    className="group relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/30 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500"
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 rounded-xl ${location.color === 'emerald' ? 'bg-emerald-500/20' : 'bg-orange-500/20'}`}>
                          <div className={location.color === 'emerald' ? 'text-emerald-400' : 'text-orange-400'}>
                            {location.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{location.name}</h3>
                          <p className="text-white/70">{location.description}</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
                          <MapPin className={`w-5 h-5 mt-1 ${location.color === 'emerald' ? 'text-emerald-400' : 'text-orange-400'}`} />
                          <div>
                            <p className="font-medium text-white">Address</p>
                            <p className="text-white/70">{location.address}</p>
                            <p className="text-white/60 text-sm mt-1">Coordinates: {location.coordinates}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {location.features.map((feature, index) => (
                            <span 
                              key={index} 
                              className={`px-3 py-1 ${location.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-orange-500/20 text-orange-300'} rounded-full text-sm border ${location.color === 'emerald' ? 'border-emerald-500/30' : 'border-orange-500/30'}`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Embedded Google Maps */}
                      <div className="h-64 rounded-xl overflow-hidden mb-6 border border-white/20">
                        <iframe
                          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.address)}`}
                          className="w-full h-full border-0"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Map of ${location.name}`}
                        />
                      </div>

                      <a
                        href={location.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3 ${location.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'} text-white font-bold rounded-lg transition-all flex items-center justify-center gap-3`}
                      >
                        <Navigation className="w-5 h-5" />
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple Contact Info */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/30 p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8">
                    Quick <span className="text-teal-400">Contact</span>
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-teal-500/20 rounded-lg">
                        <Phone className="w-6 h-6 text-teal-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">Phone Numbers</h4>
                        <p className="text-white/70">General: +91 98765 43210</p>
                        <p className="text-white/70">Emergency: +91 98765 43211</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-teal-500/20 rounded-lg">
                        <Mail className="w-6 h-6 text-teal-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">Email Address</h4>
                        <p className="text-white/70">support@hillescape.com</p>
                        <p className="text-white/70">bookings@hillescape.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-teal-500/20 rounded-lg">
                        <Clock className="w-6 h-6 text-teal-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">Working Hours</h4>
                        <p className="text-white/70">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                        <p className="text-white/70">Sunday: 10:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="h-64 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-2xl border border-white/20 flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="p-4 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-full inline-flex mb-4">
                        <Users className="w-8 h-8 text-teal-400" />
                      </div>
                      <p className="text-white font-medium">Why Choose Us</p>
                      <div className="space-y-2 mt-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-400" />
                          <span className="text-white/70 text-sm">Instant Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-400" />
                          <span className="text-white/70 text-sm">Best Price Guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-400" />
                          <span className="text-white/70 text-sm">Easy Booking Process</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleCall}
                      className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white rounded-xl border border-white/10 hover:from-emerald-500/30 hover:to-teal-500/30 transition-colors"
                    >
                      <Phone className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm">Call Now</span>
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white rounded-xl border border-white/10 hover:from-green-500/30 hover:to-emerald-500/30 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background: rgba(45, 212, 191, 0.3);
          color: white;
        }
        
        *:focus {
          outline: 2px solid rgba(45, 212, 191, 0.5);
          outline-offset: 2px;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(45, 212, 191, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(45, 212, 191, 0.7);
        }
        
        @media (max-width: 640px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
}