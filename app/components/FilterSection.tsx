"use client";

import { Filter, Search, MapPin, Tag, X } from "lucide-react";
import { useState } from "react";

interface FilterSectionProps {
  locations: string[];
  amenities: string[];
  tags: string[];
  priceRanges: { label: string; min: number; max: number }[];
  onFilterChange: (filters: any) => void;
  onSearch: (query: string) => void;
}

export default function FilterSection({
  locations,
  amenities,
  tags,
  priceRanges,
  onFilterChange,
  onSearch,
}: FilterSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    onFilterChange({
      location: location === "All" ? "" : location,
      priceRange: selectedPriceRange,
      amenities: selectedAmenities,
      tags: selectedTags,
    });
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(range);
    onFilterChange({
      location: selectedLocation === "All" ? "" : selectedLocation,
      priceRange: range,
      amenities: selectedAmenities,
      tags: selectedTags,
    });
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];
    
    setSelectedAmenities(newAmenities);
    onFilterChange({
      location: selectedLocation === "All" ? "" : selectedLocation,
      priceRange: selectedPriceRange,
      amenities: newAmenities,
      tags: selectedTags,
    });
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    onFilterChange({
      location: selectedLocation === "All" ? "" : selectedLocation,
      priceRange: selectedPriceRange,
      amenities: selectedAmenities,
      tags: newTags,
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLocation("All");
    setSelectedPriceRange("All Prices");
    setSelectedAmenities([]);
    setSelectedTags([]);
    onSearch("");
    onFilterChange({
      location: "",
      priceRange: "All Prices",
      amenities: [],
      tags: [],
    });
  };

  const removeAmenity = (amenity: string) => {
    toggleAmenity(amenity);
  };

  const removeTag = (tag: string) => {
    toggleTag(tag);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 text-white rounded-lg"
        >
          <Filter className="w-5 h-5" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block`}>
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search resorts..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
              />
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </h4>
            <div className="space-y-2">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationChange(location)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedLocation === location
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => handlePriceRangeChange(range.label)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedPriceRange === range.label
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Amenities</h4>
            <div className="space-y-2">
              {amenities.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-600">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedLocation !== "All" || 
            selectedPriceRange !== "All Prices" || 
            selectedAmenities.length > 0 || 
            selectedTags.length > 0) && (
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-700">Active Filters</h4>
                <button
                  onClick={resetFilters}
                  className="text-sm text-teal-600 hover:text-teal-700"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedLocation !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                    Location: {selectedLocation}
                    <button onClick={() => handleLocationChange("All")} className="ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedPriceRange !== "All Prices" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                    Price: {selectedPriceRange}
                    <button onClick={() => handlePriceRangeChange("All Prices")} className="ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedAmenities.map(amenity => (
                  <span key={amenity} className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                    {amenity}
                    <button onClick={() => removeAmenity(amenity)} className="ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedTags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={resetFilters}
            className="w-full mt-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </>
  );
}