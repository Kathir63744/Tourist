// app/data/tourPackages.ts

export type PackageId = "1n2d" | "2n3d" | "4n5d";

export interface TourPackage {
  id: PackageId;
  nights: number;
  days: number;
  duration: string;
  title: string;
  badge?: string;
  destinations: string[];
  price: number;
  featured?: boolean;
  blurb: string;
  highlights: string[];
}

export interface AttractionGroup {
  id: string;
  label: string;
  places: string[];
}

export interface ChildPolicyRow {
  range: string;
  rule: string;
  rate: number;
}

export const PARTNER = {
  name: "Zoy Tours",
  tagline: "Discover the Beauty of the Western Ghats",
  subline:
    "Explore Ooty, Valparai & Athirappilly with Comfort, Safety & Great Hospitality",
  // TODO: replace with the real numbers before deploy
  whatsapp: "919000000000",
  phone: "+91 90000 00000",
} as const;

export const PACKAGES: TourPackage[] = [
  {
    id: "1n2d",
    nights: 1,
    days: 2,
    duration: "1 Night / 2 Days",
    title: "Valparai or Ooty",
    destinations: ["Valparai", "Ooty"],
    price: 2950,
    blurb:
      "A short, well-paced first taste of the hills — pickup, sightseeing, stay and meals handled end to end.",
    highlights: [
      "Pickup from Coimbatore or Pollachi (Valparai)",
      "Pickup from Coimbatore or Mettupalayam (Ooty)",
      "Private transportation",
      "Standard/Deluxe accommodation",
      "Professional tour guide",
      "Sightseeing",
      "All meals included",
    ],
  },
  {
    id: "2n3d",
    nights: 2,
    days: 3,
    duration: "2 Nights / 3 Days",
    title: "Valparai or Ooty",
    destinations: ["Valparai", "Ooty"],
    price: 4950,
    blurb:
      "Enjoy a relaxed holiday with additional sightseeing, more leisure time, and comfortable accommodation while exploring the scenic beauty of the Nilgiris and Anamalai Hills.",
    highlights: [
      "Everything in the 1 Night / 2 Days package",
      "Extended sightseeing across both days",
      "More leisure time between viewpoints",
      "Standard/Deluxe accommodation for two nights",
      "Private transportation throughout",
      "All meals included",
    ],
  },
  {
    id: "4n5d",
    nights: 4,
    days: 5,
    duration: "4 Nights / 5 Days",
    title: "Ooty + Valparai + Athirappilly",
    badge: "Grand Package",
    destinations: ["Ooty + Valparai + Athirappilly"],
    price: 9999,
    featured: true,
    blurb:
      "Experience the best of South India's hill stations and waterfalls in one unforgettable journey.",
    highlights: [
      "Three destinations in one continuous route",
      "Nilgiris, Anamalai Hills and the Chalakudy waterfalls",
      "Standard/Deluxe accommodation for four nights",
      "Private transportation throughout",
      "Professional driver and tour guide",
      "All meals included",
    ],
  },
];

export const ATTRACTIONS: AttractionGroup[] = [
  {
    id: "valparai",
    label: "Valparai & Athirappilly",
    places: [
      "Aliyar Dam",
      "Monkey Falls",
      "40 Hairpin Bends",
      "Loam's View Point",
      "Nallamudi View Point",
      "Tea Estates",
      "Balaji Temple",
      "Hornbill View Point (Attakatti)",
      "Sholayar Dam",
      "Thalanar View Point",
      "Chinnakallar",
      "Athirappilly Waterfalls",
      "Vazhachal Waterfalls",
      "Charpa Waterfalls",
      "Malakkappara",
    ],
  },
  {
    id: "ooty",
    label: "Ooty",
    places: [
      "Botanical Garden",
      "Rose Garden",
      "Doddabetta Peak",
      "Tea Factory & Tea Museum",
      "Ooty Lake",
      "Pine Forest",
      "Shooting Point",
      "Pykara Lake",
      "Pykara Waterfalls",
      "Wenlock Downs",
      "Emerald Lake",
      "Avalanche",
      "Coonoor",
      "Sim's Park",
      "Dolphin's Nose",
      "Lamb's Rock",
      "Tea Gardens",
    ],
  },
];

export const INCLUSIONS: string[] = [
  "Standard or Deluxe accommodation (4-sharing basis)",
  "Private Cab / SUV / Tempo Traveller / Coach Bus",
  "Pickup & Drop",
  "Professional Driver",
  "Professional Tour Guide",
  "Welcome Drink",
  "Vegetarian Breakfast",
  "Vegetarian & Non-Vegetarian Lunch",
  "Vegetarian & Non-Vegetarian Dinner",
  "Evening Tea & Snacks",
  "Fuel Charges",
  "Toll Charges",
  "Parking Charges",
  "Driver Allowance",
  "Sightseeing as per itinerary",
  "Vehicle Taxes",
];

export const EXCLUSIONS: string[] = [
  "Entry tickets to tourist attractions",
  "Boating & Safari charges",
  "Adventure activities",
  "Camera fees",
  "Personal expenses",
  "Laundry & Room Service",
  "Shopping expenses",
  "Travel Insurance",
  "Medical expenses",
  "Expenses arising due to weather, landslides, road closures, strikes, or other unforeseen circumstances",
  'Anything not mentioned under "Package Inclusions"',
];

export const CHILD_POLICY: ChildPolicyRow[] = [
  {
    range: "Below 4 years",
    rule: "Complimentary (without separate bed/seat)",
    rate: 0,
  },
  { range: "4 to 8 years", rule: "60% of the adult package cost", rate: 0.6 },
  { range: "8 years and above", rule: "Full adult charges", rate: 1 },
];

export const HOTEL_POLICY = {
  checkIn: "12:00 PM",
  checkOut: "11:00 AM",
  note: "Room allocation is on a 4-sharing basis. Double and triple occupancy can be arranged at additional cost, subject to availability.",
} as const;

export const GOOD_FOR: string[] = [
  "Families",
  "Couples",
  "Friends",
  "Corporate Tours",
  "School & College Trips",
  "Pilgrimage Groups",
  "Adventure Enthusiasts",
];

export const WHY_US: string[] = [
  "Carefully planned itineraries",
  "Comfortable and hygienic accommodation",
  "Delicious home-style meals",
  "Experienced local guides",
  "Safe and reliable transportation",
  "Transparent pricing with no hidden charges",
  "Suitable for groups of 5 to 100+ guests",
];