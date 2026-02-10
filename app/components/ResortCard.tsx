// app/components/ResortCard.tsx - Simplified version
"use client";

import { 
  MapPin, 
  Star, 
  Bed, 
  Eye
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface ResortCardProps {
  resort: any;
  onBookClick?: (resort: any) => void;
}

export default function ResortCard({ resort, onBookClick }: ResortCardProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick(resort);
    } else {
      if (!isLoggedIn) {
        toast.error("Please sign in to book a resort");
        router.push("/signin");
        return;
      }
      router.push(`/booking?resort=${resort.id}`);
    }
  };

  return (
    <div className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
          <div className="text-4xl">🏔️</div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/30" />
        
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
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-1">
            {resort.name}
          </h3>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
            {resort.price || `₹${resort.priceNumber || 0}/night`}
          </span>
        </div>
        
        <p className="text-white/95 mb-5 text-sm line-clamp-2">
          {resort.description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handleBookClick}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all group shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <Bed className="w-4 h-4" />
              Book Now
            </span>
          </button>
          <button 
            onClick={() => router.push(`/resorts/${resort.id}`)}
            className="px-4 py-3 bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/40 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}