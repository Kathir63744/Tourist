"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, User, Mail, Phone, CheckCircle, Calculator } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';

// Define TypeScript interfaces
interface GuestInfo {
  adults: number;
  children: number;
  rooms: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

interface FormData {
  resortId: string;
  resortName: string;
  roomType: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: GuestInfo;
  customer: CustomerInfo;
  basePrice: number;
  totalAmount?: number;
}

interface PriceBreakdown {
  basePrice: number;
  extraAdultsCharge: number;
  nights: number;
  rooms: number;
  subtotal: number;
  gst: number;
  totalAmount: number;
}

interface BookingFormProps {
  resortId: string;
  resortName: string;
  roomType: string;
  basePrice: number;
  location: string;
  onSubmit: (bookingData: any) => Promise<void>;
  isLoading?: boolean;
}

export default function BookingForm({ 
  resortId, 
  resortName, 
  roomType, 
  basePrice,
  location,
  onSubmit,
  isLoading = false
}: BookingFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    resortId: resortId,
    resortName: resortName,
    roomType: roomType,
    location: location,
    checkIn: "",
    checkOut: "",
    guests: {
      adults: 2,
      children: 0,
      rooms: 1
    },
    customer: {
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: ""
    },
    basePrice: basePrice
  });

  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customer: {
          ...prev.customer,
          name: user.name || prev.customer.name,
          email: user.email || prev.customer.email
        }
      }));
    }
  }, [user]);

  // Calculate price
  useEffect(() => {
    if (!formData.checkIn || !formData.checkOut || basePrice <= 0) {
      setPriceBreakdown(null);
      return;
    }

    try {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const nights = Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (nights <= 0) return;

      // Base price for rooms
      const roomBasePrice = basePrice * formData.guests.rooms * nights;
      
      // Extra adults (beyond 2 per room)
      const maxAdultsPerRoom = 2;
      const adultsPerRoom = Math.ceil(formData.guests.adults / formData.guests.rooms);
      const extraAdultsPerRoom = Math.max(0, adultsPerRoom - maxAdultsPerRoom);
      const extraAdultsCharge = extraAdultsPerRoom > 0 ? 
        extraAdultsPerRoom * 800 * nights * formData.guests.rooms : 0;
      
      // Subtotal
      const subtotal = roomBasePrice + extraAdultsCharge;
      
      // GST (18%)
      const gst = subtotal * 0.18;
      
      const totalAmount = Math.round(subtotal + gst);

      const breakdown: PriceBreakdown = {
        basePrice: Math.round(roomBasePrice),
        extraAdultsCharge: Math.round(extraAdultsCharge),
        nights,
        rooms: formData.guests.rooms,
        subtotal: Math.round(subtotal),
        gst: Math.round(gst),
        totalAmount
      };

      setPriceBreakdown(breakdown);

      // Update total in form data
      setFormData(prev => ({ 
        ...prev, 
        totalAmount 
      }));
    } catch (error) {
      console.error('Price calculation error:', error);
      setPriceBreakdown(null);
    }
  }, [formData.checkIn, formData.checkOut, formData.guests, basePrice]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkInDate < today) newErrors.checkIn = "Check-in cannot be in the past";
      if (checkOutDate <= checkInDate) newErrors.checkOut = "Check-out must be after check-in";
    }
    
    if (!formData.customer.name.trim()) newErrors.name = "Name is required";
    if (!formData.customer.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.customer.email)) newErrors.email = "Email is invalid";
    
    if (!formData.customer.phone.trim()) newErrors.phone = "Phone is required";
    
    if (formData.guests.adults < 1) newErrors.adults = "At least 1 adult is required";
    if (formData.guests.adults > (formData.guests.rooms * 5)) {
      newErrors.adults = `Maximum ${formData.guests.rooms * 5} adults for ${formData.guests.rooms} room(s)`;
    }
    if (formData.guests.rooms > 3) newErrors.rooms = "Maximum 3 rooms per booking";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (!priceBreakdown) {
      toast.error("Please select valid dates");
      return;
    }

    // Prepare booking data
    const bookingData = {
      ...formData,
      totalAmount: priceBreakdown.totalAmount,
      priceBreakdown
    };

    await onSubmit(bookingData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        
        if (parent === 'guests') {
          return {
            ...prev,
            guests: {
              ...prev.guests,
              [child]: typeof value === 'string' ? parseInt(value) || 0 : value
            }
          };
        }
        
        if (parent === 'customer') {
          return {
            ...prev,
            customer: {
              ...prev.customer,
              [child]: value
            }
          };
        }
      }
      
      // Handle direct formData fields
      return { 
        ...prev, 
        [field]: value 
      };
    });

    // Add userId to booking data
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) {
    toast.error("Please fix the errors in the form");
    return;
  }

  if (!priceBreakdown) {
    toast.error("Please select valid dates");
    return;
  }

  // Prepare booking data with userId
  const bookingData = {
    ...formData,
    userId: user?.id, // Add user ID
    totalAmount: priceBreakdown.totalAmount,
    priceBreakdown
  };

  await onSubmit(bookingData);
};

    // Clear error for this field
    const fieldName = field.includes('.') ? field.split('.')[1] : field;
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Room Info */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{roomType}</h3>
            <p className="text-white/80 text-sm">{resortName} • {location}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-teal-300">₹{basePrice}</div>
            <div className="text-white/60 text-sm">per night per room</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-400" />
            <span className="text-white/80">Base: 2 adults/room</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-400" />
            <span className="text-white/80">Max: 5 adults/room</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-400" />
            <span className="text-white/80">Extra adult: ₹800/night</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-400" />
            <span className="text-white/80">Children: Free</span>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Check-in Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white ${errors.checkIn ? 'border-red-500' : ''}`}
              value={formData.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
            />
            {errors.checkIn && <p className="mt-1 text-sm text-red-400">{errors.checkIn}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Check-out Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
            <input
              type="date"
              required
              min={formData.checkIn || new Date().toISOString().split('T')[0]}
              className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white ${errors.checkOut ? 'border-red-500' : ''}`}
              value={formData.checkOut}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
            />
            {errors.checkOut && <p className="mt-1 text-sm text-red-400">{errors.checkOut}</p>}
          </div>
        </div>
      </div>

      {/* Guests & Rooms */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Rooms *
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
            <select
              className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white ${errors.rooms ? 'border-red-500' : ''}`}
              value={formData.guests.rooms}
              onChange={(e) => handleInputChange('guests.rooms', e.target.value)}
            >
              {[1, 2, 3].map(num => (
                <option key={num} value={num} className="bg-gray-800">
                  {num} Room{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            {errors.rooms && <p className="mt-1 text-sm text-red-400">{errors.rooms}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Adults *
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
            <select
              className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white ${errors.adults ? 'border-red-500' : ''}`}
              value={formData.guests.adults}
              onChange={(e) => handleInputChange('guests.adults', e.target.value)}
            >
              {Array.from({ length: formData.guests.rooms * 5 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num} className="bg-gray-800">
                  {num} Adult{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            {errors.adults && <p className="mt-1 text-sm text-red-400">{errors.adults}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Children
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
            <select
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
              value={formData.guests.children}
              onChange={(e) => handleInputChange('guests.children', e.target.value)}
            >
              {Array.from({ length: 11 }, (_, i) => i).map(num => (
                <option key={num} value={num} className="bg-gray-800">
                  {num} Child{num !== 1 ? 'ren' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      {priceBreakdown && formData.checkIn && formData.checkOut && (
        <div className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-xl p-6 border border-teal-500/30">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-teal-300" />
            <h4 className="font-bold text-white">Price Breakdown</h4>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80">
                Room Price ({priceBreakdown.nights} nights × {priceBreakdown.rooms} room{priceBreakdown.rooms > 1 ? 's' : ''} × ₹{basePrice}):
              </span>
              <span className="text-white">₹{priceBreakdown.basePrice.toLocaleString()}</span>
            </div>
            
            {priceBreakdown.extraAdultsCharge > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-white/80">
                  Extra Adults (₹800 × {Math.max(0, Math.ceil(formData.guests.adults / formData.guests.rooms) - 2)} × {priceBreakdown.nights} × {priceBreakdown.rooms}):
                </span>
                <span className="text-amber-300">₹{priceBreakdown.extraAdultsCharge.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-2 border-t border-teal-500/30">
              <span className="text-white/80">Subtotal:</span>
              <span className="text-white">₹{priceBreakdown.subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">GST (18%):</span>
              <span className="text-rose-300">₹{priceBreakdown.gst.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-teal-500/30">
              <span className="text-lg font-bold text-white">Total Amount:</span>
              <span className="text-2xl font-bold text-teal-300">₹{priceBreakdown.totalAmount.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="text-sm text-teal-200/80 bg-teal-500/10 p-3 rounded-lg">
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Pay directly at resort after confirmation
            </p>
            <p className="mt-1">Free cancellation up to 48 hours before check-in</p>
          </div>
        </div>
      )}

      {/* Contact Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white">Contact Information</h4>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
            <input
              type="text"
              required
              className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your full name"
              value={formData.customer.name}
              onChange={(e) => handleInputChange('customer.name', e.target.value)}
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
              <input
                type="email"
                required
                className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white ${errors.email ? 'border-red-500' : ''}`}
                placeholder="you@example.com"
                value={formData.customer.email}
                onChange={(e) => handleInputChange('customer.email', e.target.value)}
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
              <input
                type="tel"
                required
                className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="+91 98765 43210"
                value={formData.customer.phone}
                onChange={(e) => handleInputChange('customer.phone', e.target.value)}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Special Requests
          </label>
          <textarea
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400"
            rows={3}
            placeholder="Any special requests, dietary requirements, or additional information..."
            value={formData.customer.notes}
            onChange={(e) => handleInputChange('customer.notes', e.target.value)}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !formData.checkIn || !formData.checkOut}
        className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Submit Booking Request
          </>
        )}
      </button>
    </form>
  );
}