import TouristNavbar from "../../components/Navbar";
import { 
  MapPin, 
  Star, 
  Bed, 
  Wifi, 
  Car, 
  Utensils, 
  Waves,
  Users,
  CheckCircle,
  Share2,
  Heart,
  Calendar,
  Phone,
  MessageCircle,
  Camera,
  Coffee,
  Trees,
  Mountain,
  Clock
} from "lucide-react";

// Mock data - in real app, this would come from API
const resortData = {
  id: 1,
  name: "Valparai Emerald Resort & Spa",
  location: "Valparai",
  rating: 4.9,
  reviews: 245,
  price: "₹4,800/night",
  images: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600",
  ],
  description: "Experience luxury amidst sprawling tea estates with panoramic views of Anamalai hills. Our 5-star resort offers world-class amenities, fine dining, and personalized services for an unforgettable stay.",
  
  amenities: [
    { icon: <Wifi />, name: "Free High-Speed WiFi" },
    { icon: <Waves />, name: "Infinity Pool" },
    { icon: <Utensils />, name: "Multi-cuisine Restaurant" },
    { icon: <Car />, name: "Free Parking" },
    { icon: <Coffee />, name: "Coffee Shop" },
    { icon: <Trees />, name: "Garden" },
  ],

  roomTypes: [
    { 
      type: "Deluxe Room", 
      price: "₹4,800", 
      size: "400 sq.ft", 
      capacity: "2 Adults", 
      features: ["Mountain View", "King Bed", "Balcony"],
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800"
    },
    { 
      type: "Premium Suite", 
      price: "₹6,500", 
      size: "600 sq.ft", 
      capacity: "2 Adults + 1 Child", 
      features: ["Panoramic View", "Living Area", "Bathtub"],
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800"
    },
    { 
      type: "Family Villa", 
      price: "₹8,500", 
      size: "800 sq.ft", 
      capacity: "4 Adults", 
      features: ["Private Garden", "2 Bedrooms", "Kitchenette"],
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800"
    },
  ],

  nearbyAttractions: [
    { name: "Tea Plantation Tour", distance: "5 km", duration: "2 hours" },
    { name: "Sholayar Dam", distance: "15 km", duration: "30 mins" },
    { name: "Anamalai Tiger Reserve", distance: "25 km", duration: "1 hour" },
    { name: "Monkey Falls", distance: "10 km", duration: "20 mins" },
  ],

  services: [
    "24/7 Room Service",
    "Airport Transfer",
    "Guided Tours",
    "Spa & Wellness Center",
    "Laundry Service",
    "Business Center",
  ],

  policies: {
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    cancellation: "Free cancellation 7 days before check-in",
    children: "Children under 12 stay free",
    pets: "Pet-friendly (additional charges apply)",
  }
};

export default function ResortDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-emerald-50">
      <TouristNavbar initialTransparent={false} />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-teal-600">Home</a>
          <span>→</span>
          <a href="/resorts" className="hover:text-teal-600">Resorts</a>
          <span>→</span>
          <span className="text-gray-900">{resortData.name}</span>
        </div>

        {/* Resort Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{resortData.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span className="text-gray-600">{resortData.location}</span>
                <div className="flex items-center gap-1 ml-4">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{resortData.rating}</span>
                  <span className="text-gray-500">({resortData.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 border border-gray-300 rounded-lg">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2">
            <img 
              src={resortData.images[0]} 
              alt="Main" 
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
          {resortData.images.slice(1, 4).map((img, index) => (
            <div key={index}>
              <img 
                src={img} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Resort</h2>
              <p className="text-gray-600 mb-6">{resortData.description}</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {resortData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <div className="text-teal-600">{amenity.icon}</div>
                    </div>
                    <span className="text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Types */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Types</h2>
              <div className="space-y-6">
                {resortData.roomTypes.map((room, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <img src={room.image} alt={room.type} className="w-full h-48 object-cover rounded-lg" />
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{room.type}</h3>
                            <div className="text-gray-600 mt-1">{room.size} • {room.capacity}</div>
                          </div>
                          <div className="text-2xl font-bold text-teal-600">{room.price}/night</div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.features.map((feature, idx) => (
                            <span key={idx} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                          Select Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Attractions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Tourist Spots</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {resortData.nearbyAttractions.map((spot, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{spot.name}</h3>
                      <div className="text-teal-600 font-medium">{spot.distance}</div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{spot.duration} drive</span>
                    </div>
                    <button className="w-full mt-3 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50">
                      Book Tour
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {resortData.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking & Policies */}
          <div className="space-y-6">
            {/* Booking Widget */}
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <div className="text-3xl font-bold text-teal-600 mb-2">{resortData.price}</div>
              <div className="text-gray-600 mb-6">per night (excluding taxes)</div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="date" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="date" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:from-teal-700 hover:to-emerald-700">
                Book Now
              </button>
              
              <div className="mt-4 text-center text-gray-600 text-sm">
                <CheckCircle className="w-4 h-4 inline mr-1 text-teal-600" />
                Free cancellation available
              </div>
            </div>

            {/* Resort Policies */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resort Policies</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-700">Check-in / Check-out</div>
                  <div className="text-gray-600">{resortData.policies.checkIn} / {resortData.policies.checkOut}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Cancellation Policy</div>
                  <div className="text-gray-600">{resortData.policies.cancellation}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Children Policy</div>
                  <div className="text-gray-600">{resortData.policies.children}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Pet Policy</div>
                  <div className="text-gray-600">{resortData.policies.pets}</div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/20 rounded-lg hover:bg-white/30">
                  <Phone className="w-5 h-5" />
                  Call Resort
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/20 rounded-lg hover:bg-white/30">
                  <MessageCircle className="w-5 h-5" />
                  Chat with Us
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/20 rounded-lg hover:bg-white/30">
                  <Camera className="w-5 h-5" />
                  Virtual Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}