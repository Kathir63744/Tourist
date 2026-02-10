// app/components/LocationTabsSection.tsx
"use client";

import { useState, useEffect, JSX } from 'react';
import { MapPin, Cloud, Mountain, Coffee, Trees, Thermometer } from 'lucide-react';
import Image from 'next/image';

interface LocationData {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  weather: { temp: string; condition: string };
  icon: JSX.Element;
  color: string;
  resortsCount: number;
  bestSeason: string;
  altitude: string;
  nearestCity: string;
  travelTime: string;
  popularFor: string;
  tip: string;
  image: string;
}

const locations: Record<'valparai' | 'kothagiri', LocationData> = {
  valparai: {
    name: 'Valparai-Solaiyur',
    tagline: 'The Scotland of South India',
    description: 'Nestled in the Anamalai Hills, Valparai is known for its sprawling tea estates, misty mountains, and rich biodiversity. Experience the perfect blend of nature and luxury.',
    highlights: ['Tea Plantations', 'Sholayar Dam', 'Anamalai Tiger Reserve', 'Waterfalls', 'Wildlife Safari'],
    weather: { temp: '18-24°C', condition: 'Misty & Cool' },
    icon: <Coffee className="w-6 h-6" />,
    color: 'from-emerald-500/20 to-teal-500/20',
    resortsCount: 8,
    bestSeason: 'Oct - Mar',
    altitude: '3,500 - 5,000 ft',
    nearestCity: 'Coimbatore',
    travelTime: '3-4 hours',
    popularFor: 'Tea Tourism & Wildlife',
    tip: 'Visit during November for the tea harvesting season',
    image: '/val1.jpg' // Make sure this image exists in /public folder
  },
  kothagiri: {
    name: 'Kothagiri',
    tagline: 'Colonial Heritage & Tea Gardens',
    description: 'A charming hill station with colonial architecture, tea museums, and panoramic views of the Nilgiri Valley. Perfect for heritage lovers and nature enthusiasts.',
    highlights: ['Colonial Heritage', 'Tea Museum', 'Viewpoints', 'Botanical Gardens', 'Trekking Trails'],
    weather: { temp: '15-20°C', condition: 'Pleasant & Crisp' },
    icon: <Mountain className="w-6 h-6" />,
    color: 'from-blue-500/20 to-indigo-500/20',
    resortsCount: 7,
    bestSeason: 'Year Round',
    altitude: '6,500 ft',
    nearestCity: 'Coimbatore',
    travelTime: '2-3 hours',
    popularFor: 'Heritage & Nature',
    tip: 'Weekdays are less crowded for heritage walks',
    image: '/kot1.jpg' // Make sure this image exists in /public folder
  }
};

export default function LocationTabsSection() {
  const [activeLocation, setActiveLocation] = useState<'valparai' | 'kothagiri'>('valparai');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const location = locations[activeLocation];

  const handleLocationChange = (newLocation: 'valparai' | 'kothagiri') => {
    if (newLocation !== activeLocation) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveLocation(newLocation);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleImageError = (imagePath: string) => {
    console.log(`Image failed to load: ${imagePath}`);
    setImageError(prev => ({ ...prev, [imagePath]: true }));
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${location.color} opacity-30`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black/80 to-black" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-sm font-medium text-white mb-4">
            <MapPin className="w-4 h-4" />
            Discover Our Destinations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Two <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">Breathtaking</span> Locations
          </h2>
          <p className="text-white/95 max-w-2xl mx-auto text-lg">
            Experience the unique charm of each destination with our premium accommodations
          </p>
        </div>

        {/* Location Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
            {(Object.keys(locations) as Array<keyof typeof locations>).map((locKey) => (
              <button
                key={locKey}
                onClick={() => handleLocationChange(locKey)}
                className={`px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  activeLocation === locKey
                    ? `bg-gradient-to-r ${locations[locKey].color} text-white border border-white/30 shadow-lg`
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                } ${isTransitioning ? 'opacity-70' : ''}`}
                disabled={isTransitioning}
              >
                {locations[locKey].icon}
                <span className="font-medium">{locations[locKey].name}</span>
                {activeLocation === locKey && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Location Details */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Location Info */}
          <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                {location.icon}
                <h3 className="text-4xl font-bold text-white">{location.name}</h3>
              </div>
              <p className="text-xl text-teal-300 mb-4 font-medium">{location.tagline}</p>
              <p className="text-white/90 text-lg leading-relaxed">{location.description}</p>
            </div>

            {/* Weather & Info Cards */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Thermometer className="w-5 h-5 text-teal-400" />
                <div>
                  <p className="text-white text-sm">Temperature</p>
                  <p className="text-white font-bold">{location.weather.temp}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Cloud className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white text-sm">Weather</p>
                  <p className="text-white font-bold">{location.weather.condition}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <MapPin className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-white text-sm">Resorts</p>
                  <p className="text-white font-bold">{location.resortsCount} Properties</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Top Attractions</h4>
              <div className="flex flex-wrap gap-3">
                {location.highlights.map((highlight, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-2 bg-white/10 text-white rounded-full border border-white/20 hover:border-teal-500/30 transition-all duration-300 hover:scale-105"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/30">
                View Resorts in {location.name}
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                Explore Gallery
              </button>
            </div>
          </div>

          {/* Right Column - Stats & Image */}
          <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            {/* Location Image - UPDATED WITH ACTUAL IMAGE COMPONENT */}
            <div className="relative h-64 mb-8 rounded-2xl overflow-hidden border border-white/20">
              {!imageError[location.image] ? (
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={true}
                  onError={() => handleImageError(location.image)}
                  onLoadingComplete={() => console.log(`Image loaded: ${location.image}`)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center">
                    <div className="text-5xl mb-3">
                      {activeLocation === 'valparai' ? '🏞️' : '🏰'}
                    </div>
                    <p className="text-white/80">Image not found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {location.image}
                    </p>
                    <p className="text-red-400 text-xs mt-2">
                      Please add this image to /public folder
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full border border-white/20">
                  📸 {location.name}
                </span>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-teal-500/20 rounded-lg">
                  <Trees className="w-5 h-5 text-teal-400" />
                </div>
                <h4 className="text-2xl font-bold text-white">Quick Facts</h4>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: '🍂', label: 'Best Season', value: location.bestSeason },
                  { icon: '⛰️', label: 'Altitude', value: location.altitude },
                  { icon: '🏙️', label: 'Nearest City', value: location.nearestCity },
                  { icon: '🚗', label: 'Travel Time', value: location.travelTime },
                  { icon: '⭐', label: 'Popular For', value: location.popularFor },
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <span className="text-white">{stat.label}</span>
                    </div>
                    <span className="font-bold text-teal-300">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Tip Box */}
              <div className="mt-6 p-4 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-xl border border-teal-500/30">
                <div className="flex items-start gap-2">
                  <span className="text-teal-300 text-lg">💡</span>
                  <div>
                    <p className="font-medium text-white text-sm mb-1">Travel Tip</p>
                    <p className="text-white/90 text-sm">{location.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-teal-300 mb-2">
              {Object.values(locations).reduce((acc, loc) => acc + loc.resortsCount, 0)}+
            </div>
            <p className="text-white/80">Total Resorts</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-emerald-300 mb-2">2</div>
            <p className="text-white/80">Unique Locations</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-cyan-300 mb-2">4.8</div>
            <p className="text-white/80">Average Rating</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-amber-300 mb-2">24/7</div>
            <p className="text-white/80">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
}