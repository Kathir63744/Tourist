"use client";

import TouristNavbar from "./components/Navbar";
import Herobanner from "./components/Herobanner";
import { 
  MapPin, 
  Mountain, 
  Trees, 
  Coffee, 
  Star, 
  Wifi, 
  Bed, 
  Waves, 
  Utensils,
  Car,
  Umbrella,
  Headphones,
  Shield,
  Award,
  Calendar,
  Users,
  Compass,
  Camera,
  Heart,
  TrendingUp,
  Clock,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Phone,
  Mail,
  Cloud,
  Wind,
  Droplets,
  Sun,
  Moon,
  Zap,
  Eye,
  Bookmark,
  Share2,
  Maximize2,
  Filter,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  FireExtinguisher,
  WindIcon,
  Hotel,
  LeafyGreen,
  LucideLeaf,
  Loader2,
  BedDouble,
  Bath,
  Tv,
  CreditCard,
  IndianRupee,
  Home as HomeIcon,
  User,
  ShieldCheck
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import LocationTabsSection from "./components/LocationTabsSection";
import FoodServices from "./components/FoodServices";
import ServicesSection from "./components/ServicesSection";
import FAQSection from "./components/FAQSection";
import { bookingAPI } from "./utils/api";
import toast from 'react-hot-toast';
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Room type interfaces
interface RoomPricing {
  basePrice: number;
  originalPrice: number;
  maxAdults: number;
  maxChildren: number;
  childFree: boolean;
  adultPriceIncrement: number[];
  taxPercentage: number;
  maxRooms: number;
}

interface RoomDetails {
  id: number;
  name: string;
  location: string;
  description: string;
  detailedDescription: string;
  amenities: string[];
  images: string[];
  rating: number;
  reviews: number;
  pricing: RoomPricing;
  roomType: string;
  bedType: string;
  paymentMethods: string[];
  features: string[];
}

// Booking Data Interface
interface BookingPayload {
  resortId: string;
  resortName: string;
  location: string;
  basePrice: number;
  totalAmount: number;
  rooms: number;
  adults: number;
  children: number;
  nights: number;
  checkInDate: string;
  checkOutDate: string;
  priceBreakdown: {
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
  };
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  customer?: any;
}

// Pricing configuration for each room type
const roomPricingConfig: Record<string, RoomPricing> = {
  "Deluxe Family Room": {
    basePrice: 2603,
    originalPrice: 3254,
    maxAdults: 5,
    maxChildren: 4,
    childFree: true,
    adultPriceIncrement: [0, 0, 168, 462, 714],
    taxPercentage: 0,
    maxRooms: 3
  },
  "Deluxe Family Room (With Balcony)": {
    basePrice: 2982,
    originalPrice: 3728,
    maxAdults: 5,
    maxChildren: 4,
    childFree: true,
    adultPriceIncrement: [0, 0, 168, 462, 714],
    taxPercentage: 0,
    maxRooms: 2
  },
  "Deluxe Balcony Rooms": {
    basePrice: 2499,
    originalPrice: 4499,
    maxAdults: 3,
    maxChildren: 1,
    childFree: true,
    adultPriceIncrement: [0, 0, -300],
    taxPercentage: 5,
    maxRooms: 4
  },
  "Deluxe Non-Balcony Rooms": {
    basePrice: 2199,
    originalPrice: 3999,
    maxAdults: 3,
    maxChildren: 1,
    childFree: true,
    adultPriceIncrement: [0, 0, 0],
    taxPercentage: 5,
    maxRooms: 4
  },
  "One Bedroom House": {
    basePrice: 6300,
    originalPrice: 10500,
    maxAdults: 7,
    maxChildren: 1,
    childFree: true,
    adultPriceIncrement: [0, 0, 0, 0, 0, 0, 0],
    taxPercentage: 5,
    maxRooms: 1
  },
  "One Bedroom House (With Balcony)": {
    basePrice: 6300,
    originalPrice: 10500,
    maxAdults: 7,
    maxChildren: 1,
    childFree: true,
    adultPriceIncrement: [0, 0, 0, 0, 0, 0, 0],
    taxPercentage: 5,
    maxRooms: 1
  }
};

// Initial room data with detailed information
const initialFeaturedRooms: RoomDetails[] = [
  {
    id: 1,
    name: "Deluxe Family Room",
    location: "Sholayar Dam City",
    description: "Our Deluxe Family Room offers spacious and comfortable accommodations perfect for families.",
    detailedDescription: "Our Deluxe Family Room offers spacious and comfortable accommodations perfect for families. It features a cozy seating area, a large bed, modern amenities, and a private bathroom. With stylish furnishings and ample space, it ensures a relaxing and enjoyable stay for all guests.",
    amenities: ["Double Bed", "Max 5 adults", "Fan", "Bathroom", "Bed Linen", "Dining table", "Mineral Water", "Bath or Shower", "Flat-screen TV"],
    images: ["/room1.jpg", "/images/resorts/resort1-1.jpg", "/images/resorts/resort1-2.jpg"],
    rating: 4.4,
    reviews: 93,
    pricing: roomPricingConfig["Deluxe Family Room"],
    roomType: "Family Room",
    bedType: "Double Bed",
    paymentMethods: ["UPI", "Credit Card", "Debit Card"],
    features: ["Pay via UPI", "Double Bed", "Max 5 adults", "Fan", "Bathroom", "Bed Linen", "Dining table", "Mineral Water", "Bath or Shower", "Flat-screen TV"]
  },
  {
    id: 2,
    name: "Deluxe Family Room (With Balcony)",
    location: "Sholayar Dam City",
    description: "Our Deluxe Family Room with Balcony offers a spacious and comfortable retreat for families.",
    detailedDescription: "Our Deluxe Family Room with Balcony offers a spacious and comfortable retreat for families. It features a cozy seating area, a large bed, modern amenities, and a private bathroom. The added balcony provides a perfect space to relax and enjoy the views, making your stay even more memorable.",
    amenities: ["Double Bed", "Max 5 adults", "Bathroom", "Open Balcony"],
    images: ["/room2.jpg", "/images/resorts/resort2-1.jpg", "/images/resorts/resort2-2.jpg"],
    rating: 4.4,
    reviews: 94,
    pricing: roomPricingConfig["Deluxe Family Room (With Balcony)"],
    roomType: "Family Room",
    bedType: "Double Bed",
    paymentMethods: ["UPI"],
    features: ["Pay via UPI", "Double Bed", "Max 5 adults", "Bathroom", "Open Balcony"]
  },
  {
    id: 3,
    name: "Deluxe Balcony Rooms",
    location: "Milidhane Kothagiri",
    description: "Our Deluxe Balcony Rooms offer a spacious and comfortable retreat with beautiful balcony views.",
    detailedDescription: "Our Deluxe Balcony Rooms offer a spacious and comfortable retreat with beautiful balcony views. Perfect for small families or couples looking for a luxurious stay.",
    amenities: ["King Bed", "Max 3 adults", "Geyser", "Open Balcony", "Housekeeping", "Wardrobe or closet"],
    images: ["/kot-del1.png", "/kot-del222.png"],
    rating: 4.4,
    reviews: 94,
    pricing: roomPricingConfig["Deluxe Balcony Rooms"],
    roomType: "Deluxe Room",
    bedType: "King Bed",
    paymentMethods: ["UPI"],
    features: ["Pay via UPI", "King Bed", "Max 3 adults", "Geyser", "Open Balcony", "Housekeeping", "Wardrobe or closet"]
  },
  {
    id: 4,
    name: "Deluxe Non-Balcony Rooms",
    location: "Milidhane Kothagiri",
    description: "Comfortable Deluxe Rooms without balcony, perfect for budget-conscious travelers.",
    detailedDescription: "Comfortable Deluxe Rooms without balcony, perfect for budget-conscious travelers who want quality accommodations.",
    amenities: ["King Bed", "Max 3 adults", "Geyser", "Housekeeping", "Attached Bathroom", "Wardrobe or closet"],
    images: ["/kot-del5.png", "/kot-del55.png"],
    rating: 4.4,
    reviews: 94,
    pricing: roomPricingConfig["Deluxe Non-Balcony Rooms"],
    roomType: "Deluxe Room",
    bedType: "King Bed",
    paymentMethods: ["UPI"],
    features: ["Pay via UPI", "King Bed", "Max 3 adults", "Geyser", "Housekeeping", "Attached Bathroom", "Wardrobe or closet"]
  },
  {
    id: 5,
    name: "One Bedroom House",
    location: "Milidhane Kothagiri",
    description: "Spacious one bedroom house perfect for large families or groups.",
    detailedDescription: "Spacious one bedroom house perfect for large families or groups, featuring all modern amenities for a comfortable stay.",
    amenities: ["King Bed", "Max 7 adults", "Geyser", "Housekeeping", "Attached Bathroom", "Wardrobe or closet"],
    images: ["/kot-1bhk.jpg", "/kot-11bhk.jpg"],
    rating: 4.4,
    reviews: 94,
    pricing: roomPricingConfig["One Bedroom House"],
    roomType: "House",
    bedType: "King Bed",
    paymentMethods: ["UPI", "Credit Card", "Debit Card"],
    features: ["Pay via UPI", "King Bed", "Max 7 adults", "Geyser", "Housekeeping", "Attached Bathroom", "Wardrobe or closet"]
  },
  {
    id: 6,
    name: "One Bedroom House (With Balcony)",
    location: "Milidhane Kothagiri",
    description: "Beautiful one bedroom house with balcony offering stunning views.",
    detailedDescription: "Beautiful one bedroom house with balcony offering stunning views, perfect for families looking for extra space and luxury.",
    amenities: ["King Bed", "Max 7 adults", "Geyser", "Open Balcony", "Attached Bathroom", "Wardrobe or closet"],
    images: ["/kot-bhk3.jpg", "/kot-bhk4.jpg"],
    rating: 4.4,
    reviews: 94,
    pricing: roomPricingConfig["One Bedroom House (With Balcony)"],
    roomType: "House",
    bedType: "King Bed",
    paymentMethods: ["UPI", "Credit Card", "Debit Card"],
    features: ["Pay via UPI", "King Bed", "Max 7 adults", "Geyser", "Open Balcony", "Attached Bathroom", "Wardrobe or closet"]
  }
];

const roomTypes = [
  { 
    type: "Deluxe Room", 
    price: "₹2,603", 
    capacity: "2 Adults", 
    icon: <Bed />, 
    features: ["Mountain View", "WiFi", "Breakfast"],
    link: "/resorts?room=deluxe" 
  },
  { 
    type: "Deluxe Room (Balcony View)", 
    price: "₹2,982", 
    capacity: "2 Adults + 1 Child", 
    icon: <Bed />, 
    features: ["Private Balcony", "Minibar", "Spa Access"],
    link: "/resorts?room=premium" 
  },
];

const touristSpots = [
  {
    location: "Valparai",
    color: "from-emerald-500/20 to-teal-500/20",
    spots: [
      { name: "Tea Plantations Tour", icon: <Coffee />, duration: "3h", bestTime: "Morning" },
      { name: "Sholayar Dam", icon: <Waves />, duration: "2h", bestTime: "Afternoon" },
      { name: "Anamalai Tiger Reserve", icon: <Compass />, duration: "Full day", bestTime: "Early Morning" },
      { name: "Monkey Falls", icon: <Umbrella />, duration: "4h", bestTime: "9AM-4PM" }
    ]
  },
  {
    location: "Solaiyur",
    color: "from-green-500/20 to-emerald-500/20",
    spots: [
      { name: "Forest Trekking", icon: <Trees />, duration: "4-6h", bestTime: "Daytime" },
      { name: "Bird Watching", icon: <Camera />, duration: "2h", bestTime: "6-9 AM" },
      { name: "Tribal Village Visit", icon: <Heart />, duration: "3h", bestTime: "10AM-4PM" },
      { name: "Waterfall Exploration", icon: <Waves />, duration: "5h", bestTime: "Daytime" }
    ]
  },
  {
    location: "Kothagiri",
    color: "from-blue-500/20 to-indigo-500/20",
    spots: [
      { name: "Catherine Falls", icon: <Waves />, duration: "3h", bestTime: "Morning" },
      { name: "Tea Museum", icon: <Coffee />, duration: "2h", bestTime: "10AM-5PM" },
      { name: "Rangasamy Peak", icon: <Mountain />, duration: "6h", bestTime: "Sunrise" },
      { name: "Colonial Heritage Walk", icon: <Compass />, duration: "2.5h", bestTime: "Evening" }
    ]
  }
];

const statistics = [
  { value: "24+", label: "Premium Resorts", icon: <Mountain className="w-6 h-6" /> },
  { value: "98%", label: "Guest Satisfaction", icon: <Star className="w-6 h-6" /> },
  { value: "50+", label: "Activities", icon: <Compass className="w-6 h-6" /> },
  { value: "24/7", label: "Concierge", icon: <Headphones className="w-6 h-6" /> }
];

const services = [
  { name: "Helicopter Transfer", icon: <Wind />, desc: "Aerial transfers" },
  { name: "Private Chef", icon: <Utensils />, desc: "Custom dining" },
  { name: "Adventure Guide", icon: <Compass />, desc: "Expert expeditions" },
  { name: "Spa Therapy", icon: <Heart />, desc: "Holistic wellness" }
];

const bookingBenefits = [
  {
    title: "Best Price Guarantee",
    description: "Find lower price? We'll match it plus 10% off!",
    icon: <Shield className="w-6 h-6 text-teal-400" />
  },
  {
    title: "Flexible Cancellation",
    description: "Free cancellation up to 7 days before stay",
    icon: <CheckCircle className="w-6 h-6 text-teal-400" />
  },
  {
    title: "24/7 Support",
    description: "Dedicated concierge service for all guests",
    icon: <Headphones className="w-6 h-6 text-teal-400" />
  }
];

const quickFeatures = [
  {
    title: "Mountain Views",
    description: "Breathtaking panoramic views",
    icon: <Mountain className="w-8 h-8" />,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Luxury Spa",
    description: "Premium wellness treatments",
    icon: <Heart className="w-8 h-8" />,
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    title: "Adventure Sports",
    description: "Thrilling outdoor activities",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Fine Dining",
    description: "Gourmet culinary experiences",
    icon: <Utensils className="w-8 h-8" />,
    color: "from-amber-500/20 to-orange-500/20"
  }
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("resorts");
  const [featuredRooms, setFeaturedRooms] = useState<RoomDetails[]>(initialFeaturedRooms);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomDetails | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [bookingData, setBookingData] = useState({
    rooms: 1,
    adults: 2,
    children: 0,
    nights: 1
  });
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [weatherData] = useState({
    temp: "22°C",
    condition: "Partly Cloudy",
    humidity: "78%",
    wind: "12 km/h"
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  // Refs for navigation
  const resortsRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const attractionsRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Calculate price based on selection
  useEffect(() => {
    if (selectedRoom) {
      calculatePrice();
    }
  }, [bookingData, selectedRoom]);

  const calculatePrice = () => {
    if (!selectedRoom) return;
    
    const pricing = selectedRoom.pricing;
    const { rooms, adults, children, nights } = bookingData;
    
    // Validate max limits
    const validAdults = Math.min(adults, pricing.maxAdults);
    const validChildren = Math.min(children, pricing.maxChildren);
    const validRooms = Math.min(rooms, pricing.maxRooms);
    
    // Calculate base price based on number of adults
    let basePrice = pricing.basePrice;
    if (validAdults > 1 && validAdults <= pricing.adultPriceIncrement.length) {
      basePrice += pricing.adultPriceIncrement[validAdults - 1] || 0;
    }
    
    // Calculate total for selected rooms
    const subtotal = basePrice * validRooms * nights;
    
    // Calculate discount
    const originalSubtotal = pricing.originalPrice * validRooms * nights;
    const discount = originalSubtotal - subtotal;
    const discountPercent = Math.round((discount / originalSubtotal) * 100);
    
    // Calculate tax
    const tax = (subtotal * pricing.taxPercentage) / 100;
    
    setCalculatedPrice(subtotal);
    setDiscountPercentage(discountPercent);
    setTaxAmount(tax);
    setTotalPrice(subtotal + tax);
  };

  // Handle image gallery navigation
  const nextImage = () => {
    if (selectedRoom && selectedImageIndex < selectedRoom.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedRoom && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // Handle room selection
  const handleRoomSelect = (room: RoomDetails) => {
    setSelectedRoom(room);
    setSelectedImageIndex(0);
    setShowRoomDetails(true);
    setBookingData({
      rooms: 1,
      adults: 2,
      children: 0,
      nights: 1
    });
    
    setTimeout(() => {
      const modal = document.getElementById('room-details-modal');
      if (modal) {
        modal.scrollTop = 0;
      }
    }, 100);
  };

const handleBookNow = async (room: RoomDetails) => {
  if (!isLoggedIn) {
    toast.error("Please sign in to book a room");
    router.push("/signin");
    return;
  }
  
  setSelectedRoom(room);
  
  try {
    setBookingLoading(true);
    
    // Prepare booking data
    const bookingPayload = {
      resortId: room.id.toString(),
      resortName: room.name,
      roomType: room.roomType,
      location: room.location,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      guests: {
        adults: 2,
        children: 0,
        rooms: 1
      },
      customer: {
        name: user?.name || 'Guest',
        email: user?.email || 'guest@example.com',
        phone: user?.phone || 'Not provided'
      },
      basePrice: room.pricing.basePrice,
      totalAmount: room.pricing.basePrice * 1.18 // Including tax
    };

    console.log('📤 Sending booking:', bookingPayload);
    
    const result = await bookingAPI.createBooking(bookingPayload as any);
    
    if (result.success) {
      // Show success toasts
      toast.success('🎉 Booking confirmed successfully!', {
        duration: 5000,
        icon: '✅'
      });
      
      toast.success(`Reference: ${result.data?.bookingReference}`, {
        duration: 8000,
      });
      
      toast.success('📧 Check your email for confirmation', {
        duration: 6000,
      });
      
      // Reset state
      setSelectedRoom(null);
      setShowRoomDetails(false);
    }
    
  } catch (error: any) {
    console.error("Booking error:", error);
    toast.error('Booking failed. Please try again.');
  } finally {
    setBookingLoading(false);
  }
};

  // Handle detailed booking submission
  const handleDetailedBooking = async () => {
    if (!selectedRoom) return;
    
    if (!isLoggedIn) {
      toast.error("Please sign in to book a room");
      router.push("/signin");
      return;
    }

    try {
      setBookingLoading(true);
      
      const bookingPayload: BookingPayload = {
        resortId: selectedRoom.id.toString(),
        resortName: selectedRoom.name,
        location: selectedRoom.location,
        basePrice: selectedRoom.pricing.basePrice,
        totalAmount: totalPrice,
        rooms: bookingData.rooms,
        adults: bookingData.adults,
        children: bookingData.children,
        nights: bookingData.nights,
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(Date.now() + bookingData.nights * 24 * 60 * 60 * 1000).toISOString(),
        priceBreakdown: {
          subtotal: calculatedPrice,
          discount: (selectedRoom.pricing.originalPrice * bookingData.rooms * bookingData.nights) - calculatedPrice,
          tax: taxAmount,
          total: totalPrice
        },
        roomType: selectedRoom.roomType,
        checkIn: new Date().toISOString().split('T')[0],
        checkOut: new Date(Date.now() + bookingData.nights * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        guests: bookingData.adults + bookingData.children,
        customer: user ? {
          name: user.name,
          email: user.email,
          phone: user.phone
        } : undefined
      };

      const result = await bookingAPI.createBooking(bookingPayload as any);

      if (result.success) {
        toast.success("Booking request submitted successfully!");
        
        if (result.data?.bookingReference) {
          toast.success(`Booking Reference: ${result.data.bookingReference}`, {
            duration: 6000,
          });
        }
        
        // Navigate to resort page
        router.push(`/resorts?room=${selectedRoom.id}`);
        setShowRoomDetails(false);
      } else {
        toast.error(result.error || "Booking failed");
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(error.message || "Failed to submit booking");
    } finally {
      setBookingLoading(false);
    }
  };

  // Section header components
  const SectionHeader = ({ 
    title, 
    subtitle, 
    highlight, 
    badge,
    className = "" 
  }: {
    title: string;
    subtitle: string;
    highlight: string;
    badge?: string;
    className?: string;
  }) => (
    <div className={`text-center mb-12 ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-teal-500/40 to-emerald-500/40 backdrop-blur-lg border border-white/30 rounded-full text-sm font-medium text-white mb-4 shadow-lg">
          <Sparkles className="w-4 h-4" />
          {badge}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {title} <span className="bg-linear-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">{highlight}</span>
      </h2>
      <p className="text-white/95 max-w-2xl mx-auto text-lg">
        {subtitle}
      </p>
    </div>
  );

  // Enhanced card component
  const Card = ({ 
    children, 
    className = "", 
    hover = true 
  }: {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
  }) => (
    <div className={`
      bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl
      ${hover ? 'hover:shadow-emerald-500/40 hover:-translate-y-2 transition-all duration-500' : ''}
      ${className}
    `}>
      {children}
    </div>
  );

  // Price Calculator Component
  const PriceCalculator = () => {
    if (!selectedRoom) return null;
    
    const pricing = selectedRoom.pricing;
    const discount = Math.round(((pricing.originalPrice - pricing.basePrice) / pricing.originalPrice) * 100);
    
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-white">Price Details</h4>
            <p className="text-white/70 text-sm">Best price available - {discount}% off</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">₹{totalPrice.toFixed(2)}</div>
            <p className="text-white/70 text-sm">Inclusive of all taxes</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Rooms Selection */}
          <div>
            <label className="block text-white/90 text-sm mb-2">Select Rooms (Max: {pricing.maxRooms})</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].slice(0, pricing.maxRooms).map(num => (
                <button
                  key={num}
                  onClick={() => setBookingData(prev => ({ ...prev, rooms: num }))}
                  className={`flex-1 py-2 rounded-lg border ${bookingData.rooms === num 
                    ? 'bg-teal-500 border-teal-500 text-white' 
                    : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20'
                  }`}
                >
                  {num} Room{num > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>
          
          {/* Adults & Children */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 text-sm mb-2">Adults (Max: {pricing.maxAdults})</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBookingData(prev => ({ 
                    ...prev, 
                    adults: Math.max(1, prev.adults - 1) 
                  }))}
                  className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  −
                </button>
                <span className="text-white font-bold">{bookingData.adults}</span>
                <button
                  onClick={() => setBookingData(prev => ({ 
                    ...prev, 
                    adults: Math.min(pricing.maxAdults, prev.adults + 1) 
                  }))}
                  className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  +
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-white/90 text-sm mb-2">Children (Max: {pricing.maxChildren})</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBookingData(prev => ({ 
                    ...prev, 
                    children: Math.max(0, prev.children - 1) 
                  }))}
                  className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  −
                </button>
                <span className="text-white font-bold">{bookingData.children}</span>
                <button
                  onClick={() => setBookingData(prev => ({ 
                    ...prev, 
                    children: Math.min(pricing.maxChildren, prev.children + 1) 
                  }))}
                  className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          
          {/* Nights */}
          <div>
            <label className="block text-white/90 text-sm mb-2">Nights</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setBookingData(prev => ({ 
                  ...prev, 
                  nights: Math.max(1, prev.nights - 1) 
                }))}
                className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
              >
                −
              </button>
              <span className="text-white font-bold">{bookingData.nights} night{bookingData.nights > 1 ? 's' : ''}</span>
              <button
                onClick={() => setBookingData(prev => ({ ...prev, nights: prev.nights + 1 }))}
                className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Price Breakdown */}
          <div className="pt-4 border-t border-white/20">
            <div className="space-y-2">
              <div className="flex justify-between text-white/90">
                <span>Base Price ({bookingData.rooms} room{bookingData.rooms > 1 ? 's' : ''})</span>
                <span>₹{calculatedPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-400">
                <span>Discount ({discountPercentage}%)</span>
                <span>-₹{(pricing.originalPrice * bookingData.rooms * bookingData.nights - calculatedPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>Taxes & Charges</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/20">
                <span>Total Amount</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Book Now Button */}
          <button
            onClick={handleDetailedBooking}
            disabled={bookingLoading}
            className="w-full py-3 bg-linear-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {bookingLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Book Now - ₹{totalPrice.toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans antialiased relative overflow-hidden">
      {/* Background Image with Light Overlay */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: `url('/ba.jpg')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-slate-900/30 to-slate-900/40" />
        <div className="absolute inset-0 bg-linear-to-r from-teal-900/10 via-transparent to-emerald-900/10" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(15, 23, 42, 0.3) 100%)'
        }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <TouristNavbar />
        <Herobanner />
        
        <section className="sticky top-0 z-40">
          {/* Glowing Border */}
          <div className="h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent" />
          <div className="absolute inset-x-0 top-3 flex justify-center">
            <div className="h-2 w-2 bg-teal-400 rounded-full shadow-[0_0_15px_5px_rgba(45,212,191,0.5)] animate-pulse" />
          </div>
        </section>

        {/* Featured Highlights Section */}
        <section className="py-16 mt-6 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-8">
              {[
                { icon: <Mountain className="w-8 h-8" />, label: "Mountain Views" },
                { icon: <Wifi className="w-8 h-8" />, label: "Free WiFi" },
                { icon: <Coffee className="w-8 h-8" />, label: "Breakfast" },
                { icon: <Car className="w-8 h-8" />, label: "Free Car Parking" },
                { icon: <FireExtinguisher className="w-8 h-8" />, label: "Camp Fire" },
                { icon: <LucideLeaf className="w-8 h-8" />, label: "Open Balcony" },
                { icon: <Hotel className="w-8 h-8" />, label: "Restaurant" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center gap-2 animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="p-3 bg-linear-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl border border-white/30">
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <span className="text-white/90 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <LocationTabsSection/>

        {/* Resorts Section */}
        <section id="resorts" ref={resortsRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
            <SectionHeader
              title="Luxury Rooms &"
              highlight="Houses"
              subtitle="Experience world-class hospitality in our carefully curated rooms and houses across Valparai, Solaiyur, and Kothagiri"
              badge="Featured Properties"
            />

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-12 h-12 text-teal-400 animate-spin" />
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {featuredRooms.map((room) => (
                    <div 
                      key={room.id} 
                      className="group relative"
                      onMouseEnter={() => setHoveredRoom(room.id)}
                      onMouseLeave={() => setHoveredRoom(null)}
                    >
                      <Card className="overflow-hidden h-full">
                        {/* Image Container */}
                        <div className="relative h-72 overflow-hidden">
                          <img 
                            src={room.images[0]} 
                            alt={room.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          
                          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/30" />
                          
                          {/* Location Badge */}
                          <div className="absolute top-4 right-4">
                            <div className="px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {room.location}
                            </div>
                          </div>
                          
                          {/* Rating Badge */}
                          <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full border border-white/30">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-white">{room.rating}</span>
                            <span className="text-white/80 text-xs">({room.reviews})</span>
                          </div>
                          
                          {/* Image Counter */}
                          <div className="absolute bottom-4 right-4">
                            <div className="px-2 py-1 bg-black/70 backdrop-blur-md rounded-full text-white text-xs">
                              {room.images.length} photos
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-1">
                                {room.name}
                              </h3>
                              <p className="text-white/70 text-sm mt-1">{room.roomType} • {room.bedType}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold bg-linear-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                                ₹{room.pricing.basePrice}/night
                              </div>
                              <div className="text-white/70 text-sm line-through">
                                ₹{room.pricing.originalPrice}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-white/95 mb-5 text-sm line-clamp-2">
                            {room.description}
                          </p>
                          
                          {/* Amenities */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {room.amenities.slice(0, 3).map((amenity: string, index: number) => (
                              <span 
                                key={index} 
                                className="px-3 py-1 bg-white/30 backdrop-blur-sm text-white/95 rounded-full text-xs border border-white/30"
                              >
                                {amenity}
                              </span>
                            ))}
                            {room.amenities.length > 3 && (
                              <span className="px-3 py-1 bg-white/20 text-white/80 rounded-full text-xs">
                                +{room.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleRoomSelect(room)}
                              className="flex-1 px-4 py-3 bg-linear-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all group shadow-lg"
                            >
                              <span className="flex items-center justify-center gap-2">
                                Select Room
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </button>
                            <button 
                              onClick={() => handleBookNow(room)}
                              disabled={bookingLoading}
                              className="px-4 py-3 bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/40 transition-colors disabled:opacity-50"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="px-4 py-3 bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/40 transition-colors">
                              <Heart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </Card>
                      
                      {/* Hover glow effect */}
                      {hoveredRoom === room.id && (
                        <div className="absolute -inset-4 bg-linear-to-r from-teal-500/30 to-emerald-500/30 blur-3xl rounded-2xl -z-10" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => router.push('/resorts')}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-teal-500/40 to-emerald-500/40 backdrop-blur-xl text-white font-semibold rounded-2xl hover:from-teal-500/50 hover:to-emerald-500/50 transition-all border border-white/30 shadow-2xl group"
                  >
                    View All Rooms 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Room Types Section */}
        <section id="rooms" ref={roomsRef} className="py-20 bg-linear-to-b from-transparent via-slate-900/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-18">
            <SectionHeader
              title="Accommodation"
              highlight="Options"
              subtitle="Choose from a variety of room types suitable for couples, families, and solo travelers"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {roomTypes.map((room, index) => (
                <Card key={index} className="p-8">
                  <div className="relative mb-6">
                    <div className="p-5 bg-linear-to-br from-teal-500/40 to-emerald-500/40 backdrop-blur-sm rounded-3xl w-fit">
                      <div className="text-white text-2xl">{room.icon}</div>
                    </div>
                    <div className="absolute inset-0 bg-linear-to-br from-teal-500/50 to-emerald-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{room.type}</h3>
                  <div className="text-3xl font-bold bg-linear-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent mb-5">
                    {room.price}
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-white/90 text-sm">{room.capacity}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {room.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/20 text-white/90 rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <a 
                    href={room.link}
                    className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 font-medium text-sm group/link"
                  >
                    View Rooms
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <FoodServices />
        <ServicesSection />
        <FAQSection />

        {/* Blog Section */}
        <section id="blog" ref={blogRef} className="py-20 bg-gradient-to-b from-transparent via-slate-900/10 to-transparent">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">
        Travel <span className="text-teal-300">Insights</span>
      </h2>
      <p className="text-white/90 max-w-2xl mx-auto">
        Discover tips and guides for Valparai-Solaiyur and Kothagiri hill stations
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-10">
      {[
        {
          title: "Valparai-Solaiyur Travel Guide",
          description: "Everything about visiting Valparai and Solaiyur - stays, waterfalls, and local experiences",
          location: "Valparai-Solaiyur",
          color: "emerald",
          date: "Jan 15, 2024"
        },
        {
          title: "Kothagiri Campfire Nights",
          description: "Experience magical evenings under misty mountain skies with barbecue",
          location: "Kothagiri",
          color: "orange",
          date: "Jan 12, 2024"
        },
        {
          title: "Best Time to Visit Hill Stations",
          description: "Seasonal guide for both locations with weather and activity planning",
          location: "Both Locations",
          color: "teal",
          date: "Jan 10, 2024"
        }
      ].map((post, index) => (
        <div 
          key={index} 
          className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-5 hover:border-white/40 transition-colors"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full ${
              post.color === 'emerald' ? 'bg-emerald-400' : 
              post.color === 'orange' ? 'bg-orange-400' : 
              'bg-teal-400'
            }`} />
            <span className={`text-sm font-medium ${
              post.color === 'emerald' ? 'text-emerald-300' : 
              post.color === 'orange' ? 'text-orange-300' : 
              'text-teal-300'
            }`}>
              {post.location}
            </span>
            <span className="text-white/40 text-sm ml-auto">{post.date}</span>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-white/80 text-sm mb-5 line-clamp-2">
            {post.description}
          </p>
          
          <a 
            href="/blog" 
            className={`inline-flex items-center gap-1 text-sm font-medium ${
              post.color === 'emerald' ? 'text-emerald-300 hover:text-emerald-200' : 
              post.color === 'orange' ? 'text-orange-300 hover:text-orange-200' : 
              'text-teal-300 hover:text-teal-200'
            }`}
          >
            Read More →
          </a>
        </div>
      ))}
    </div>

    <div className="text-center">
      <a 
        href="/blog" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500/20 text-teal-300 rounded-lg border border-teal-500/30 hover:bg-teal-500/30 transition-colors"
      >
        View All Articles
      </a>
    </div>
  </div>
</section>

        {/* Weather Widget */}
        <div className="fixed bottom-6 right-6 z-50">
          <Card className="p-4" hover={false}>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-linear-to-br from-teal-500/40 to-emerald-500/40 backdrop-blur-sm rounded-xl">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Current Weather</p>
                <p className="text-2xl font-bold text-white">{weatherData.temp}</p>
                <p className="text-white/90 text-xs">{weatherData.condition}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Mountain className="w-6 h-6 text-teal-400" />
                  <span className="text-xl font-bold text-white">HillEscape</span>
                </div>
                <p className="text-white/70 text-sm">Luxury hill station experiences redefined</p>
              </div>
              
              <div className="flex items-center gap-6">
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Contact Us</a>
              </div>
              
              <div className="text-white/70 text-sm">
                © {new Date().getFullYear()} HillEscape. All rights reserved.
              </div>
            </div>
          </div>
        </footer>

        {/* Room Details Modal */}
        {showRoomDetails && selectedRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowRoomDetails(false)}
            />
            
            {/* Modal */}
            <div 
              id="room-details-modal"
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowRoomDetails(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/70 rounded-full border border-white/30 text-white hover:bg-black/90 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white">{selectedRoom.name}</h2>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-teal-400" />
                        <span className="text-white/90">{selectedRoom.location}</span>
                        <div className="flex items-center gap-1 ml-4">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-white font-bold">{selectedRoom.rating}</span>
                          <span className="text-white/80">({selectedRoom.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-linear-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                        ₹{selectedRoom.pricing.basePrice}<span className="text-xl">/night</span>
                      </div>
                      <div className="text-white/70 line-through">
                        ₹{selectedRoom.pricing.originalPrice}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Column - Images & Description */}
                  <div className="lg:col-span-2">
                    {/* Image Gallery */}
                    <div className="relative rounded-xl overflow-hidden mb-6">
                      <img 
                        src={selectedRoom.images[selectedImageIndex]} 
                        alt={selectedRoom.name}
                        className="w-full h-96 object-cover"
                      />
                      
                      {/* Navigation Arrows */}
                      {selectedRoom.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            disabled={selectedImageIndex === 0}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 rounded-full border border-white/30 text-white disabled:opacity-50 hover:bg-black/90 transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            disabled={selectedImageIndex === selectedRoom.images.length - 1}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 rounded-full border border-white/30 text-white disabled:opacity-50 hover:bg-black/90 transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <div className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-white text-sm">
                          {selectedImageIndex + 1} / {selectedRoom.images.length}
                        </div>
                      </div>
                    </div>
                    
                    {/* Thumbnails */}
                    {selectedRoom.images.length > 1 && (
                      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {selectedRoom.images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImageIndex === index 
                              ? 'border-teal-500' 
                              : 'border-transparent'
                            }`}
                          >
                            <img 
                              src={img} 
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-3">Description</h3>
                      <p className="text-white/90">{selectedRoom.detailedDescription}</p>
                    </div>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-3">Room Features</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedRoom.features.map((feature, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-2 p-3 bg-white/10 rounded-lg border border-white/10"
                          >
                            <CheckCircle className="w-4 h-4 text-teal-400" />
                            <span className="text-white/90 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Payment Methods */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Payment Methods</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedRoom.paymentMethods.map((method, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10"
                          >
                            {method === "UPI" && <IndianRupee className="w-4 h-4 text-teal-400" />}
                            {method === "Credit Card" && <CreditCard className="w-4 h-4 text-teal-400" />}
                            <span className="text-white/90 text-sm">{method}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Booking Form */}
                  <div className="lg:col-span-1">
                    <PriceCalculator />
                    
                    {/* Quick Info */}
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <BedDouble className="w-5 h-5 text-teal-400" />
                          <div>
                            <p className="text-white font-medium">{selectedRoom.bedType}</p>
                            <p className="text-white/70 text-sm">Bed Type</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{selectedRoom.roomType}</p>
                          <p className="text-white/70 text-sm">Room Type</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-teal-400" />
                          <div>
                            <p className="text-white font-medium">
                              {selectedRoom.pricing.maxAdults} Adults, {selectedRoom.pricing.maxChildren} Children
                            </p>
                            <p className="text-white/70 text-sm">Maximum Capacity</p>
                          </div>
                        </div>
                        <ShieldCheck className="w-5 h-5 text-teal-400" />
                      </div>
                      
                      <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-teal-400" />
                          <span className="text-white font-medium">Best Price Guarantee</span>
                        </div>
                        <p className="text-white/70 text-sm">
                          Children stay free (up to {selectedRoom.pricing.maxChildren} children)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .line-clamp-1 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          
          .line-clamp-2 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
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
            
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
              .bg-fixed {
                background-attachment: scroll;
              }
            }
          }
        `}</style>
      </div>
    </div>
  );
}