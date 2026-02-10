// app/components/EnhancedBookingForm.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, 
  Users, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calculator,
  CheckCircle,
  Shield
} from "lucide-react";
import { roomTypes, RoomType } from "../data/rooms";
import dynamic from 'next/dynamic';

// Dynamically load map to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 animate-pulse rounded-lg"></div>
});

interface EnhancedBookingFormProps {
  roomId: string;
  onSubmit: (bookingData: BookingData) => Promise<void>;
  initialData?: Partial<BookingData>;
}

interface BookingData {
  roomId: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  extraBeds: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
  };
  totalAmount: number;
  breakdown: {
    basePrice: number;
    extraAdults: number;
    extraBedsCost: number;
    nights: number;
    rooms: number;
    taxes: number;
  };
}

export default function EnhancedBookingForm({ 
  roomId, 
  onSubmit,
  initialData 
}: EnhancedBookingFormProps) {
  const [room, setRoom] = useState<RoomType | null>(null);
  const [formData, setFormData] = useState<BookingData>({
    roomId,
    roomType: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    adults: 2,
    children: 0,
    extraBeds: 0,
    customer: {
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: ""
    },
    totalAmount: 0,
    breakdown: {
      basePrice: 0,
      extraAdults: 0,
      extraBedsCost: 0,
      nights: 0,
      rooms: 1,
      taxes: 0
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load room details
  useEffect(() => {
    const selectedRoom = roomTypes.find(r => r.id === roomId);
    if (selectedRoom) {
      setRoom(selectedRoom);
      setFormData(prev => ({
        ...prev,
        roomType: selectedRoom.name,
        adults: Math.min(2, selectedRoom.maxAdults)
      }));
    }
  }, [roomId]);

  // Calculate total price
  useEffect(() => {
    if (!room) return;

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    
    if (!formData.checkIn || !formData.checkOut || checkOutDate <= checkInDate) {
      return;
    }

    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
    );
    
    // Calculate costs
    const baseCost = room.basePrice * nights * formData.rooms;
    
    // Extra adults (beyond 2 per room)
    const adultsPerRoom = Math.ceil(formData.adults / formData.rooms);
    const extraAdultsPerRoom = Math.max(0, adultsPerRoom - 2);
    const extraAdultsCost = extraAdultsPerRoom * room.extraAdultCharge * nights * formData.rooms;
    
    // Extra beds for children
    const extraBedsCost = formData.extraBeds * 500 * nights; // ₹500 per extra bed per night
    
    // Subtotal
    const subtotal = baseCost + extraAdultsCost + extraBedsCost;
    
    // Taxes (18% GST)
    const taxes = subtotal * 0.18;
    
    const total = subtotal + taxes;

    setFormData(prev => ({
      ...prev,
      totalAmount: Math.round(total),
      breakdown: {
        basePrice: Math.round(baseCost),
        extraAdults: Math.round(extraAdultsCost),
        extraBedsCost: Math.round(extraBedsCost),
        nights,
        rooms: formData.rooms,
        taxes: Math.round(taxes)
      }
    }));
  }, [formData.checkIn, formData.checkOut, formData.adults, formData.children, formData.rooms, formData.extraBeds, room]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
     
      
      // Submit to backend
      await onSubmit(formData);
      
      // Show success message
      alert("Booking submitted successfully! Check your email for confirmation.");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Column - Booking Form */}
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Room Details</h3>
          {room && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/80">Room Type:</span>
                <span className="text-white font-semibold">{room.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Base Price (2 adults):</span>
                <span className="text-teal-300">₹{room.basePrice}/night</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Max Adults per Room:</span>
                <span className="text-white">{room.maxAdults}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Extra Adult Charge:</span>
                <span className="text-amber-300">₹{room.extraAdultCharge}/night</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                />
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
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Number of Rooms *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                  value={formData.rooms}
                  onChange={(e) => {
                    const rooms = parseInt(e.target.value);
                    setFormData({
                      ...formData,
                      rooms,
                      adults: Math.min(formData.adults, rooms * (room?.maxAdults || 0))
                    });
                  }}
                >
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num} className="bg-gray-800">
                      {num} Room{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Adults *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                  value={formData.adults}
                  onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value)})}
                >
                  {Array.from({ length: (room?.maxAdults || 5) * formData.rooms }, (_, i) => i + 1)
                    .filter(num => num <= (room?.maxAdults || 5) * formData.rooms)
                    .map(num => (
                    <option key={num} value={num} className="bg-gray-800">
                      {num} Adult{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Extra Beds for Children
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                  value={formData.extraBeds}
                  onChange={(e) => setFormData({...formData, extraBeds: parseInt(e.target.value)})}
                >
                  {[0,1,2,3,4].map(num => (
                    <option key={num} value={num} className="bg-gray-800">
                      {num} Extra Bed{num !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          {formData.totalAmount > 0 && (
            <div className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-xl p-6 border border-teal-500/30">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-teal-300" />
                <h4 className="font-bold text-white">Price Breakdown</h4>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80">Base Price ({formData.breakdown.nights} nights × {formData.rooms} room{}):</span>
                  <span className="text-white">₹{formData.breakdown.basePrice}</span>
                </div>
                
                {formData.breakdown.extraAdults > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/80">Extra Adults:</span>
                    <span className="text-amber-300">₹{formData.breakdown.extraAdults}</span>
                  </div>
                )}
                
                {formData.breakdown.extraBedsCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/80">Extra Beds:</span>
                    <span className="text-amber-300">₹{formData.breakdown.extraBedsCost}</span>
                  </div>
                )}
                
                <div className="flex justify-between pt-2 border-t border-teal-500/30">
                  <span className="text-white/80">Subtotal:</span>
                  <span className="text-white">₹{formData.breakdown.basePrice + formData.breakdown.extraAdults + formData.breakdown.extraBedsCost}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80">GST (18%):</span>
                  <span className="text-rose-300">₹{formData.breakdown.taxes}</span>
                </div>
                
                <div className="flex justify-between pt-2 border-t border-teal-500/30">
                  <span className="text-lg font-bold text-white">Total Amount:</span>
                  <span className="text-2xl font-bold text-teal-300">₹{formData.totalAmount}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.checkIn || !formData.checkOut}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Confirm Booking & Pay ₹{formData.totalAmount}
              </>
            )}
          </button>
        </form>
      </div>

      {/* Right Column - Map & Location Info */}
      <div className="space-y-6">
        {room && (
          <>
            {/* Map Component */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-300" />
                Location
              </h3>
              <div className="h-[300px] rounded-lg overflow-hidden">
                <MapComponent 
                  latitude={room.location.lat}
                  longitude={room.location.lng}
                  markerText={room.name}
                />
              </div>
              <p className="text-white/80 mt-3 text-sm">
                <strong>Address:</strong> {room.location.address}
              </p>
            </div>

            {/* Nearby Places */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Nearby Attractions</h3>
              <div className="space-y-4">
                {getNearbyPlaces(room.location.lat, room.location.lng).map((place, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      {place.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{place.name}</h4>
                      <p className="text-white/70 text-sm">{place.distance} • {place.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Helper function for nearby places
function getNearbyPlaces(lat: number, lng: number) {
  return [
    {
      name: "Sholayar Dam",
      distance: "2.5 km",
      description: "Scenic dam with boating facilities",
      icon: "🌊"
    },
    {
      name: "Tea Plantations",
      distance: "1.2 km",
      description: "Guided tea estate tours",
      icon: "🍃"
    },
    {
      name: "Monkey Falls",
      distance: "8 km",
      description: "Beautiful waterfall with trekking",
      icon: "💦"
    },
    {
      name: "Local Market",
      distance: "3 km",
      description: "Fresh produce and local crafts",
      icon: "🛍️"
    }
  ];
}