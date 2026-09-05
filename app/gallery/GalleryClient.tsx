"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TouristNavbar from "../components/Navbar";
import { FiMapPin, FiChevronRight, FiZoomIn, FiX, FiArrowLeft } from "react-icons/fi";
import { Mountain } from "lucide-react";

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

  // Handle Escape key and Back button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };

    // Handle popstate (browser back button)
    const handlePopState = () => {
      if (selectedImage) {
        setSelectedImage(null);
        // Push a new state to prevent immediate back navigation
        window.history.pushState(null, '', window.location.href);
      }
    };

    if (selectedImage) {
      // Add event listeners
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("popstate", handlePopState);
      
      // Push state to enable back button detection
      window.history.pushState({ modalOpen: true }, '', window.location.href);
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  // Schema.org JSON-LD for gallery
  useEffect(() => {
    if (images.length > 0) {
      const imageItems = images.map((image) => ({
        '@type': 'ImageObject',
        contentUrl: image.src,
        name: image.alt,
        description: image.description,
        caption: `${image.alt} - ${image.location}`,
        thumbnailUrl: image.src,
        location: {
          '@type': 'Place',
          name: image.location,
        },
      }));

      const imageGallerySchema = {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: `${getActiveTab()?.label || 'Gallery'} - HillEscape`,
        description: `Beautiful ${getActiveTab()?.label || 'gallery'} images from HillEscape resorts`,
        image: imageItems,
      };

      let scriptTag = document.getElementById('gallery-jsonld') as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'gallery-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(imageGallerySchema);
    }
  }, [images, activeTab]);

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

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image - Full Screen with Overlays */}
      <div className="fixed inset-0 z-0">
        {/* Primary Background Image */}
        <div className="relative w-full h-full">
          <Image
            src="/ba.jpg"
            alt="Gallery Background - HillEscape Resort"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          
          {/* Multiple Overlay Layers for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
          
          {/* Animated gradient overlay for dynamic feel */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/20 via-transparent to-emerald-900/20 animate-pulse z-10" />
          
          {/* Radial gradient for vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.6)_100%)] z-10" />
          
          {/* Subtle pattern overlay for texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-10" />
        </div>
      </div>

      <div className="relative z-10">
        <TouristNavbar />
        
        <section className="py-16 px-4 pt-24">
          <div className="max-w-7xl mx-auto">
            {/* Hero Header with Parallax Effect */}
            <div className="text-center mb-16 relative">
              {/* Decorative Glow Effects */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-teal-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -top-5 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl animate-pulse delay-1000" />
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Gallery
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed drop-shadow-lg">
                Immerse yourself in the breathtaking beauty of HillEscape. 
                Explore our stunning properties and the natural wonders that surround them.
              </p>
              
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full border border-teal-500/30 shadow-lg shadow-black/20">
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
                      flex flex-col items-center border-2 backdrop-blur-sm
                      ${activeTab === tab.id
                        ? "border-teal-500 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 shadow-lg shadow-teal-500/10"
                        : "border-gray-700 bg-gray-900/40 hover:border-teal-400/50 hover:bg-gray-900/60"
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

            {/* Image Modal with Enhanced Close Controls */}
            {selectedImage && (
              <>
                {/* Backdrop with click-to-close */}
                <div 
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                  onClick={closeModal}
                >
                  {/* Modal Container - prevents click propagation */}
                  <div 
                    className="relative w-full max-w-6xl max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button - Top Right */}
                    <button
                      onClick={closeModal}
                      className="absolute -top-14 right-0 text-white hover:text-teal-400 transition-colors duration-300 z-10 flex items-center gap-2 text-sm bg-black/50 px-4 py-2 rounded-full hover:bg-black/70"
                      aria-label="Close modal"
                    >
                      <FiX className="text-xl" />
                      <span>Close</span>
                    </button>

                    {/* Back Button - Top Left (Mobile Friendly) */}
                    <button
                      onClick={closeModal}
                      className="absolute -top-14 left-0 text-white hover:text-teal-400 transition-colors duration-300 z-10 flex items-center gap-2 text-sm bg-black/50 px-4 py-2 rounded-full hover:bg-black/70 md:hidden"
                      aria-label="Go back"
                    >
                      <FiArrowLeft className="text-xl" />
                      <span>Back</span>
                    </button>

                    {/* Image Container */}
                    <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden bg-black/50">
                      <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>

                    {/* Image Details */}
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

                    {/* Keyboard shortcut hint */}
                    <div className="absolute bottom-24 right-4 text-gray-500 text-xs hidden md:block bg-black/50 px-3 py-1 rounded-full">
                      Press ESC to close
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
        {/* Footer */}
<footer className="py-12 border-t border-white/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <div className="flex items-center gap-2 mb-2">
          <Mountain className="w-6 h-6 text-teal-400" />
          <span className="text-xl font-bold text-white">Zoy Tours</span>
        </div>
        <p className="text-white/70 text-sm">Luxury hill station experiences redefined</p>
      </div>
      
      <div className="flex items-center gap-6">
        <a href="/privacy-policy" className="text-white/70 hover:text-white transition-colors text-sm">Privacy Policy</a>
        <a href="/terms-of-service" className="text-white/70 hover:text-white transition-colors text-sm">Terms of Service</a>
        <a href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">Contact Us</a>
      </div>
      
      <div className="text-white/70 text-sm">
        Designed By{" "}
        <a 
          href="https://blackstoneinfomatics.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
        >
          Blackstone Infomatics
        </a>
      </div>
    </div>
  </div>
</footer>
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