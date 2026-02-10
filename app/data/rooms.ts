// app/data/rooms.ts
export interface RoomType {
  id: string;
  name: string;
  description: string;
  basePrice: number; // Price for 2 adults
  maxAdults: number;
  extraAdultCharge: number; // Per extra adult per night
  childPolicy: string;
  amenities: string[];
  features: string[];
  images: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export const roomTypes: RoomType[] = [
  {
    id: "deluxe",
    name: "Deluxe Family Room",
    description: "Spacious room with mountain view, perfect for families",
    basePrice: 2603, // Price for 2 adults
    maxAdults: 4,
    extraAdultCharge: 800, // Per extra adult per night
    childPolicy: "Children under 5 stay free. Extra bed: ₹500/night",
    amenities: ["WiFi", "TV", "AC", "Balcony", "Bathroom", "Mineral Water"],
    features: ["Mountain View", "Breakfast Included", "Free Parking"],
    images: ["/room1.jpg", "/room2.jpg"],
    location: {
      lat: 10.3096,
      lng: 76.9375,
      address: "Sholayar Dam Road, Valparai"
    }
  },
  {
    id: "deluxe-balcony",
    name: "Deluxe Family Room (With Balcony)",
    description: "Premium room with private balcony overlooking tea gardens",
    basePrice: 2982, // Price for 2 adults
    maxAdults: 5,
    extraAdultCharge: 900,
    childPolicy: "Children under 5 stay free. Extra bed: ₹600/night",
    amenities: ["WiFi", "TV", "AC", "Private Balcony", "Minibar", "Sofa"],
    features: ["Garden View", "Breakfast Included", "Spa Access"],
    images: ["/room2.jpg", "/room3.jpg"],
    location: {
      lat: 10.3120,
      lng: 76.9382,
      address: "Tea Estate Road, Valparai"
    }
  },
  {
    id: "premium-suite",
    name: "Premium Suite",
    description: "Luxury suite with separate living area",
    basePrice: 4500,
    maxAdults: 3,
    extraAdultCharge: 1200,
    childPolicy: "Children under 5 stay free. Extra bed: ₹800/night",
    amenities: ["WiFi", "Smart TV", "AC", "Kitchenette", "Jacuzzi"],
    features: ["Panoramic View", "Butler Service", "All Meals"],
    images: ["/suite1.jpg"],
    location: {
      lat: 10.3105,
      lng: 76.9401,
      address: "Hill Top Road, Valparai"
    }
  }
];