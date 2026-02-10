// app/components/NearbyAttractions.tsx
"use client";

import { 
  MapPin, 
  Mountain,
  Trees,
  Camera,
  Coffee,
  Eye,
  Compass,
  Sparkles
} from 'lucide-react';

const attractions = [
  {
    location: 'Solayur (Sholayar)',
    distance: 'Adjacent',
    icon: <Mountain className="w-8 h-8" />,
    color: 'from-blue-500/20 to-cyan-500/20',
    highlights: [
      {
        name: 'Sholayar Dam',
        distance: '0.1 km',
        description: 'A quiet and serene location offering good views of the dam and the nearby forest',
        features: ['Dam Views', 'Forest Landscape', 'Top Class Maintenance']
      },
      {
        name: 'Malakkappara View Point',
        distance: '3.7 km',
        description: 'A favorite viewpoint to spot Allyar Dam from the hairpin bends',
        features: ['Allyar Dam View', '40 Hairpin Bends', 'Scenic Drive']
      }
    ]
  },
  {
    location: 'Valparai',
    distance: '65 km',
    icon: <Trees className="w-8 h-8" />,
    color: 'from-emerald-500/20 to-teal-500/20',
    highlights: [
      {
        name: 'Nallamudi Viewpoint',
        distance: '17.1 km from Valparai',
        description: 'Spectacular view of forest and tea estates, accessible through tea plantations',
        features: ['Tea Estates', 'Forest Views', '15km Drive']
      },
      {
        name: 'Tea Gardens',
        distance: 'Throughout Valparai',
        description: 'Vast expanses of lush tea plantations',
        features: ['Plantation Tours', 'Photo Opportunities', 'Fresh Air']
      }
    ]
  },
  {
    location: 'Kothagiri',
    distance: '45 km',
    icon: <Coffee className="w-8 h-8" />,
    color: 'from-amber-500/20 to-orange-500/20',
    highlights: [
      {
        name: 'Tea Plantations',
        distance: 'Various locations',
        description: 'Beautiful tea estates and factory tours',
        features: ['Tea Tasting', 'Factory Visits', 'Rolling Hills']
      },
      {
        name: 'Viewpoints',
        distance: 'Scattered throughout',
        description: 'Multiple viewpoints offering panoramic views of Nilgiri hills',
        features: ['Panoramic Views', 'Sunset Points', 'Easy Access']
      }
    ]
  }
];

const specialFeatures = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: 'Photography Spots',
    description: 'Perfect locations for capturing stunning landscapes'
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Scenic Views',
    description: 'Breathtaking viewpoints at every location'
  },
  {
    icon: <Trees className="w-6 h-6" />,
    title: 'Nature Immersion',
    description: 'Surrounded by forests and plantations'
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: 'Easy Exploration',
    description: 'Well-connected and accessible locations'
  }
];

export default function NearbyAttractions() {
  return (
    <section id="attractions" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/40 to-teal-500/40 backdrop-blur-lg border border-white/30 rounded-full text-sm font-medium text-white mb-4">
            <MapPin className="w-4 h-4" />
            Nearby Attractions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">Nearby</span>
          </h2>
          <p className="text-white/95 max-w-2xl mx-auto text-lg">
            Discover beautiful attractions around our resort in Kothagiri, Valparai, and Solayur
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {attractions.map((place, idx) => (
            <div 
              key={idx} 
              className={`p-6 bg-gradient-to-br ${place.color} backdrop-blur-xl rounded-3xl border border-white/30 hover:border-white/50 transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/30 rounded-2xl">
                  {place.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{place.location}</h3>
                  <p className="text-white/90">Distance: {place.distance}</p>
                </div>
              </div>

              <div className="space-y-6">
                {place.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-white text-lg">{highlight.name}</h4>
                      <span className="px-2 py-1 bg-white/20 text-white/90 text-xs rounded-full">
                        {highlight.distance}
                      </span>
                    </div>
                    <p className="text-white/90 text-sm mb-3">{highlight.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {highlight.features.map((feature, fIdx) => (
                        <span 
                          key={fIdx} 
                          className="px-2 py-1 bg-white/20 text-white/90 rounded-full text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Why <span className="text-emerald-300">Explore</span> These Places
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialFeatures.map((feature, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-emerald-500/30 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl w-fit mb-4 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-white text-lg mb-2">{feature.title}</h4>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Time to Visit */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Best Time to Visit
              </h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>October to March:</strong> Pleasant weather, clear views</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Early Morning:</strong> Best for photography and misty views</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Late Afternoon:</strong> Beautiful sunset views from viewpoints</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Compass className="w-6 h-6" />
                Exploration Tips
              </h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>Carry light jackets for cooler temperatures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>Wear comfortable walking shoes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>Carry water and light snacks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>Don't miss tea tasting in plantations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}