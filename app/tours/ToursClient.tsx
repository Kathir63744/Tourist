"use client";

import TouristNavbar from "../components/Navbar";
import { useState } from "react";
import { 
  Compass, 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Calendar,
  Car,
  Camera,
  Coffee,
  Trees,
  Mountain,
  Filter,
  TrendingUp
} from "lucide-react";

const tourPackages = [
  {
    id: 1,
    title: "Tea Plantation Experience",
    location: "Valparai",
    duration: "4 hours",
    price: "₹1,500",
    rating: 4.8,
    description: "Guided tour of tea gardens with tea tasting session",
    includes: ["Transport", "Guide", "Tea Tasting", "Refreshments"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800"
  },
  {
    id: 2,
    title: "Forest Trekking Adventure",
    location: "Solaiyur",
    duration: "6 hours",
    price: "₹2,000",
    rating: 4.9,
    description: "Professional guided trek through dense forests with wildlife spotting",
    includes: ["Guide", "Equipment", "Snacks", "First Aid"],
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800"
  },
  {
    id: 3,
    title: "Waterfall Exploration",
    location: "Kothagiri",
    duration: "5 hours",
    price: "₹1,800",
    rating: 4.7,
    description: "Visit multiple waterfalls including Catherine Falls",
    includes: ["Transport", "Guide", "Entry Fees", "Lunch"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800"
  },
  {
    id: 4,
    title: "Wildlife Safari",
    location: "Valparai",
    duration: "Full Day",
    price: "₹3,500",
    rating: 4.9,
    description: "Safari through Anamalai Tiger Reserve with expert naturalist",
    includes: ["Safari Jeep", "Naturalist", "Breakfast", "Lunch"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800"
  },
  {
    id: 5,
    title: "Cultural Village Tour",
    location: "Solaiyur",
    duration: "3 hours",
    price: "₹1,200",
    rating: 4.6,
    description: "Visit tribal villages and learn about local culture",
    includes: ["Guide", "Transport", "Cultural Show", "Tea"],
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800"
  },
  {
    id: 6,
    title: "Sunrise Viewing Tour",
    location: "Kothagiri",
    duration: "3 hours",
    price: "₹1,000",
    rating: 4.8,
    description: "Early morning tour to scenic viewpoints for sunrise",
    includes: ["Transport", "Guide", "Breakfast", "Blankets"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800"
  }
];

const tourTypes = ["All Tours", "Adventure", "Cultural", "Wildlife", "Photography", "Relaxation"];

export default function ToursPage() {
  const [selectedType, setSelectedType] = useState("All Tours");

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-emerald-50">
      <TouristNavbar initialTransparent={false} />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000" 
          alt="Tours"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Tour <span className="text-teal-300">Packages</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Explore curated tours around Valparai, Solaiyur, and Kothagiri
            </p>
          </div>
        </div>
      </div>

      <section className="py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tour Type Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {tourTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedType === type
                    ? "bg-teal-600 text-white"
                    : "bg-white text-teal-600 border border-teal-200 hover:bg-teal-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Featured Tours */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Most Popular Tours</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {tourPackages.slice(0, 3).map((tour) => (
                <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{tour.title}</h3>
                      <div className="text-2xl font-bold text-teal-600">{tour.price}</div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {tour.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        {tour.rating}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{tour.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Includes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tour.includes.map((item, idx) => (
                          <span key={idx} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                      Book This Tour
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Tours */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Compass className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">All Available Tours</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tourPackages.map((tour) => (
                <div key={tour.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-900">{tour.title}</h3>
                      <div className="text-xl font-bold text-teal-600">{tour.price}</div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {tour.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tour.duration}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                    
                    <button className="w-full py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Tour */}
          <div className="mt-12 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-10 text-white">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">Need a Custom Tour?</h3>
              <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
                We can create personalized tours based on your interests, group size, and schedule
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">24+</div>
                  <div className="text-teal-100">Tour Options</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-teal-100">Certified Guides</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <div className="text-teal-100">Satisfaction Rate</div>
                </div>
              </div>
              <button className="mt-8 px-8 py-3 bg-white text-teal-600 font-bold rounded-full hover:bg-gray-100">
                Request Custom Tour
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}