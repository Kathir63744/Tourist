import TouristNavbar from "../components/Navbar";
import { 
  MapPin, 
  Mountain, 
  Trees, 
  Coffee, 
  Compass, 
  Cloud, 
  Thermometer,
  Wind,
  Droplets,
  Calendar,
  Users,
  Star,
  Camera,
  Car,
  Utensils,
  Footprints
} from "lucide-react";

const destinations = [
  {
    name: "Valparai",
    tagline: "Switzerland of South India",
    description: "A breathtaking hill station located in the Anaimalai Hills, known for its sprawling tea estates, dense forests, and abundant wildlife. Perfect for nature lovers and peace seekers.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600",
    highlights: [
      { icon: <Coffee />, text: "Tea Plantations" },
      { icon: <Mountain />, text: "Anamalai Range" },
      { icon: <Camera />, text: "Wildlife Photography" },
      { icon: <Cloud />, text: "Misty Valleys" }
    ],
    weather: { temp: "18-25°C", bestTime: "Oct-Mar", rainfall: "High" },
    resorts: 24,
    attractions: ["Sholayar Dam", "Aliyar Dam View", "Tea Museum", "Monkey Falls"],
    distance: "100km from Coimbatore"
  },
  {
    name: "Solaiyur",
    tagline: "Forest Paradise",
    description: "A hidden gem nestled in dense forests, offering pristine nature experiences, tribal culture, and untouched natural beauty. Ideal for adventure seekers and eco-tourists.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600",
    highlights: [
      { icon: <Trees />, text: "Dense Forests" },
      { icon: <Footprints />, text: "Trekking Trails" },
      { icon: <Wind />, text: "Fresh Air" },
      { icon: <Compass />, text: "Offbeat Destination" }
    ],
    weather: { temp: "16-22°C", bestTime: "Nov-Feb", rainfall: "Moderate" },
    resorts: 18,
    attractions: ["Forest Trails", "Tribal Villages", "Bird Watching", "Waterfalls"],
    distance: "85km from Coimbatore"
  },
  {
    name: "Kothagiri",
    tagline: "Colonial Hill Charm",
    description: "The least explored of the Nilgiri hill stations, known for its colonial heritage, panoramic views, and pleasant climate year-round. Perfect for heritage lovers.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600",
    highlights: [
      { icon: <Calendar />, text: "Colonial Heritage" },
      { icon: <Mountain />, text: "Nilgiri Views" },
      { icon: <Utensils />, text: "Local Cuisine" },
      { icon: <Car />, text: "Easy Access" }
    ],
    weather: { temp: "15-20°C", bestTime: "Year-round", rainfall: "Low" },
    resorts: 32,
    attractions: ["Catherine Falls", "Rangasamy Peak", "Tea Estates", "View Points"],
    distance: "70km from Coimbatore"
  }
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-emerald-50">
      <TouristNavbar initialTransparent={false} />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000" 
          alt="Destinations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Discover Our <span className="text-teal-300">Destinations</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Explore three distinct hill stations, each offering unique experiences 
              from misty tea estates to colonial charm
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
              <Compass className="w-4 h-4" />
              Explore Hill Stations
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Three Jewels of <span className="text-teal-600">Tamil Nadu</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Each destination offers a unique blend of natural beauty, cultural experiences, 
              and luxurious accommodations
            </p>
          </div>

          <div className="space-y-16">
            {destinations.map((destination, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-[400px] md:h-auto">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-900">
                        {destination.distance}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-10">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          {destination.name}
                        </h3>
                        <div className="flex items-center gap-2 text-teal-600">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{destination.tagline}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-gray-900">4.8</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {destination.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {destination.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="p-2 bg-teal-100 rounded-lg">
                            <div className="text-teal-600">{highlight.icon}</div>
                          </div>
                          <span className="font-medium text-gray-900">{highlight.text}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Weather & Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-teal-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Thermometer className="w-4 h-4 text-teal-600" />
                          <span className="text-sm text-gray-600">Temperature</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">{destination.weather.temp}</div>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm text-gray-600">Best Time</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">{destination.weather.bestTime}</div>
                      </div>
                      <div className="bg-cyan-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-cyan-600" />
                          <span className="text-sm text-gray-600">Resorts</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">{destination.resorts}+</div>
                      </div>
                    </div>
                    
                    {/* Attractions */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Top Attractions</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.attractions.map((attr, idx) => (
                          <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full mt-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all">
                      Explore {destination.name} Resorts
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Comparison Table */}
          <div className="mt-20 bg-white rounded-3xl p-10 shadow-xl">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">
              Destination <span className="text-teal-600">Comparison</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-gray-600">Feature</th>
                    <th className="text-center p-4 text-gray-900">Valparai</th>
                    <th className="text-center p-4 text-gray-900">Solaiyur</th>
                    <th className="text-center p-4 text-gray-900">Kothagiri</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 text-gray-600">Best For</td>
                    <td className="text-center p-4">Nature & Wildlife</td>
                    <td className="text-center p-4">Adventure & Trekking</td>
                    <td className="text-center p-4">Heritage & Relaxation</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 text-gray-600">Altitude</td>
                    <td className="text-center p-4">3,500 ft</td>
                    <td className="text-center p-4">4,200 ft</td>
                    <td className="text-center p-4">3,800 ft</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 text-gray-600">Rainfall</td>
                    <td className="text-center p-4">High</td>
                    <td className="text-center p-4">Moderate</td>
                    <td className="text-center p-4">Low</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-600">Accessibility</td>
                    <td className="text-center p-4">Moderate</td>
                    <td className="text-center p-4">Challenging</td>
                    <td className="text-center p-4">Easy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Ready for Your <span className="text-teal-600">Hill Adventure</span>?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our travel experts can help you choose the perfect destination based on 
              your preferences and create a customized itinerary
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg">
              Consult Our Experts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}