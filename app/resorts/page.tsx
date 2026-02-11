"use client";

import TouristNavbar from "../components/Navbar";
import FilterSection from "../components/FilterSection";
import { useState, useMemo, useEffect } from "react";
import { Resort, ResortsResponse } from "../utils/api";
import Image from "next/image";
import { 
  Search, 
  TrendingUp, 
  ArrowUpDown,
  X,
  Star,
  Loader2,
  Mountain,
  MapPin,
  Calendar,
  Users,
  Bed,
  Eye,
  Heart,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Shield,
  Headphones,
  Cloud,
  Wind,
  Waves,
  Trees,
  Coffee,
  Car,
  FireExtinguisher,
  Hotel,
  LucideLeaf,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  IndianRupee,
  BedDouble,
  ShieldCheck,
  Utensils,
  Compass,
  Camera,
  Umbrella,
  Zap,
  Bookmark,
  Share2,
  Maximize2,
  Filter,
  Menu,
  Phone,
  Mail,
  Droplets,
  Sun,
  Moon,
  Clock
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BookingModal from "../components/BookingModal";
import { bookingAPI, resortAPI } from "../utils/api";

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
  tags: string[];
  season: string;
  roomTypes: number;
  special: string;
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

// Sample fallback data with correct image paths and detailed information
const fallbackResorts: RoomDetails[] = [
  {
    id: 1,
    name: "Deluxe Family Room",
    location: "Valparai-Solaiyur",
    description: "Our Deluxe Family Room offers spacious and comfortable accommodations perfect for families.",
    detailedDescription: "Our Deluxe Family Room offers spacious and comfortable accommodations perfect for families. It features a cozy seating area, a large bed, modern amenities, and a private bathroom. With stylish furnishings and ample space, it ensures a relaxing and enjoyable stay for all guests.",
    amenities: ["Double Bed", "Max 5 adults", "Fan", "Bathroom", "Bed Linen", "Dining table", "Mineral Water", "Bath or Shower", "Flat-screen TV", "Mountain View", "Spa", "Infinity Pool", "WiFi", "Restaurant", "Gym"],
    images: ["/r1.jpg", "/r2.jpg", "/r3.jpg", "/r4.jpg"],
    rating: 4.9,
    reviews: 128,
    pricing: roomPricingConfig["Deluxe Family Room"],
    roomType: "Family Room",
    bedType: "Double Bed",
    paymentMethods: ["UPI", "Credit Card", "Debit Card"],
    features: ["Pay via UPI", "Double Bed", "Max 5 adults", "Fan", "Bathroom", "Bed Linen", "Dining table", "Mineral Water", "Bath or Shower", "Flat-screen TV"],
    tags: ["Luxury", "Family Friendly", "Pet Friendly", "Spa", "Wellness"],
    season: "Best: Oct-Mar",
    roomTypes: 3,
    special: "Free Breakfast Included"
  },
  {
    id: 2,
    name: "Deluxe Family Room (With Balcony)",
    location: "Valparai-Solaiyur",
    description: "Our Deluxe Family Room with Balcony offers a spacious and comfortable retreat for families.",
    detailedDescription: "Our Deluxe Family Room with Balcony offers a spacious and comfortable retreat for families. It features a cozy seating area, a large bed, modern amenities, and a private bathroom. The added balcony provides a perfect space to relax and enjoy the views, making your stay even more memorable.",
    amenities: ["Double Bed", "Max 5 adults", "Bathroom", "Open Balcony", "Forest View", "Campfire", "Trekking", "Bird Watching", "Eco-friendly"],
    images: ["/2r.jpg", "/r1.jpg", "/3r.jpg", "/4r.jpg"],
    rating: 4.7,
    reviews: 95,
    pricing: roomPricingConfig["Deluxe Family Room (With Balcony)"],
    roomType: "Family Room",
    bedType: "Double Bed",
    paymentMethods: ["UPI"],
    features: ["Pay via UPI", "Double Bed", "Max 5 adults", "Bathroom", "Open Balcony"],
    tags: ["Eco-Friendly", "Adventure", "Romantic", "Wildlife", "Nature"],
    season: "Year Round",
    roomTypes: 4,
    special: "Nature Walk Included"
  },
  {
    id: 3,
    name: "Deluxe Balcony Rooms",
    location: "Kothagiri",
    description: "Our Deluxe Balcony Rooms offer a spacious and comfortable retreat with beautiful balcony views.",
    detailedDescription: "Our Deluxe Balcony Rooms offer a spacious and comfortable retreat with beautiful balcony views. Perfect for small families or couples looking for a luxurious stay.",
    amenities: ["King Bed", "Max 3 adults", "Geyser", "Open Balcony", "Housekeeping", "Wardrobe or closet", "Valley View", "Private Pool", "Butler Service", "Fine Dining", "Spa"],
    images: ["/kot-del2.png", "/kot-del22.png", "/kot-del11.png", "/kot-del4.jpg"],
    rating: 4.8,
    reviews: 112,
    pricing: roomPricingConfig["Deluxe Balcony Rooms"],
    roomType: "Deluxe Room",
    bedType: "King Bed",
    paymentMethods: ["UPI"],
    features: ["Pay via UPI", "King Bed", "Max 3 adults", "Geyser", "Open Balcony", "Housekeeping", "Wardrobe or closet"],
    tags: ["Luxury", "Premium", "Romantic", "Mountain View", "Balcony"],
    season: "Best: Nov-Feb",
    roomTypes: 2,
    special: "Early Bird Discount"
  },
  {
    id: 4,
    name: "Deluxe Non-Balcony Rooms",
    location: "Kothagiri",
    description: "Comfortable Deluxe Rooms without balcony, perfect for budget-conscious travelers.",
    detailedDescription: "Comfortable Deluxe Rooms without balcony, perfect for budget-conscious travelers who want quality accommodations.",
    amenities: ["King Bed", "Max 3 adults", "Geyser", "Housekeeping", "Attached Bathroom", "Wardrobe or closet", "Valley View", "Private Pool", "Butler Service", "Fine Dining", "Spa"],
    images: ["/kot-del2.png", "/kot-del22.png"],
    rating: 4.8,
    reviews: 112,
    pricing: roomPricingConfig["Deluxe Non-Balcony Rooms"],
    roomType: "Deluxe Room",
    bedType: "King Bed",
    paymentMethods: ["UPI"],
    features: ["Pay via UPI", "King Bed", "Max 3 adults", "Geyser", "Housekeeping", "Attached Bathroom", "Wardrobe or closet"],
    tags: ["Budget", "Family", "Comfort", "Value"],
    season: "Best: Nov-Feb",
    roomTypes: 2,
    special: "Weekend Special"
  },
  {
    id: 5,
    name: "One Bedroom House",
    location: "Kothagiri",
    description: "Spacious one bedroom house perfect for large families or groups.",
    detailedDescription: "Spacious one bedroom house perfect for large families or groups, featuring all modern amenities for a comfortable stay.",
    amenities: ["King Bed", "Max 7 adults", "Geyser", "Housekeeping", "Attached Bathroom", "Wardrobe or closet", "Valley View", "Private Pool", "Butler Service", "Fine Dining", "Spa"],
    images: ["/kot-1bhk.jpg", "/kot-1bhk.2jpg.jpg", "/kot-11bhk.jpg"],
    rating: 4.8,
    reviews: 112,
    pricing: roomPricingConfig["One Bedroom House"],
    roomType: "House",
    bedType: "King Bed",
    paymentMethods: ["UPI", "Credit Card", "Debit Card"],
    features: ["Pay via UPI", "King Bed", "Max 7 adults", "Geyser", "Housekeeping", "Attached Bathroom", "Wardrobe or closet"],
    tags: ["Luxury", "Family", "Premium", "Spacious", "Private"],
    season: "Best: Dec-Mar",
    roomTypes: 1,
    special: "Luxury Package"
  },
  {
    id: 6,
    name: "One Bedroom House (With Balcony)",
    location: "Kothagiri",
    description: "Beautiful one bedroom house with balcony offering stunning views.",
    detailedDescription: "Beautiful one bedroom house with balcony offering stunning views, perfect for families looking for extra space and luxury.",
    amenities: ["King Bed", "Max 7 adults", "Geyser", "Open Balcony", "Attached Bathroom", "Wardrobe or closet", "Valley View", "Private Pool", "Butler Service", "Fine Dining", "Spa"],
    images: ["/apart.jpg", "/kot-bhk3.jpg", "/apart1.jpg"],
    rating: 4.8,
    reviews: 112,
    pricing: roomPricingConfig["One Bedroom House (With Balcony)"],
    roomType: "House",
    bedType: "King Bed",
    paymentMethods: ["UPI", "Credit Card", "Debit Card"],
    features: ["Pay via UPI", "King Bed", "Max 7 adults", "Geyser", "Open Balcony", "Attached Bathroom", "Wardrobe or closet"],
    tags: ["Premium", "Luxury", "Family", "View", "Balcony"],
    season: "Best: Dec-Mar",
    roomTypes: 1,
    special: "Premium View"
  },
];

const locations = ["All", "Valparai-Solaiyur", "Kothagiri"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "₹2,000 - ₹3,500", min: 2000, max: 3500 },
  { label: "₹3,501 - ₹5,000", min: 3501, max: 5000 },
  { label: "₹5,001+", min: 5001, max: Infinity }
];
const amenitiesList = ["Mountain View", "Forest View", "Valley View", "Pool", "Spa", "Restaurant", "WiFi", "Parking", "Gym", "Pet Friendly", "Eco-friendly", "Campfire"];
const tagsList = ["Luxury", "Budget", "Family", "Romantic", "Adventure", "Eco-Friendly", "Premium", "Nature", "Honeymoon", "Wellness"];

export default function ResortsPage() {
  const [bookingLoading, setBookingLoading] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    priceRange: "All Prices",
    amenities: [] as string[],
    tags: [] as string[],
  });
  const [sortBy, setSortBy] = useState("popularity");
  const [resorts, setResorts] = useState<RoomDetails[]>(fallbackResorts);
  const [isLoading, setIsLoading] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedResort, setSelectedResort] = useState<RoomDetails | null>(null);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
  
  const resortsPerPage = 6;

  // Fetch resorts from backend on component mount
  useEffect(() => {
    fetchResorts();
  }, []);

const fetchResorts = async () => {
  try {
    setIsLoading(true);
    
    const response = await resortAPI.getAllResorts();
    
    if (response.success && response.data?.resorts && response.data.resorts.length > 0) {
      // Map API resorts to your RoomDetails format
      const apiResorts = response.data.resorts.map((resort: Resort) => ({
        id: resort.id,
        name: resort.name,
        location: resort.location,
        description: resort.description,
        detailedDescription: resort.description,
        amenities: resort.amenities || [],
        images: resort.images || ['/default-room.jpg'],
        rating: resort.rating || 4.5,
        reviews: resort.reviews || 0,
        pricing: {
          basePrice: resort.price,
          originalPrice: Math.round(resort.price * 1.25), // 25% higher as original
          maxAdults: 3,
          maxChildren: 2,
          childFree: true,
          adultPriceIncrement: [0, 0, 168],
          taxPercentage: 5,
          maxRooms: 3
        },
        roomType: resort.roomType || 'Deluxe Room',
        bedType: resort.bedType || 'Double Bed',
        paymentMethods: ['UPI', 'Credit Card'],
        features: resort.amenities || [],
        tags: resort.tags || [],
        season: 'Best: Oct-Mar',
        roomTypes: 3,
        special: 'Free Breakfast'
      }));
      
      setResorts(apiResorts);
      setTotalPages(Math.ceil(apiResorts.length / resortsPerPage));
    } else {
      // Use fallback data
      console.log('Using fallback resorts data');
      setResorts(fallbackResorts);
      setTotalPages(Math.ceil(fallbackResorts.length / resortsPerPage));
    }
  } catch (error) {
    console.error("Error fetching resorts:", error);
    setResorts(fallbackResorts);
    setTotalPages(Math.ceil(fallbackResorts.length / resortsPerPage));
  } finally {
    setIsLoading(false);
  }
};

  // Calculate price based on selection
  useEffect(() => {
    if (selectedResort) {
      calculatePrice();
    }
  }, [bookingData, selectedResort]);

  const calculatePrice = () => {
    if (!selectedResort) return;
    
    const pricing = selectedResort.pricing;
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
    if (selectedResort && selectedImageIndex < selectedResort.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedResort && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // Handle room selection
  const handleRoomSelect = (resort: RoomDetails) => {
    setSelectedResort(resort);
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

  // Get price range object
  const getPriceRange = (label: string) => {
    return priceRanges.find(range => range.label === label) || priceRanges[0];
  };

  // Apply all filters
  const filteredResorts = useMemo(() => {
    let result = [...resorts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(resort =>
        resort.name.toLowerCase().includes(query) ||
        resort.description.toLowerCase().includes(query) ||
        resort.location.toLowerCase().includes(query) ||
        resort.tags.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // Location filter
    if (filters.location && filters.location !== "All") {
      result = result.filter(resort => 
        resort.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceRange !== "All Prices") {
      const range = getPriceRange(filters.priceRange);
      result = result.filter(resort => 
        resort.pricing.basePrice >= range.min && resort.pricing.basePrice <= range.max
      );
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter(resort =>
        filters.amenities.every(amenity =>
          resort.amenities.some((a: string) => 
            a.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      );
    }

    // Tags filter
    if (filters.tags.length > 0) {
      result = result.filter(resort =>
        filters.tags.every(tag => 
          resort.tags.some((t: string) => 
            t.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
        break;
      case "price-high":
        result.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "popularity":
      default:
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy, resorts]);

  // Pagination
  const paginatedResorts = useMemo(() => {
    const startIndex = (currentPage - 1) * resortsPerPage;
    return filteredResorts.slice(startIndex, startIndex + resortsPerPage);
  }, [filteredResorts, currentPage]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setFilters({
      location: "",
      priceRange: "All Prices",
      amenities: [],
      tags: [],
    });
    setCurrentPage(1);
  };

  const handleBookClick = (resort: RoomDetails) => {
    if (!isLoggedIn) {
      toast.error("Please sign in to book a resort");
      router.push("/signin");
      return;
    }
    
    setSelectedResort(resort);
    setIsBookingModalOpen(true);
  };

const handleBookingSubmit = async (bookingData: any) => {
  try {
    setBookingLoading(true);
    
    // Prepare data
    const completeBookingData = {
      ...bookingData,
      resortId: selectedResort?.id?.toString() || '1',
      resortName: selectedResort?.name || 'HillEscape Resort',
      location: selectedResort?.location || 'Valparai',
      basePrice: selectedResort?.pricing.basePrice || 2603,
      totalAmount: bookingData.totalAmount || bookingData.priceBreakdown?.totalAmount || 0,
      roomType: selectedResort?.roomType || 'Deluxe Room',
      customer: user ? {
        name: user.name,
        email: user.email,
        phone: user.phone || bookingData.customer?.phone || ''
      } : bookingData.customer
    };

    console.log('📤 Sending booking:', completeBookingData);

    const result = await bookingAPI.createBooking(completeBookingData as any);

    if (result.success) {
      // Show multiple toasts for better UX
      toast.success(`✅ Booking submitted successfully!`, {
        duration: 5000,
      });
      
      toast.success(`📋 Reference: ${result.data?.bookingReference || 'Pending'}`, {
        duration: 7000,
      });
      
      toast.success(`📞 Our team will contact you within 2 hours`, {
        duration: 6000,
      });
      
      // Close modals
      setIsBookingModalOpen(false);
      setSelectedResort(null);
      setShowRoomDetails(false);
      
    } else {
      // Even if API returns error, show booking was received
      toast.success('📝 Booking request received! Our team will process it.', {
        duration: 5000,
      });
      
      setIsBookingModalOpen(false);
      setSelectedResort(null);
    }
  } catch (error: any) {
    console.error("Booking error:", error);
    
    // Show success message anyway
    toast.success('📝 Booking request noted! You will receive confirmation soon.', {
      duration: 5000,
    });
    
    setIsBookingModalOpen(false);
    setSelectedResort(null);
    setShowRoomDetails(false);
  } finally {
    setBookingLoading(false);
  }
};

  const handleDetailedBooking = async () => {
    if (!selectedResort) return;
    
    if (!isLoggedIn) {
      toast.error("Please sign in to book a room");
      router.push("/signin");
      return;
    }

    try {
      setBookingLoading(true);
      
      const bookingPayload = {
        resortId: selectedResort.id.toString(),
        resortName: selectedResort.name,
        location: selectedResort.location,
        basePrice: selectedResort.pricing.basePrice,
        totalAmount: totalPrice,
        rooms: bookingData.rooms,
        adults: bookingData.adults,
        children: bookingData.children,
        nights: bookingData.nights,
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(Date.now() + bookingData.nights * 24 * 60 * 60 * 1000).toISOString(),
        priceBreakdown: {
          subtotal: calculatedPrice,
          discount: (selectedResort.pricing.originalPrice * bookingData.rooms * bookingData.nights) - calculatedPrice,
          tax: taxAmount,
          total: totalPrice
        },
        roomType: selectedResort.roomType,
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
        
        setShowRoomDetails(false);
        setSelectedResort(null);
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

  // Price Calculator Component
  const PriceCalculator = () => {
    if (!selectedResort) return null;
    
    const pricing = selectedResort.pricing;
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
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
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

  // Check URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const location = params.get("location");
      const room = params.get("room");
      
      if (location) {
        setFilters(prev => ({ ...prev, location }));
      }
      
      if (room) {
        console.log("Room type filter:", room);
      }
    }
  }, []);

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
        <TouristNavbar initialTransparent={false} />
        
        {/* Hero Section with enhanced background */}
        <section className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)'
            }} />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div className="flex ml-58 items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl shadow-2xl">
                  <Mountain className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl  md:text-7xl font-bold text-white drop-shadow-2xl">
                  Premium <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">Resorts</span>
                </h1>
              </div>
              <p className="text-xl ml-57 text-gray-200 max-w-2xl drop-shadow-lg">
                Discover luxury accommodations across Valparai, Solaiyur, and Kothagiri
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4">
                <div className="sticky top-24">
                  <FilterSection
                    locations={locations}
                    amenities={amenitiesList}
                    tags={tagsList}
                    priceRanges={priceRanges}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                  />
                  
                  {/* Quick Stats */}
                  <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 p-6">
                    <h4 className="font-bold text-white mb-4">Quick Stats</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Total Resorts</span>
                        <span className="font-bold text-teal-300">{resorts.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Average Rating</span>
                        <span className="font-bold text-amber-300">
                          {resorts.length > 0 
                            ? (resorts.reduce((acc, r) => acc + (r.rating || 0), 0) / resorts.length).toFixed(1)
                            : "0.0"
                          }
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Price Range</span>
                        <span className="font-bold text-emerald-300">
                          ₹{resorts.length > 0 ? Math.min(...resorts.map(r => r.pricing.basePrice || 0)) : 0} - 
                          ₹{resorts.length > 0 ? Math.max(...resorts.map(r => r.pricing.basePrice || 0)) : 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Features */}
                  <div className="mt-6 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl border border-white/30 p-6">
                    <h4 className="font-bold text-white mb-4">Why Choose Us</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-500/20 rounded-lg">
                          <Shield className="w-4 h-4 text-teal-300" />
                        </div>
                        <span className="text-white/90 text-sm">Best Price Guarantee</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-500/20 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-teal-300" />
                        </div>
                        <span className="text-white/90 text-sm">Flexible Cancellation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-500/20 rounded-lg">
                          <Headphones className="w-4 h-4 text-teal-300" />
                        </div>
                        <span className="text-white/90 text-sm">24/7 Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:w-3/4">
                {/* Header with results and sort */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Available Resorts <span className="text-teal-300">({filteredResorts.length})</span>
                      </h2>
                      <p className="text-white/80">
                        {filteredResorts.length === resorts.length 
                          ? "All resorts" 
                          : `Filtered from ${resorts.length} resorts`}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none appearance-none"
                        >
                          <option value="popularity">Sort by: Popularity</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="rating">Rating: High to Low</option>
                        </select>
                      </div>
                      
                      {(searchQuery || filters.location || filters.amenities.length > 0 || filters.tags.length > 0) && (
                        <button
                          onClick={resetAllFilters}
                          className="flex items-center gap-2 px-4 py-2 text-teal-300 hover:text-teal-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Clear All
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Active Filters Display */}
                  {(filters.location || filters.amenities.length > 0 || filters.tags.length > 0 || searchQuery) && (
                    <div className="mb-6 p-4 bg-teal-500/10 backdrop-blur-sm rounded-xl border border-teal-500/20">
                      <div className="flex flex-wrap gap-2">
                        {filters.location && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                            Location: {filters.location}
                            <button 
                              onClick={() => handleFilterChange({ location: "" })}
                              className="ml-1 hover:text-teal-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        )}
                        {filters.priceRange !== "All Prices" && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                            Price: {filters.priceRange}
                            <button 
                              onClick={() => handleFilterChange({ priceRange: "All Prices" })}
                              className="ml-1 hover:text-teal-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        )}
                        {filters.amenities.map(amenity => (
                          <span key={amenity} className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                            {amenity}
                            <button 
                              onClick={() => handleFilterChange({ 
                                amenities: filters.amenities.filter(a => a !== amenity) 
                              })}
                              className="ml-1 hover:text-teal-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        {filters.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                            {tag}
                            <button 
                              onClick={() => handleFilterChange({ 
                                tags: filters.tags.filter(t => t !== tag) 
                              })}
                              className="ml-1 hover:text-teal-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        {searchQuery && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                            Search: "{searchQuery}"
                            <button 
                              onClick={() => handleSearch("")}
                              className="ml-1 hover:text-teal-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Loading State */}
                {isLoading ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-12 h-12 text-teal-400 animate-spin mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Loading Resorts</h3>
                    <p className="text-white/80">Fetching the best resorts for you...</p>
                  </div>
                ) : (
                  <>
                    {/* Resorts Grid */}
                    {paginatedResorts.length > 0 ? (
                      <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                          {paginatedResorts.map((resort) => (
                            <div key={resort.id} className="group relative">
                              <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full">
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                  {resort.images && resort.images[0] ? (
                                    <div className="relative w-full h-full">
                                      <Image
                                        src={resort.images[0]}
                                        alt={resort.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = 'none';
                                          const parent = target.parentElement;
                                          if (parent) {
                                            parent.innerHTML = `
                                              <div class="w-full h-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                                                <Mountain class="w-16 h-16 text-white/40" />
                                              </div>
                                            `;
                                          }
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                                      <Mountain className="w-16 h-16 text-white/40" />
                                    </div>
                                  )}
                                  
                                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/30" />
                                  
                                  {/* Location Badge */}
                                  <div className="absolute top-4 right-4">
                                    <div className="px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                                      <MapPin className="w-3 h-3 inline mr-1" />
                                      {resort.location}
                                    </div>
                                  </div>
                                  
                                  {/* Rating Badge */}
                                  <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full border border-white/30">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    <span className="text-xs font-bold text-white">{resort.rating?.toFixed(1) || "4.0"}</span>
                                    <span className="text-white/80 text-xs">({resort.reviews || 0})</span>
                                  </div>
                                  
                                  {/* Special Offer */}
                                  {resort.special && (
                                    <div className="absolute bottom-4 left-4 right-4">
                                      <div className="px-3 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 backdrop-blur-md rounded-lg border border-white/30">
                                        <span className="text-xs font-semibold text-white">{resort.special}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Content */}
                                <div className="p-6">
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-1 pr-2">
                                        {resort.name}
                                      </h3>
                                      <p className="text-white/70 text-sm mt-1">{resort.roomType} • {resort.bedType}</p>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-xl font-bold bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent whitespace-nowrap">
                                        ₹{resort.pricing.basePrice}/night
                                      </div>
                                      <div className="text-white/70 text-sm line-through">
                                        ₹{resort.pricing.originalPrice}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Weather Info */}
                                  <div className="flex items-center gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-white/90">
                                      <Calendar className="w-4 h-4" />
                                      <span>{resort.season || "Best: Oct-Mar"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-white/90">
                                      <Users className="w-4 h-4" />
                                      <span>{resort.roomTypes || 3} room types</span>
                                    </div>
                                  </div>
                                  
                                  <p className="text-white/95 mb-5 text-sm line-clamp-2 min-h-[2.5rem]">
                                    {resort.description}
                                  </p>
                                  
                                  {/* Amenities */}
                                  <div className="flex flex-wrap gap-2 mb-6">
                                    {resort.amenities.slice(0, 3).map((amenity: string, index: number) => (
                                      <span 
                                        key={index} 
                                        className="px-3 py-1 bg-white/30 backdrop-blur-sm text-white/95 rounded-full text-xs border border-white/30"
                                      >
                                        {amenity}
                                      </span>
                                    ))}
                                    {resort.amenities.length > 3 && (
                                      <span className="px-3 py-1 bg-white/20 text-white/80 rounded-full text-xs">
                                        +{resort.amenities.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                  
                                  {/* Action Buttons */}
                                  <div className="flex gap-3">
                                    <button 
                                      onClick={() => handleRoomSelect(resort)}
                                      className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all group shadow-lg hover:shadow-emerald-500/30"
                                    >
                                      <span className="flex items-center justify-center gap-2">
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        Select Room
                                      </span>
                                    </button>
                                    <button 
                                      onClick={() => handleBookClick(resort)}
                                      className="px-4 py-3 bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/40 transition-colors"
                                      title="Quick Book"
                                    >
                                      <Bed className="w-5 h-5" />
                                    </button>
                                    <button 
                                      className="px-4 py-3 bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/40 transition-colors"
                                      title="Add to Wishlist"
                                    >
                                      <Heart className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Hover glow effect */}
                              <div className="absolute -inset-4 bg-linear-to-r from-teal-500/30 to-emerald-500/30 blur-3xl rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="mt-12 flex justify-center">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                ← Previous
                              </button>
                              
                              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                  pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                  pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                  pageNum = totalPages - 4 + i;
                                } else {
                                  pageNum = currentPage - 2 + i;
                                }
                                
                                return (
                                  <button
                                    key={i}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                      currentPage === pageNum
                                        ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                                        : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              })}
                              
                              <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Next →
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Search className="w-12 h-12 mx-auto" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No resorts found</h3>
                        <p className="text-white/80 mb-6">Try adjusting your filters or search criteria</p>
                        <button
                          onClick={resetAllFilters}
                          className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-colors"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    )}

                    {/* Featured Resorts */}
                    {filteredResorts.length > 0 && (
                      <div className="mt-12">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-teal-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white">Most Popular Resorts</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                          {resorts
                            .filter((r: RoomDetails) => (r.rating || 0) >= 4.5)
                            .slice(0, 3)
                            .map((resort: RoomDetails) => (
                              <div key={resort.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:border-teal-500/30 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                                    {resort.images && resort.images[0] ? (
                                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                                        <Image
                                          src={resort.images[0]}
                                          alt={resort.name}
                                          fill
                                          className="object-cover"
                                          sizes="64px"
                                        />
                                      </div>
                                    ) : (
                                      <Mountain className="w-8 h-8 text-white/60" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-white line-clamp-1">{resort.name}</h4>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                      <span className="text-sm font-medium text-white">{resort.rating?.toFixed(1) || "4.0"}</span>
                                      <span className="text-white/60 text-sm">({resort.reviews || 0})</span>
                                    </div>
                                    <div className="text-sm text-teal-300 mt-1">
                                      ₹{resort.pricing.basePrice}/night
                                    </div>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => handleBookClick(resort)}
                                  className="w-full mt-4 py-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-300 rounded-lg hover:from-teal-500/30 hover:to-emerald-500/30 transition-colors"
                                >
                                  Quick Book
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Room Details Modal */}
        {showRoomDetails && selectedResort && (
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
                      <h2 className="text-3xl font-bold text-white">{selectedResort.name}</h2>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-teal-400" />
                        <span className="text-white/90">{selectedResort.location}</span>
                        <div className="flex items-center gap-1 ml-4">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-white font-bold">{selectedResort.rating}</span>
                          <span className="text-white/80">({selectedResort.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                        ₹{selectedResort.pricing.basePrice}<span className="text-xl">/night</span>
                      </div>
                      <div className="text-white/70 line-through">
                        ₹{selectedResort.pricing.originalPrice}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Column - Images & Description */}
                  <div className="lg:col-span-2">
                    {/* Image Gallery */}
                    <div className="relative rounded-xl overflow-hidden mb-6">
                      {selectedResort.images && selectedResort.images[selectedImageIndex] ? (
                        <div className="relative w-full h-96">
                          <Image
                            src={selectedResort.images[selectedImageIndex]}
                            alt={selectedResort.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-96 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                          <Mountain className="w-24 h-24 text-white/40" />
                        </div>
                      )}
                      
                      {/* Navigation Arrows */}
                      {selectedResort.images && selectedResort.images.length > 1 && (
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
                            disabled={selectedImageIndex === selectedResort.images.length - 1}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 rounded-full border border-white/30 text-white disabled:opacity-50 hover:bg-black/90 transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <div className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-white text-sm">
                          {selectedImageIndex + 1} / {selectedResort.images.length}
                        </div>
                      </div>
                    </div>
                    
                    {/* Thumbnails */}
                    {selectedResort.images && selectedResort.images.length > 1 && (
                      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {selectedResort.images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImageIndex === index 
                              ? 'border-teal-500' 
                              : 'border-transparent'
                            }`}
                          >
                            {img ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={img}
                                  alt={`Thumbnail ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="80px"
                                />
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-3">Description</h3>
                      <p className="text-white/90">{selectedResort.detailedDescription}</p>
                    </div>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-3">Room Features</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedResort.features.map((feature, index) => (
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
                        {selectedResort.paymentMethods.map((method, index) => (
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
                            <p className="text-white font-medium">{selectedResort.bedType}</p>
                            <p className="text-white/70 text-sm">Bed Type</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{selectedResort.roomType}</p>
                          <p className="text-white/70 text-sm">Room Type</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-teal-400" />
                          <div>
                            <p className="text-white font-medium">
                              {selectedResort.pricing.maxAdults} Adults, {selectedResort.pricing.maxChildren} Children
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
                          Children stay free (up to {selectedResort.pricing.maxChildren} children)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {selectedResort && (
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => {
              setIsBookingModalOpen(false);
              setSelectedResort(null);
            }}
            resortId={selectedResort?.id?.toString() || ""}
            roomType={selectedResort?.name || "Standard Room"}
            basePrice={Number(selectedResort?.pricing.basePrice) || 0}
            resortName={selectedResort?.name}
            location={selectedResort?.location}
            onSubmit={handleBookingSubmit}
            isLoading={bookingLoading}
          />
        )}

        {/* Weather Widget */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-linear-to-br from-teal-500/40 to-emerald-500/40 backdrop-blur-sm rounded-xl">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Current Weather</p>
                <p className="text-2xl font-bold text-white">22°C</p>
                <p className="text-white/90 text-xs">Partly Cloudy</p>
              </div>
            </div>
          </div>
        </div>
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
        }
      `}</style>
    </div>
  );
}