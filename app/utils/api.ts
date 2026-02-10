const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BookingData {
  resortId: string;
  resortName: string;
  roomType: string;
  location: string;
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
  basePrice: number;
  totalAmount: number;
  priceBreakdown?: {
    basePrice: number;
    extraAdultsCharge: number;
    nights: number;
    rooms: number;
    subtotal: number;
    gst: number;
    totalAmount: number;
  };
}

// Generic fetch wrapper
export async function fetchAPI<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: `HTTP error! status: ${response.status}` };
      }
      
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Booking API functions
export const bookingAPI = {
  createBooking: async (bookingData: BookingData) => {
    return fetchAPI('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  checkAvailability: async (params: Record<string, any>) => {
    const queryParams = new URLSearchParams(params).toString();
    return fetchAPI(`/bookings/check/availability?${queryParams}`);
  },
};

// Resort API functions
export const resortAPI = {
  // Get all resorts
  getAllResorts: async (filters: Record<string, any> = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return fetchAPI(`/resorts?${queryParams}`);
  },

  // Get resort by ID
  getResortById: async (resortId: string | number) => {
    return fetchAPI(`/resorts/${resortId}`);
  },
};