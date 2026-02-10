import { ReactNode } from "react";

// Booking Types
export interface BookingData {
  resortId: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    notes?: string;
  };
  totalAmount: number;
  priceBreakdown?: {
    basePrice: number;
    extraAdultsCharge: number;
    extraChildrenCharge: number;
    nights: number;
    rooms: number;
    subtotal: number;
    gst: number;
    totalAmount: number;
  };
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  maxCapacity: {
    adults: number;
    children: number;
  };
  extraAdultCharge: number;
  extraChildCharge: number;
  amenities: string[];
  features: string[];
  images: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface ResortType {
  id: string | number;
  name: string;
  location: string;
  price: string;
  priceNumber: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  description: string;
  rooms: string[];
  tags: string[];
  distance: string;
  weather: string;
  season: string;
  special: string;
}

// Email Template Types
export interface EmailTemplateData {
  booking: BookingData;
  room?: RoomType;
  resort?: ResortType;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  total?: number;
  bookingId?: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  template: 'booking-confirmation' | 'admin-notification' | 'cancellation';
  data: EmailTemplateData;
}

export interface BlogPost {
  excerpt: ReactNode;
  category: ReactNode;
  readTime: ReactNode;
  image: string | Blob | undefined;
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  tags?: string[];
}