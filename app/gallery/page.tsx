"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TouristNavbar from "../components/Navbar";
import { FiMapPin, FiChevronRight, FiZoomIn, FiX } from "react-icons/fi";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  location: string;
  description: string;
}

interface GalleryTab {
  id: string;
  label: string;
  count: number;
  description: string;
}

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<string>("valayar");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const tabs: GalleryTab[] = [
    { 
      id: "valayar", 
      label: "Valayar", 
      count: 14,
      description: "Pristine waterfalls and lush green valleys"
    },
    { 
      id: "kothagiri", 
      label: "Kothagiri", 
      count: 7,
      description: "Tea plantations and colonial architecture"
    },
  ];

  // All images data
  const allImages: GalleryImage[] = [
    // Valayar images
    { 
      id: 1, 
      src: "/val1.jpg", 
      alt: "Valayar Mountain Range", 
      category: "valayar",
      location: "Valayar Peak",
      description: "Panoramic view of the majestic mountains"
    },
    { 
      id: 2, 
      src: "/val2.jpg", 
      alt: "Valayar Waterfalls", 
      category: "valayar",
      location: "Waterfall Point",
      description: "Crystal clear waterfalls flowing through rocks"
    },
    { 
      id: 3, 
      src: "/val3.jpg", 
      alt: "Valayar Tea Gardens", 
      category: "valayar",
      location: "Tea Estate",
      description: "Vast expanse of beautifully manicured tea gardens"
    },
    { 
      id: 4, 
      src: "/val4.jpg", 
      alt: "Valayar Sunset", 
      category: "valayar",
      location: "Sunset Point",
      description: "Golden hour over the hills"
    },
    { 
      id: 5, 
      src: "/val5.jpg", 
      alt: "Valayar Forest Trail", 
      category: "valayar",
      location: "Forest Reserve",
      description: "Serene walking trails through dense forest"
    },
    { 
      id: 6, 
      src: "/val6.jpg", 
      alt: "Valayar Lake View", 
      category: "valayar",
      location: "Lake Side",
      description: "Tranquil lake surrounded by hills"
    },
    { 
      id: 7, 
      src: "/val7.jpg", 
      alt: "Valayar Resort View", 
      category: "valayar",
      location: "HillEscape Resort",
      description: "Our luxury resort nestled in nature"
    },
    { 
      id: 8, 
      src: "/val8.jpg", 
      alt: "Valayar Valley", 
      category: "valayar",
      location: "Valley Viewpoint",
      description: "Breathtaking valley panorama"
    },
    { 
      id: 9, 
      src: "/val9.jpg", 
      alt: "Valayar Morning Mist", 
      category: "valayar",
      location: "Mist Valley",
      description: "Early morning mist covering the hills"
    },
    { 
      id: 10, 
      src: "/val10.jpg", 
      alt: "Valayar Birds Eye", 
      category: "valayar",
      location: "Aerial View",
      description: "Drone view of the entire region"
    },
    { 
      id: 11, 
      src: "/val11.jpg", 
      alt: "Valayar River", 
      category: "valayar",
      location: "River Side",
      description: "Pristine river flowing through mountains"
    },
    { 
      id: 12, 
      src: "/val12.jpg", 
      alt: "Valayar Sunrise", 
      category: "valayar",
      location: "Sunrise Point",
      description: "First rays of sun touching the peaks"
    },
    { 
      id: 13, 
      src: "/val13.jpg", 
      alt: "Valayar Camping", 
      category: "valayar",
      location: "Camp Site",
      description: "Starry night camping experience"
    },
    { 
      id: 14, 
      src: "/val14.jpg", 
      alt: "Valayar Luxury Suite", 
      category: "valayar",
      location: "Premium Suite",
      description: "Luxurious accommodation with view"
    },
    
    // Kothagiri images
    { 
      id: 21, 
      src: "/kot1.jpg", 
      alt: "Kothagiri View Point", 
      category: "kothagiri",
      location: "Kothagiri Peak",
      description: "Spectacular viewpoint overlooking valleys"
    },
    { 
      id: 22, 
      src: "/kot2.avif", 
      alt: "Kothagiri Resort", 
      category: "kothagiri",
      location: "Kothagiri Resort",
      description: "Colonial-style heritage property"
    },
    { 
      id: 23, 
      src: "/kot3.avif", 
      alt: "Kothagiri Estate", 
      category: "kothagiri",
      location: "Tea Plantation",
      description: "Historic tea estate with rolling hills"
    },
    { 
      id: 24, 
      src: "/kot4.avif", 
      alt: "Kothagiri Tea Factory", 
      category: "kothagiri",
      location: "Tea Factory",
      description: "Traditional tea processing unit"
    },
    { 
      id: 25, 
      src: "/kot5.avif", 
      alt: "Kothagiri Trails", 
      category: "kothagiri",
      location: "Walking Trails",
      description: "Picturesque walking paths"
    },
    { 
      id: 26, 
      src: "/kot6.avif", 
      alt: "Kothagiri Sunset", 
      category: "kothagiri",
      location: "Sunset Vista",
      description: "Magical sunset views"
    },
    { 
      id: 27, 
      src: "/kot7.avif", 
      alt: "Kothagiri Architecture", 
      category: "kothagiri",
      location: "Heritage Building",
      description: "Beautiful colonial architecture"
    },
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const filteredImages = allImages.filter(img => img.category === activeTab);
      setImages(filteredImages);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  const getActiveTab = () => tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10" />
        <Image
          src="/ba.jpg"
          alt="Gallery Background"
          fill
          className="object-cover opacity-30"
          priority
          quality={100}
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/10 via-transparent to-emerald-900/10 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60" />
      </div>

      <div className="relative z-10">
        <TouristNavbar />
        
        <section className="py-16 px-4 pt-24">
          <div className="max-w-7xl mx-auto">
            {/* Hero Header with Parallax Effect */}
            <div className="text-center mb-16 relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-teal-500/10 rounded-full blur-xl" />
              <div className="absolute -top-5 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl" />
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Gallery
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Immerse yourself in the breathtaking beauty of HillEscape. 
                Explore our stunning properties and the natural wonders that surround them.
              </p>
              
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full border border-teal-500/30">
                <FiMapPin className="text-teal-400" />
                <span className="text-teal-300 font-medium">
                  Currently viewing: {getActiveTab()?.label}
                </span>
              </div>
            </div>

            {/* Tabs with Description */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      group relative px-6 py-4 rounded-xl transition-all duration-300
                      flex flex-col items-center border-2
                      ${activeTab === tab.id
                        ? "border-teal-500 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 backdrop-blur-sm"
                        : "border-gray-700 bg-gray-900/50 backdrop-blur-sm hover:border-teal-400/50"
                      }
                      min-w-[180px]
                    `}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`
                        text-lg font-bold
                        ${activeTab === tab.id ? "text-white" : "text-gray-300"}
                      `}>
                        {tab.label}
                      </span>
                      <span className={`
                        px-2 py-1 text-xs rounded-full font-bold
                        ${activeTab === tab.id ? "bg-white text-teal-600" : "bg-gray-700 text-gray-300"}
                      `}>
                        {tab.count}
                      </span>
                    </div>
                    <p className={`
                      text-sm text-center
                      ${activeTab === tab.id ? "text-teal-200" : "text-gray-400"}
                    `}>
                      {tab.description}
                    </p>
                    {activeTab === tab.id && (
                      <div className="absolute -bottom-2 w-16 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="relative">
                  <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-teal-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-l-2 border-r-2 border-emerald-400"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 cursor-pointer aspect-square transition-all duration-500 hover:scale-[1.02] hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/10"
                    onClick={() => setSelectedImage(image)}
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center p-6">
                                <div class="text-5xl mb-4 opacity-50">🏞️</div>
                                <p class="text-white font-semibold text-center text-lg mb-2">${image.alt}</p>
                                <div class="flex items-center gap-2 mb-3">
                                  <div class="w-2 h-2 bg-teal-500 rounded-full"></div>
                                  <p class="text-gray-400 text-sm">${image.location}</p>
                                </div>
                                <p class="text-gray-500 text-center text-sm">Coming Soon</p>
                              </div>
                            `;
                          }
                        }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover Info */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center gap-2 mb-2">
                            <FiMapPin className="text-teal-400" />
                            <span className="text-teal-300 text-sm font-medium">{image.location}</span>
                          </div>
                          <h3 className="text-white font-bold text-lg mb-2">{image.alt}</h3>
                          <p className="text-gray-300 text-sm mb-4">{image.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs rounded-full">
                              {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                            </span>
                            <button className="flex items-center gap-1 text-white text-sm hover:text-teal-300 transition-colors">
                              <FiZoomIn />
                              <span>View</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Static Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold line-clamp-1">{image.alt}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                            <span className="text-gray-300 text-xs">{image.location}</span>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                          <FiChevronRight className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Image Modal */}
            {selectedImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                <div className="relative w-full max-w-6xl max-h-[90vh]">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-12 right-0 text-white hover:text-teal-400 text-2xl z-10"
                  >
                    <FiX />
                  </button>
                  <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-4 p-6 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.alt}</h3>
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <FiMapPin className="text-teal-400" />
                            <span className="text-teal-300">{selectedImage.location}</span>
                          </div>
                          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                            {selectedImage.category}
                          </span>
                        </div>
                        <p className="text-gray-300">{selectedImage.description}</p>
                      </div>
                      <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 whitespace-nowrap">
                        Book This Location
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  {allImages.length}+
                </div>
                <div className="text-gray-300 mb-2">Total Images</div>
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                </div>
              </div>
              
              <div className="group p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {tabs.length}
                </div>
                <div className="text-gray-300 mb-2">Exotic Locations</div>
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                </div>
              </div>
              
              <div className="group p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
                  360°
                </div>
                <div className="text-gray-300 mb-2">Panoramic Views</div>
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-emerald-500 to-green-500"></div>
                </div>
              </div>
              
              <div className="group p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  4K
                </div>
                <div className="text-gray-300 mb-2">HD Quality</div>
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-gradient-to-r from-violet-500 to-purple-500"></div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-20 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Experience These Views?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Don't just admire these breathtaking scenes in photos. 
                Book your stay at HillEscape and wake up to these magical views every morning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center">
                  Book Your Stay Now
                  <FiChevronRight className="text-lg" />
                </button>
                <button className="px-8 py-4 bg-gray-900/50 backdrop-blur-sm text-white font-bold rounded-full border border-gray-700 hover:border-teal-500/50 hover:scale-105 transition-all duration-300">
                  View All Packages
                </button>
              </div>
              <p className="text-gray-500 mt-6 text-sm">
                Limited availability. Book now to secure your preferred dates.
              </p>
            </div>
          </div>
        </section>

        {/* Floating Navigation */}
        <div className="fixed bottom-8 right-8 z-20 flex flex-col gap-2">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex items-center justify-center hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
          >
            ↑
          </button>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}