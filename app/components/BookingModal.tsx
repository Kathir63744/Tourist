"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { 
  X, 
  Calendar, 
  Users, 
  MapPin,
  CheckCircle,
  Shield,
  Loader2,
  Bed,
  DollarSign,
  Clock,
  Calculator,
  User,
  Mail,
  Phone
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  resortId: string;
  roomType: string;
  basePrice: number;
  resortName?: string;
  location?: string;
  onSubmit: (bookingData: any) => Promise<void>;
  isLoading?: boolean; // Add this line
}

interface PriceBreakdown {
  basePrice: number;
  extraAdultsCharge: number;
  extraChildrenCharge: number;
  nights: number;
  rooms: number;
  subtotal: number;
  gst: number;
  totalAmount: number;
}

export default function BookingModal({ 
  isOpen, 
  onClose, 
  resortId, 
  roomType, 
  basePrice,
  resortName,
  location,
  onSubmit
}: BookingModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    resortId: resortId,
    roomType: roomType,
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
    totalAmount: 0
  });

  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingReference, setBookingReference] = useState("");

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
  }, [user, isOpen]);

  // Calculate price whenever dates, guests, or rooms change
  useEffect(() => {
    if (!formData.checkIn || !formData.checkOut || basePrice <= 0) {
      setPriceBreakdown(null);
      return;
    }

    const calculatePrice = () => {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const nights = Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (nights <= 0) {
        setPriceBreakdown(null);
        return;
      }

      // Room capacity: Standard is 2 adults per room
      const maxAdultsPerRoom = 2;
      const maxChildrenPerRoom = 2; // Standard capacity
      
      // Base price for rooms (room rate × rooms × nights)
      const roomBasePrice = basePrice * formData.guests.rooms * nights;
      
      // Calculate if we need extra rooms for adults
      const adultsPerRoom = Math.ceil(formData.guests.adults / formData.guests.rooms);
      const extraAdultsPerRoom = Math.max(0, adultsPerRoom - maxAdultsPerRoom);
      const extraAdultsCharge = extraAdultsPerRoom > 0 ? 
        extraAdultsPerRoom * 800 * nights * formData.guests.rooms : 0; // ₹800 per extra adult per night
      
      // Calculate extra children charge
      const childrenPerRoom = Math.ceil(formData.guests.children / formData.guests.rooms);
      const extraChildrenPerRoom = Math.max(0, childrenPerRoom - maxChildrenPerRoom);
      const extraChildrenCharge = extraChildrenPerRoom > 0 ? 
        extraChildrenPerRoom * 500 * nights * formData.guests.rooms : 0; // ₹500 per extra child per night
      
      // Subtotal
      const subtotal = roomBasePrice + extraAdultsCharge + extraChildrenCharge;
      
      // GST (18%)
      const gst = subtotal * 0.18;
      
      const totalAmount = Math.round(subtotal + gst);

      const breakdown: PriceBreakdown = {
        basePrice: Math.round(roomBasePrice),
        extraAdultsCharge: Math.round(extraAdultsCharge),
        extraChildrenCharge: Math.round(extraChildrenCharge),
        nights,
        rooms: formData.guests.rooms,
        subtotal: Math.round(subtotal),
        gst: Math.round(gst),
        totalAmount
      };

      setPriceBreakdown(breakdown);
      setFormData(prev => ({ ...prev, totalAmount }));
    };

    calculatePrice();
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
      
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      if (nights > 30) newErrors.checkOut = "Maximum stay is 30 nights";
    }
    
    if (!formData.customer.name.trim()) newErrors.name = "Name is required";
    if (!formData.customer.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.customer.email)) newErrors.email = "Email is invalid";
    
    if (!formData.customer.phone.trim()) newErrors.phone = "Phone is required";
    
    if (formData.guests.adults < 1) newErrors.adults = "At least 1 adult is required";
    if (formData.guests.adults > (formData.guests.rooms * 4)) newErrors.adults = `Maximum ${formData.guests.rooms * 4} adults for ${formData.guests.rooms} room(s)`;
    if (formData.guests.children > (formData.guests.rooms * 3)) newErrors.children = `Maximum ${formData.guests.rooms * 3} children for ${formData.guests.rooms} room(s)`;
    if (formData.guests.rooms < 1) newErrors.rooms = "At least 1 room is required";
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

    setIsLoading(true);
    try {
      const bookingData = {
        ...formData,
        priceBreakdown,
        bookingReference: `HILL${Date.now().toString().slice(-8)}${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      };

      await onSubmit(bookingData);
      setIsSuccess(true);
      setBookingReference(bookingData.bookingReference);
      
      // Reset form after success (optional)
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          resortId: resortId,
          roomType: roomType,
          checkIn: "",
          checkOut: "",
          guests: {
            adults: 2,
            children: 0,
            rooms: 1
          },
          customer: {
            name: user?.name || "",
            email: user?.email || "",
            phone: "",
            address: "",
            notes: ""
          },
          totalAmount: 0
        });
        setPriceBreakdown(null);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to submit booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (parent === 'customer' || parent === 'guests') {
          (newData[parent as keyof typeof newData] as any)[child] = value;
        }
      } else {
        (newData as any)[field] = value;
      }
      
      return newData;
    });

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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 p-6 shadow-xl transition-all border border-teal-500/30">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-white">
                      Book Your Stay
                    </Dialog.Title>
                    <p className="text-teal-300">
                      {resortName} • {location}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-6">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Booking Confirmed! 🎉
                    </h3>
                    <p className="text-gray-300 mb-2">
                      Confirmation email has been sent.
                    </p>
                    <p className="text-gray-300">
                      Booking Reference: <span className="font-bold text-teal-300">{bookingReference}</span>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Resort Info */}
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-white">{roomType}</h4>
                          <p className="text-white/80 text-sm">{resortName}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-teal-300">₹{basePrice}</div>
                          <div className="text-white/60 text-sm">per room per night</div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-white/80 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>Standard: 2 adults/room</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>Max 3 rooms/booking</span>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Check-in *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 ${
                              errors.checkIn ? 'border-red-500' : ''
                            }`}
                            value={formData.checkIn}
                            onChange={(e) => handleInputChange('checkIn', e.target.value)}
                          />
                          {errors.checkIn && (
                            <p className="mt-1 text-sm text-red-400">{errors.checkIn}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Check-out *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                          <input
                            type="date"
                            required
                            min={formData.checkIn || new Date().toISOString().split('T')[0]}
                            className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 ${
                              errors.checkOut ? 'border-red-500' : ''
                            }`}
                            value={formData.checkOut}
                            onChange={(e) => handleInputChange('checkOut', e.target.value)}
                          />
                          {errors.checkOut && (
                            <p className="mt-1 text-sm text-red-400">{errors.checkOut}</p>
                          )}
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
                          <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                          <select
                            className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white ${
                              errors.rooms ? 'border-red-500' : ''
                            }`}
                            value={formData.guests.rooms}
                            onChange={(e) => handleInputChange('guests.rooms', parseInt(e.target.value))}
                          >
                            {[1, 2, 3].map(num => (
                              <option key={num} value={num} className="bg-gray-800">
                                {num} Room{num > 1 ? 's' : ''}
                              </option>
                            ))}
                          </select>
                          {errors.rooms && (
                            <p className="mt-1 text-sm text-red-400">{errors.rooms}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Adults *
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                          <select
                            className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white ${
                              errors.adults ? 'border-red-500' : ''
                            }`}
                            value={formData.guests.adults}
                            onChange={(e) => handleInputChange('guests.adults', parseInt(e.target.value))}
                          >
                            {Array.from({ length: formData.guests.rooms * 4 }, (_, i) => i + 1).map(num => (
                              <option key={num} value={num} className="bg-gray-800">
                                {num} Adult{num > 1 ? 's' : ''}
                              </option>
                            ))}
                          </select>
                          {errors.adults && (
                            <p className="mt-1 text-sm text-red-400">{errors.adults}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Children
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                          <select
                            className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white ${
                              errors.children ? 'border-red-500' : ''
                            }`}
                            value={formData.guests.children}
                            onChange={(e) => handleInputChange('guests.children', parseInt(e.target.value))}
                          >
                            {Array.from({ length: (formData.guests.rooms * 3) + 1 }, (_, i) => i).map(num => (
                              <option key={num} value={num} className="bg-gray-800">
                                {num} Child{num !== 1 ? 'ren' : ''}
                              </option>
                            ))}
                          </select>
                          {errors.children && (
                            <p className="mt-1 text-sm text-red-400">{errors.children}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price Summary */}
                    {priceBreakdown && formData.checkIn && formData.checkOut && (
                      <div className="p-4 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-xl border border-teal-500/30">
                        <div className="flex items-center gap-2 mb-4">
                          <Calculator className="w-5 h-5 text-teal-300" />
                          <h4 className="font-bold text-white">Price Breakdown</h4>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white/80">
                              Room Price ({priceBreakdown.nights} nights × {priceBreakdown.rooms} room{priceBreakdown.rooms > 1 ? 's' : ''} × ₹{basePrice}):
                            </span>
                            <span className="text-white">₹{priceBreakdown.basePrice}</span>
                          </div>
                          
                          {priceBreakdown.extraAdultsCharge > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-white/80">
                                Extra Adults (₹800 × {Math.max(0, Math.ceil(formData.guests.adults / formData.guests.rooms) - 2)} × {priceBreakdown.nights} × {priceBreakdown.rooms}):
                              </span>
                              <span className="text-amber-300">₹{priceBreakdown.extraAdultsCharge}</span>
                            </div>
                          )}
                          
                          {priceBreakdown.extraChildrenCharge > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-white/80">
                                Extra Children (₹500 × {Math.max(0, Math.ceil(formData.guests.children / formData.guests.rooms) - 2)} × {priceBreakdown.nights} × {priceBreakdown.rooms}):
                              </span>
                              <span className="text-amber-300">₹{priceBreakdown.extraChildrenCharge}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center pt-2 border-t border-teal-500/30">
                            <span className="text-white/80">Subtotal:</span>
                            <span className="text-white">₹{priceBreakdown.subtotal}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-white/80">GST (18%):</span>
                            <span className="text-rose-300">₹{priceBreakdown.gst}</span>
                          </div>
                          
                          <div className="flex justify-between items-center pt-2 border-t border-teal-500/30">
                            <span className="text-lg font-bold text-white">Total Amount:</span>
                            <span className="text-2xl font-bold text-teal-300">₹{priceBreakdown.totalAmount}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-teal-200/80">
                          <p className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Pay directly at resort after confirmation
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Contact Details */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Contact Information</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your full name"
                          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 ${
                            errors.name ? 'border-red-500' : ''
                          }`}
                          value={formData.customer.name}
                          onChange={(e) => handleInputChange('customer.name', e.target.value)}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 ${
                              errors.email ? 'border-red-500' : ''
                            }`}
                            value={formData.customer.email}
                            onChange={(e) => handleInputChange('customer.email', e.target.value)}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 ${
                              errors.phone ? 'border-red-500' : ''
                            }`}
                            value={formData.customer.phone}
                            onChange={(e) => handleInputChange('customer.phone', e.target.value)}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400"
                          rows={2}
                          placeholder="Any special requirements or notes..."
                          value={formData.customer.notes}
                          onChange={(e) => handleInputChange('customer.notes', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Terms & Submit */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                        <Shield className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white mb-1">Secure Booking</h4>
                          <p className="text-sm text-gray-300">
                            • No advance payment required<br/>
                            • Pay directly at the resort<br/>
                            • Free cancellation up to 48 hours before check-in<br/>
                            • 24/7 customer support
                          </p>
                        </div>
                      </div>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          required 
                          className="mt-1 text-teal-600 bg-white/10 border-2 border-teal-100/30 rounded" 
                        />
                        <span className="text-sm text-white">
                          I agree to the <a href="/terms" className="text-teal-300 hover:underline">Terms & Conditions</a>
                        </span>
                      </label>
                      
                      <button
                        type="submit"
                        disabled={isLoading || !formData.checkIn || !formData.checkOut}
                        className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Confirm Booking Request
                          </>
                        )}
                      </button>
                      
                      {priceBreakdown && (
                        <div className="text-center">
                          <p className="text-sm text-gray-300">
                            <Clock className="w-4 h-4 inline mr-1 text-teal-400" />
                            Our team will contact you within <span className="font-bold text-white">2 hours</span> to confirm
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}