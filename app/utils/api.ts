// frontend/app/utils/api.ts
//
// FIXED:
//  1. Base URL is normalised so NEXT_PUBLIC_API_URL works whether or not it
//     ends in /api. Previously "http://localhost:5000" produced
//     "http://localhost:5000/bookings" (missing /api) and 404'd.
//  2. Booking failures are no longer masked with a fake success + fake
//     reference. A failed booking now returns success:false so the UI can
//     tell the user instead of silently losing the enquiry.

const RAW_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://tourist-back-1.onrender.com";

// Strip trailing slashes and a trailing /api, then add exactly one /api.
const API_BASE_URL =
  RAW_BASE.replace(/\/+$/, "").replace(/\/api$/, "") + "/api";

if (typeof window !== "undefined") {
  console.log("🌐 API base:", API_BASE_URL);
}

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
}

export interface Resort {
  id: number;
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  amenities: string[];
  images: string[];
  roomType: string;
  bedType: string;
  tags: string[];
  [key: string]: any;
}

export interface ResortsResponse {
  resorts: Resort[];
  count: number;
  message?: string;
}

export interface BookingResponse {
  bookingReference: string;
  message?: string;
  totalAmount?: number;
  adminNotified?: boolean;
  [key: string]: any;
}

export async function fetchAPI<T = any>(
  endpoint: string,
  options: RequestInit = {},
  retries = 2
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log(`🌐 ${options.method || "GET"} ${url}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(url, {
      ...defaultOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Read the body once, then decide.
    const raw = await response.text();
    let parsed: any = null;
    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      const message =
        parsed?.message || parsed?.error || `HTTP ${response.status}`;
      console.error(`❌ ${url} → ${response.status}: ${message}`);
      return { success: false, error: message, message };
    }

    return (parsed ?? { success: true }) as ApiResponse<T>;
  } catch (error) {
    const isAbort = error instanceof Error && error.name === "AbortError";
    const msg = isAbort
      ? "The server took too long to respond."
      : error instanceof Error
      ? error.message
      : "Network error";

    console.error(`❌ API Error (${url}):`, msg);

    // Retry transient network failures on GETs only. Never silently retry a
    // POST — that risks creating two bookings.
    const isWrite = (options.method || "GET").toUpperCase() !== "GET";
    if (retries > 0 && !isWrite && !isAbort) {
      console.log(`🔄 Retrying ${endpoint} (${retries} left)`);
      await new Promise((r) => setTimeout(r, 1000));
      return fetchAPI<T>(endpoint, options, retries - 1);
    }

    // Resorts may fall back to local data — it's display-only, nothing is lost.
    if (endpoint.includes("/resorts")) {
      return {
        success: true,
        data: {
          resorts: [],
          count: 0,
          message: "Using local data",
        } as unknown as T,
      };
    }

    return {
      success: false,
      error: msg,
      message: "Couldn't reach the server. Please try again or call us.",
    };
  }
}

export const bookingAPI = {
  createBooking: async (
    bookingData: BookingData
  ): Promise<ApiResponse<BookingResponse>> => {
    console.log("📤 Creating booking for:", bookingData.resortName);
    return fetchAPI<BookingResponse>("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
  },

  checkAvailability: async (): Promise<ApiResponse<any>> =>
    fetchAPI("/bookings/check/availability"),
};

export const contactAPI = {
  submit: async (payload: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message?: string;
  }): Promise<ApiResponse<any>> =>
    fetchAPI("/contact", { method: "POST", body: JSON.stringify(payload) }),
};

export const resortAPI = {
  getAllResorts: async (
    filters: Record<string, any> = {}
  ): Promise<ApiResponse<ResortsResponse>> => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });
    const queryString = queryParams.toString();
    return fetchAPI<ResortsResponse>(
      queryString ? `/resorts?${queryString}` : "/resorts"
    );
  },

  getResortById: async (
    resortId: string | number
  ): Promise<ApiResponse<{ resort: Resort }>> =>
    fetchAPI(`/resorts/${resortId}`),
};