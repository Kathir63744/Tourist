"use client";
import { useState } from "react";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiInstagram, 
  FiFacebook, 
  FiTwitter, 
  FiYoutube,
  FiChevronUp 
} from "react-icons/fi";

export default function TouristFooter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
    // Add your newsletter logic here
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/resorts" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const popularDestinations = [
    "Bali, Indonesia",
    "Santorini, Greece",
    "Kyoto, Japan",
    "Swiss Alps",
    "New Zealand",
  ];

  const quickLinks = [
    "Privacy Policy",
    "Terms of Service",
    "FAQ",
    "Travel Guides",
    "Customer Support",
  ];

  const socialLinks = [
    { icon: <FiInstagram />, label: "Instagram", href: "#" },
    { icon: <FiFacebook />, label: "Facebook", href: "#" },
    { icon: <FiTwitter />, label: "Twitter", href: "#" },
    { icon: <FiYoutube />, label: "YouTube", href: "#" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Decorative Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400" />
      
      <div className="max-w-7xl mx-auto px-5 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-300 flex items-center justify-center text-lg font-bold text-black">
                TE
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-widest">TOURIST EXPLORER</h3>
                <p className="text-xs text-gray-400 tracking-widest mt-1">WANDER WITH PURPOSE</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Your gateway to unforgettable adventures. We craft extraordinary travel experiences that connect you with the world's most beautiful destinations.
            </p>
            
            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold tracking-widest mb-3 text-teal-300">JOIN OUR NEWSLETTER</h4>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 px-4 py-1.5 bg-gradient-to-r from-teal-400 to-emerald-400 text-black text-xs font-bold tracking-widest rounded-md hover:opacity-90 transition"
                  >
                    SUBSCRIBE
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Stay updated with our latest travel offers and tips.
                </p>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest mb-6 text-teal-300 uppercase">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-teal-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-teal-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                    <span className="ml-auto text-xs text-gray-600 group-hover:text-teal-400">→</span>
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-10">
              <h4 className="text-sm font-semibold tracking-widest mb-6 text-teal-300 uppercase">Quick Links</h4>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="px-3 py-1.5 text-xs bg-gray-800/50 rounded-full text-gray-400 hover:bg-teal-400/20 hover:text-teal-300 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest mb-6 text-teal-300 uppercase">Popular Destinations</h4>
            <ul className="space-y-4">
              {popularDestinations.map((destination, index) => (
                <li key={index} className="flex items-center group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400/20 to-emerald-400/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <span className="text-teal-400 text-xs">✦</span>
                  </div>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex-1"
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Social Media */}
            <div className="mt-10">
              <h4 className="text-sm font-semibold tracking-widest mb-6 text-teal-300 uppercase">Connect With Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-teal-400/20 hover:to-emerald-400/20 hover:text-teal-300 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest mb-6 text-teal-300 uppercase">Contact Us</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400/20 to-emerald-400/20 flex items-center justify-center">
                  <FiMapPin className="text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Visit Our Office</p>
                  <p className="text-xs text-gray-400 mt-1">
                    123 Adventure Street<br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400/20 to-emerald-400/20 flex items-center justify-center">
                  <FiPhone className="text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <p className="text-xs text-gray-400 mt-1">
                    +1 (555) 123-4567<br />
                    Mon-Fri: 9AM-6PM PST
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400/20 to-emerald-400/20 flex items-center justify-center">
                  <FiMail className="text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email Us</p>
                  <p className="text-xs text-gray-400 mt-1">
                    hello@touristexplorer.com<br />
                    support@touristexplorer.com
                  </p>
                </div>
              </div>
            </div>

            {/* Download App CTA */}
            <div className="mt-10 p-4 rounded-xl bg-gradient-to-r from-teal-400/10 to-emerald-400/10 border border-teal-400/20">
              <p className="text-sm font-medium mb-2">Download Our App</p>
              <p className="text-xs text-gray-400 mb-4">Plan your trips on the go</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-black/50 rounded-lg text-xs font-medium hover:bg-teal-400 hover:text-black transition">
                  App Store
                </button>
                <button className="flex-1 py-2 bg-black/50 rounded-lg text-xs font-medium hover:bg-teal-400 hover:text-black transition">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} Tourist Explorer. All rights reserved. 
              <span className="mx-2">•</span>
              Designed with ♥ for travelers worldwide.
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">We accept:</span>
              <div className="flex gap-2">
                {["Visa", "Mastercard", "PayPal", "Amex"].map((method, index) => (
                  <div key={index} className="px-3 py-1 bg-gray-800/50 rounded-md text-xs text-gray-400">
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 text-black flex items-center justify-center hover:scale-105 transition-transform"
            >
              <FiChevronUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}