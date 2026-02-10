// app/components/FoodServices.tsx
"use client";

import { useState } from 'react';
import { 
  Utensils, 
  Clock,
  Shield,
  Star,
  ChevronRight,
  Sparkles,
  Flame,
  Home,
  Coffee,
  Pizza,
  Mountain,
  TreePine
} from 'lucide-react';

interface FoodServicesProps {
  resortLocation?: 'valparai-solaiyur' | 'kothagiri' | 'all';
}

type FoodServiceItem = {
  name: string;
  description: string;
  timings: string;
  featured: boolean;
  highlight?: string;
};

type FoodServiceCategory = {
  category: string;
  icon: React.ReactNode;
  color: string;
  items: FoodServiceItem[];
};

const allFoodServices: Record<string, FoodServiceCategory[]> = {
  'valparai-solaiyur': [
    {
      category: 'In-Room Dining',
      icon: <Home className="w-8 h-8" />,
      color: 'from-emerald-500/20 to-teal-500/20',
      items: [
        { 
          name: 'Home-Style Meals', 
          description: 'Freshly prepared local dishes delivered to your room',
          timings: '7 AM - 10 PM',
          featured: true
        },
        { 
          name: 'Comfort Food Specials', 
          description: 'Hearty meals perfect after a day of exploration',
          timings: '24/7 on request',
          featured: false
        },
      ]
    },
    {
      category: 'Quick Service',
      icon: <Coffee className="w-8 h-8" />,
      color: 'from-amber-500/20 to-orange-500/20',
      items: [
        { 
          name: 'Breakfast Package', 
          description: 'Morning meals with local flavors',
          timings: '7 AM - 10 AM',
          featured: false
        },
        { 
          name: 'Evening Snacks', 
          description: 'Tea & local snacks',
          timings: '4 PM - 7 PM',
          featured: false
        },
      ]
    }
  ],
  'kothagiri': [
    {
      category: 'Specialty Experiences',
      icon: <Flame className="w-8 h-8" />,
      color: 'from-orange-500/20 to-red-500/20',
      items: [
        { 
          name: 'Barbecue Experience', 
          description: 'Open-air barbecue under misty Kotagiri skies with fresh ingredients, marinades, and grills',
          timings: '6 PM - 10 PM (Weather permitting)',
          featured: true,
          highlight: 'Best Service'
        },
        { 
          name: 'Campfire Evenings', 
          description: 'Cozy campfire gatherings with barbecue and hot beverages',
          timings: '7 PM - 11 PM',
          featured: true,
          highlight: 'Best Service'
        },
      ]
    },
    {
      category: 'Premium Dining',
      icon: <Pizza className="w-8 h-8" />,
      color: 'from-rose-500/20 to-pink-500/20',
      items: [
        { 
          name: 'Mountain View Dining', 
          description: 'Private balcony meals with panoramic views',
          timings: 'By appointment',
          featured: false
        },
      ]
    }
  ],
  'all': [
    {
      category: 'Multi-Cuisine Restaurant',
      icon: <Utensils className="w-8 h-8" />,
      color: 'from-blue-500/20 to-indigo-500/20',
      items: [
        { 
          name: 'International Buffet', 
          description: 'Wide variety of global cuisines',
          timings: '7 AM - 11 PM',
          featured: true
        },
        { 
          name: 'Local Specialties', 
          description: 'Traditional dishes from the region',
          timings: '12 PM - 3 PM, 7 PM - 10 PM',
          featured: false
        },
      ]
    },
    {
      category: 'Room Service',
      icon: <Clock className="w-8 h-8" />,
      color: 'from-purple-500/20 to-violet-500/20',
      items: [
        { 
          name: '24/7 In-Room Dining', 
          description: 'Full menu available anytime',
          timings: '24/7',
          featured: true
        },
        { 
          name: 'Private Dining Setup', 
          description: 'Custom meals in your room or balcony',
          timings: 'By appointment',
          featured: false
        },
      ]
    }
  ]
};

const locationFeatures = {
  'valparai-solaiyur': {
    title: 'Valparai-Solaiyur',
    description: 'Delicious dining, right at your doorstep',
    icon: <Home className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-500',
    tagline: 'Enjoy tasty, satisfying meals without leaving the comfort of your room'
  },
  'kothagiri': {
    title: 'Kothagiri',
    description: 'Unique mountain dining experiences',
    icon: <Mountain className="w-6 h-6" />,
    color: 'from-orange-500 to-amber-500',
    tagline: 'Cozy barbecue and campfire evenings under misty mountain skies'
  },
  'all': {
    title: 'All Resorts',
    description: 'Premium dining services',
    icon: <Star className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500',
    tagline: 'Gourmet experiences across all our locations'
  }
};

const dietaryOptions = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Dairy-Free', 'Local Specialties'
];

export default function FoodServices({ resortLocation = 'all' }: FoodServicesProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeLocation, setActiveLocation] = useState<'valparai-solaiyur' | 'kothagiri' | 'all'>(resortLocation);
  
  const currentServices = allFoodServices[activeLocation];
  const locationInfo = locationFeatures[activeLocation];

  return (
    <section id="food-services" className="py-20 bg-gradient-to-b from-transparent via-slate-900/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/40 to-orange-500/40 backdrop-blur-lg border border-white/30 rounded-full text-sm font-medium text-white mb-4">
            <Sparkles className="w-4 h-4" />
            Resort Dining Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Quality <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">Dining</span>
          </h2>
          
          {/* Location Toggle */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {(['all', 'valparai-solaiyur', 'kothagiri'] as const).map((location) => (
              <button
                key={location}
                onClick={() => {
                  setActiveLocation(location);
                  setActiveCategory(0);
                }}
                className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 border ${
                  activeLocation === location
                    ? 'bg-gradient-to-r from-amber-500/40 to-orange-500/40 text-white border-amber-500/50'
                    : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white'
                }`}
              >
                {location === 'valparai-solaiyur' && <Home className="w-4 h-4" />}
                {location === 'kothagiri' && <Mountain className="w-4 h-4" />}
                {location === 'all' && <Star className="w-4 h-4" />}
                <span className="font-medium capitalize">{location.replace('-', ' ')}</span>
              </button>
            ))}
          </div>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl border border-white/30 mb-4">
            <div className="p-2 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-lg">
              {locationInfo.icon}
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">{locationInfo.title}</h3>
              <p className="text-white/90">{locationInfo.description}</p>
            </div>
          </div>
          
          <p className="text-white/95 max-w-2xl mx-auto text-lg mt-4">
            {locationInfo.tagline}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
            {currentServices.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 ${
                  activeCategory === index
                    ? 'bg-gradient-to-r from-amber-500/40 to-orange-500/40 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {service.icon}
                <span className="font-medium">{service.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Category Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className={`p-8 bg-gradient-to-br ${currentServices[activeCategory].color} backdrop-blur-xl rounded-3xl border border-white/30 mb-8`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/30 rounded-2xl">
                  {currentServices[activeCategory].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentServices[activeCategory].category}</h3>
                  <p className="text-white/90">
                    {activeLocation === 'valparai-solaiyur' 
                      ? 'Home-style meals at your doorstep' 
                      : activeLocation === 'kothagiri'
                      ? 'Unique mountain experiences'
                      : 'Premium dining services'
                    }
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                {currentServices[activeCategory].items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white/10 backdrop-blur-sm p-4 rounded-xl border ${
                      item.featured 
                        ? 'border-amber-500/50 hover:border-amber-500/80' 
                        : 'border-white/20 hover:border-white/30'
                    } transition-colors group`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </h4>
                        {item.highlight && (
                          <span className="px-2 py-1 bg-gradient-to-r from-orange-500/40 to-amber-500/40 text-xs font-bold text-white rounded-full">
                            {item.highlight}
                          </span>
                        )}
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.featured 
                          ? 'bg-amber-500/20 text-amber-300' 
                          : 'bg-white/10 text-white/80'
                      }`}>
                        {item.timings}
                      </span>
                    </div>
                    <p className="text-white/90">{item.description}</p>
                    {item.featured && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span className="text-amber-300 text-sm font-medium">Featured Service</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Dietary Options */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-emerald-400" />
                Dietary Options Available
              </h4>
              <div className="flex flex-wrap gap-3">
                {dietaryOptions.map((option, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>

            {/* Location-Specific Features */}
            <div className="space-y-6 mb-8">
              {activeLocation === 'valparai-solaiyur' && [
                {
                  title: 'Fresh Ingredients',
                  description: 'Locally sourced produce and meats',
                  icon: '🌱',
                  color: 'text-emerald-400'
                },
                {
                  title: 'Comfort Delivery',
                  description: 'Direct to your room service',
                  icon: '🚪',
                  color: 'text-blue-400'
                },
                {
                  title: 'Home-Style Cooking',
                  description: 'Traditional recipes and flavors',
                  icon: '👨‍🍳',
                  color: 'text-amber-400'
                }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                  <div className={`text-2xl ${feature.color}`}>{feature.icon}</div>
                  <div>
                    <h5 className="font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {feature.title}
                    </h5>
                    <p className="text-white/80 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
              
              {activeLocation === 'kothagiri' && [
                {
                  title: 'Open-Air Setup',
                  description: 'Fresh mountain air ambiance',
                  icon: '🌬️',
                  color: 'text-blue-400'
                },
                {
                  title: 'Fresh Ingredients',
                  description: 'Daily sourced for barbecue',
                  icon: '🔥',
                  color: 'text-orange-400'
                },
                {
                  title: 'Cozy Atmosphere',
                  description: 'Warm campfire gatherings',
                  icon: '🪵',
                  color: 'text-amber-400'
                }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                  <div className={`text-2xl ${feature.color}`}>{feature.icon}</div>
                  <div>
                    <h5 className="font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {feature.title}
                    </h5>
                    <p className="text-white/80 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
              
              {activeLocation === 'all' && [
                {
                  title: 'Premium Quality',
                  description: 'High-quality ingredients',
                  icon: '⭐',
                  color: 'text-yellow-400'
                },
                {
                  title: 'Varied Cuisine',
                  description: 'Multiple culinary options',
                  icon: '🍽️',
                  color: 'text-indigo-400'
                },
                {
                  title: 'Flexible Timings',
                  description: 'Extended service hours',
                  icon: '⏰',
                  color: 'text-purple-400'
                }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                  <div className={`text-2xl ${feature.color}`}>{feature.icon}</div>
                  <div>
                    <h5 className="font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {feature.title}
                    </h5>
                    <p className="text-white/80 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="w-full mt-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-3 group shadow-lg hover:shadow-amber-500/30">
              <Utensils className="w-6 h-6" />
              View Complete Menu & Services
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Location-Specific Tagline */}
        <div className={`text-center p-8 rounded-3xl border ${
          activeLocation === 'valparai-solaiyur' 
            ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20' 
            : activeLocation === 'kothagiri'
            ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/20'
            : 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20'
        }`}>
          <p className="text-white text-lg">
            <span className="font-bold text-amber-300">Enjoy</span> {activeLocation === 'valparai-solaiyur' 
              ? 'tasty, satisfying meals without leaving your room' 
              : activeLocation === 'kothagiri'
              ? 'cozy barbecue and campfire evenings under misty mountain skies'
              : 'gourmet dining experiences across all our resort locations'
            }
          </p>
        </div>
      </div>
    </section>
  );
}