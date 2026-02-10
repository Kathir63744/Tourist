"use client";

import TouristNavbar from "../components/Navbar";
import { useState } from "react";
import Image from "next/image"; // Add this import
import { 
  Search, 
  Filter, 
  Calendar, 
  Tag, 
  BookOpen,
  Users,
  Share2,
  Heart,
  Home,
  Mountain,
  MapPin,
  Flame,
  Utensils,
  TreePine,
  ArrowUpDown,
  X,
  Star,
  Loader2,
  Sparkles,
  CheckCircle,
  Shield,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Bookmark
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Valparai-Solaiyur: Complete Travel Guide",
    excerpt: "Everything you need to know about visiting Valparai and Solaiyur - from best stays to hidden waterfalls.",
    content: "Full article content here...",
    author: "Travel Expert",
    date: "Jan 15, 2024",
    readTime: "8 min read",
    category: "Travel Guide",
    location: "Valparai-Solaiyur",
    image: "/blog1.jpg", // Make sure this file exists in your public folder
    tags: ["Valparai", "Solaiyur", "Waterfalls", "Nature"],
    icon: <Home className="w-5 h-5" />,
    color: "emerald"
  },
  {
    id: 2,
    title: "Kothagiri Campfire Nights Experience",
    excerpt: "Experience magical evenings under misty mountain skies with cozy barbecue and warm conversations.",
    content: "Full article content here...",
    author: "Experience Guide",
    date: "Jan 12, 2024",
    readTime: "6 min read",
    category: "Experience",
    location: "Kothagiri",
    image: "/blog2.jpg",
    tags: ["Kothagiri", "Campfire", "Barbecue", "Evening"],
    icon: <Flame className="w-5 h-5" />,
    color: "orange"
  },
  {
    id: 3,
    title: "Best Time to Visit Hill Stations",
    excerpt: "Seasonal guide for Valparai, Solaiyur, and Kothagiri with weather insights and activity planning.",
    content: "Full article content here...",
    author: "Travel Planner",
    date: "Jan 10, 2024",
    readTime: "7 min read",
    category: "Planning",
    location: "Both Locations",
    image: "/blog3.jpg",
    tags: ["Seasonal", "Weather", "Planning", "Guide"],
    icon: <Calendar className="w-5 h-5" />,
    color: "teal"
  },
  {
    id: 4,
    title: "Valparai-Solaiyur Home-Style Dining",
    excerpt: "Discover delicious home-style meals delivered to your room - traditional flavors with modern comfort.",
    content: "Full article content here...",
    author: "Food Blogger",
    date: "Jan 8, 2024",
    readTime: "5 min read",
    category: "Food & Dining",
    location: "Valparai-Solaiyur",
    image: "/blog4.jpg",
    tags: ["Food", "Dining", "Local", "Cuisine"],
    icon: <Utensils className="w-5 h-5" />,
    color: "emerald"
  },
  {
    id: 5,
    title: "Kothagiri Barbecue Experience Guide",
    excerpt: "Your complete guide to enjoying open-air barbecue in the misty hills of Kothagiri.",
    content: "Full article content here...",
    author: "Food Expert",
    date: "Jan 5, 2024",
    readTime: "6 min read",
    category: "Food & Dining",
    location: "Kothagiri",
    image: "/blog5.jpg",
    tags: ["Barbecue", "Grill", "Outdoor", "Food"],
    icon: <Flame className="w-5 h-5" />,
    color: "orange"
  },
  {
    id: 6,
    title: "Family Activities in Hill Resorts",
    excerpt: "Curated activities for kids and adults in Valparai-Solaiyur and Kothagiri resorts.",
    content: "Full article content here...",
    author: "Family Guide",
    date: "Jan 3, 2024",
    readTime: "9 min read",
    category: "Family Travel",
    location: "Both Locations",
    image: "/blog6.jpg",
    tags: ["Family", "Kids", "Activities", "Fun"],
    icon: <Users className="w-5 h-5" />,
    color: "teal"
  }
];

const categories = ["All", "Travel Guide", "Experience", "Food & Dining", "Family Travel", "Adventure", "Photography", "Travel Tips"];
const locations = ["All", "Valparai-Solaiyur", "Kothagiri", "Both Locations"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const postsPerPage = 6;

  // Extract unique tags from all posts
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter(post => {
      // Category filter
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false;
      }
      
      // Location filter
      if (selectedLocation !== "All" && post.location !== selectedLocation) {
        return false;
      }
      
      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => post.tags.includes(tag))) {
        return false;
      }
      
      // Search filter
      if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "popular":
          // Simulate popularity by ID (you can add actual view counts later)
          return b.id - a.id;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedLocation("All");
    setSelectedTags([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen font-sans antialiased relative overflow-hidden">
      {/* Background Image with Light Overlay */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: `url('/ba.jpg')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/30 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/10 via-transparent to-emerald-900/10" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(15, 23, 42, 0.3) 100%)'
        }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <TouristNavbar initialTransparent={false} />
        
        {/* Hero Section with same style as resorts page */}
        <section className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)'
            }} />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full text-center">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl shadow-2xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
                  Travel <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">Blog</span>
                </h1>
              </div>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-lg">
                Insights, tips, and stories from Valparai-Solaiyur & Kothagiri hill stations
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Featured Post */}
            <div className="mb-12 bg-gradient-to-r from-teal-50/10 to-emerald-50/10 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/3 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-emerald-600/20" />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-medium rounded-full">
                      <Sparkles className="w-4 h-4" />
                      Featured
                    </span>
                  </div>
                  <div className="relative p-10 flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="flex justify-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl">
                          <Home className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div className="p-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl">
                          <Mountain className="w-8 h-8 text-orange-600" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">
                        Ultimate Hill Station Experience Guide
                      </h2>
                      <p className="text-white/90 mb-6 max-w-xl mx-auto">
                        Everything you need to know for planning the perfect getaway to Valparai-Solaiyur and Kothagiri.
                      </p>
                      <div className="flex justify-center gap-4 mb-8">
                        <span className="px-4 py-2 bg-emerald-100/20 backdrop-blur-sm text-emerald-300 text-sm font-medium rounded-full border border-emerald-500/30">
                          Valparai-Solaiyur
                        </span>
                        <span className="px-4 py-2 bg-orange-100/20 backdrop-blur-sm text-orange-300 text-sm font-medium rounded-full border border-orange-500/30">
                          Kothagiri
                        </span>
                      </div>
                      <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all">
                        Read Full Article
                      </button>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 p-8">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Highlights</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map(post => (
                      <div key={post.id} className="flex items-start gap-3 p-3 hover:bg-white/10 rounded-lg transition-colors">
                        <div className={`p-2 rounded-lg ${
                          post.color === 'emerald' ? 'bg-emerald-100/20 text-emerald-400' :
                          post.color === 'orange' ? 'bg-orange-100/20 text-orange-400' :
                          'bg-teal-100/20 text-teal-400'
                        }`}>
                          {post.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-white text-sm line-clamp-1">{post.title}</h4>
                          <p className="text-white/70 text-xs mt-1">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles about Valparai, Kothagiri, travel tips..."
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none placeholder-white/50"
                  />
                </div>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Locations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {locations.map(location => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                        selectedLocation === location
                          ? location === 'Valparai-Solaiyur' 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                            : location === 'Kothagiri'
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                            : 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white'
                          : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {location === 'Valparai-Solaiyur' && <Home className="w-4 h-4" />}
                      {location === 'Kothagiri' && <Mountain className="w-4 h-4" />}
                      {location === 'Both Locations' && <MapPin className="w-4 h-4" />}
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full transition-colors ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white'
                          : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white'
                          : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory !== "All" || selectedLocation !== "All" || selectedTags.length > 0 || searchQuery) && (
                <div className="mb-6 p-4 bg-teal-500/10 backdrop-blur-sm rounded-lg border border-teal-500/20">
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation !== "All" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                        {selectedLocation === 'Valparai-Solaiyur' && <Home className="w-3 h-3" />}
                        {selectedLocation === 'Kothagiri' && <Mountain className="w-3 h-3" />}
                        {selectedLocation === 'Both Locations' && <MapPin className="w-3 h-3" />}
                        {selectedLocation}
                      </span>
                    )}
                    {selectedCategory !== "All" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                        Category: {selectedCategory}
                      </span>
                    )}
                    {selectedTags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                        Search: "{searchQuery}"
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Blog Posts Grid */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Latest Articles <span className="text-teal-300">({filteredPosts.length})</span>
                  </h2>
                  <p className="text-white/80">
                    Stories from {selectedLocation === "All" ? "both locations" : selectedLocation.toLowerCase()}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none appearance-none"
                    >
                      <option value="latest">Sort by: Latest</option>
                      <option value="popular">Most Popular</option>
                      <option value="title">Title A-Z</option>
                    </select>
                  </div>
                  
                  {(searchQuery || selectedCategory !== "All" || selectedLocation !== "All" || selectedTags.length > 0) && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-2 px-4 py-2 text-teal-300 hover:text-teal-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="w-12 h-12 text-teal-400 animate-spin mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Loading Articles</h3>
                  <p className="text-white/80">Fetching the best articles for you...</p>
                </div>
              ) : (
                <>
                  {paginatedPosts.length > 0 ? (
                    <>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedPosts.map((post) => (
                          <div key={post.id} className="group relative">
                            <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full">
                              {/* Image Container - FIXED */}
                              <div className="relative h-48 overflow-hidden">
                                {post.image ? (
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={post.image}
                                      alt={post.title}
                                      fill
                                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent) {
                                          parent.innerHTML = `
                                            <div class="w-full h-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                                              <BookOpen class="w-12 h-12 text-white/40" />
                                            </div>
                                          `;
                                        }
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                                    <BookOpen className="w-12 h-12 text-white/40" />
                                  </div>
                                )}
                                
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/30" />
                                
                                {/* Location Badge */}
                                <div className="absolute top-4 right-4">
                                  <div className={`px-3 py-1.5 backdrop-blur-md text-white text-xs font-medium rounded-full border ${
                                    post.color === 'emerald' 
                                      ? 'bg-emerald-500/70 border-emerald-300/50' 
                                      : post.color === 'orange'
                                      ? 'bg-orange-500/70 border-orange-300/50'
                                      : 'bg-teal-500/70 border-teal-300/50'
                                  }`}>
                                    <div className="flex items-center gap-1">
                                      {post.icon}
                                      {post.location}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                  <div className="px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                                    {post.category}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Content */}
                              <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-2 pr-2">
                                      {post.title}
                                    </h3>
                                    <p className="text-white/70 text-sm mt-1">{post.author}</p>
                                  </div>
                                </div>
                                
                                {/* Date & Read Time */}
                                <div className="flex items-center gap-4 mb-4 text-sm">
                                  <div className="flex items-center gap-1.5 text-white/90">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-white/90">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{post.readTime}</span>
                                  </div>
                                </div>
                                
                                <p className="text-white/95 mb-5 text-sm line-clamp-2 min-h-[2.5rem]">
                                  {post.excerpt}
                                </p>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {post.tags.slice(0, 3).map((tag: string, index: number) => (
                                    <span 
                                      key={index} 
                                      className="px-3 py-1 bg-white/30 backdrop-blur-sm text-white/95 rounded-full text-xs border border-white/30"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {post.tags.length > 3 && (
                                    <span className="px-3 py-1 bg-white/20 text-white/80 rounded-full text-xs">
                                      +{post.tags.length - 3} more
                                    </span>
                                  )}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all group shadow-lg hover:shadow-emerald-500/30">
                                    <span className="flex items-center justify-center gap-2">
                                      Read Article
                                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                  </button>
                                  <button 
                                    className="px-4 py-3 bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/40 transition-colors"
                                    title="Save for later"
                                  >
                                    <Bookmark className="w-5 h-5" />
                                  </button>
                                  <button 
                                    className="px-4 py-3 bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/40 transition-colors"
                                    title="Share"
                                  >
                                    <Share2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Hover glow effect */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 blur-3xl rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                              className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              ← Previous
                            </button>
                            
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }
                              
                              return (
                                <button
                                  key={i}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className={`px-4 py-2 rounded-lg transition-colors ${
                                    currentPage === pageNum
                                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                                      : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                            
                            <button 
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                              className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              Next →
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-white/40 mb-4">
                        <Search className="w-12 h-12 mx-auto" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                      <p className="text-white/80 mb-6">Try adjusting your filters or search criteria</p>
                      <button
                        onClick={resetFilters}
                        className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-10 text-white text-center border border-white/30">
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl">
                    <Home className="w-6 h-6" />
                  </div>
                  <div className="p-3 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-xl">
                    <Mountain className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Stay Updated with Hill Station Tips</h3>
                <p className="text-white/90 mb-8">
                  Get weekly updates on new articles, travel tips, and exclusive offers from Valparai-Solaiyur & Kothagiri
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg placeholder-white/50 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  />
                  <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-sm text-white/70 mt-4">
                  No spam, unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background: rgba(45, 212, 191, 0.3);
          color: white;
        }
        
        *:focus {
          outline: 2px solid rgba(45, 212, 191, 0.5);
          outline-offset: 2px;
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(45, 212, 191, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(45, 212, 191, 0.7);
        }
        
        @media (max-width: 640px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
}