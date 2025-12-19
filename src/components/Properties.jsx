import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, Search, Filter, Navigation, ChevronDown, 
  BedDouble, Bath, Ruler, Heart, Sparkles, ArrowRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PropertySkeleton = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
    <div className="h-64 bg-gray-200 animate-pulse" />
    <div className="p-6 flex flex-col flex-grow space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
      <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
      <div className="flex gap-4 pt-4 mt-auto border-t border-gray-100">
        <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
      </div>
      <div className="h-12 bg-gray-200 rounded-xl w-full animate-pulse mt-4" />
    </div>
  </div>
);

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [isNearby, setIsNearby] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (nearbyCoords = null) => {
    setLoading(true);
    try {
      let url = `${apiUrl}/properties`;
      if (nearbyCoords) {
        url = `${apiUrl}/properties/nearby?longitude=${nearbyCoords.lng}&latitude=${nearbyCoords.lat}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        let fetchedProperties = [];
        // Handle different response structures
        if (Array.isArray(data.data)) {
          fetchedProperties = data.data;
        } else if (data.data?.properties) {
          fetchedProperties = data.data.properties;
        }
        setProperties(fetchedProperties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNearMe = () => {
    if (isNearby) {
      setIsNearby(false);
      fetchProperties(); // Reset to all properties
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsNearby(true);
          fetchProperties({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = 
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address?.locality?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "All" || property.propertyType === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pt-20 pb-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 font-medium text-sm mb-6"
          >
            <Sparkles size={16} />
            <span>Premium Listings</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Dream Space</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the perfect PG, apartment, shop, or room that fits your lifestyle.
            Curated listings just for you.
          </motion.p>
        </div>

        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl p-3 rounded-2xl shadow-xl shadow-indigo-100/50 mb-12 flex flex-col md:flex-row gap-3 items-center justify-between border border-white ring-1 ring-slate-100 sticky top-24 z-30"
        >
          {/* Search Input */}
          <div className="relative w-full md:w-1/3 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by city, locality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-0 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all duration-200"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
            {/* Filter Dropdown */}
            <div className="relative min-w-[140px] w-full md:w-auto">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full appearance-none bg-slate-50 hover:bg-white border-0 text-slate-700 py-3.5 px-5 pr-10 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition cursor-pointer font-medium"
              >
                {["All", "PG", "Flat", "Room", "Shop"].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <ChevronDown size={16} />
              </div>
            </div>

            {/* Near Me Button */}
            <button
              onClick={handleNearMe}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl transition-all font-medium ${
                isNearby 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700" 
                  : "bg-slate-50 text-slate-600 hover:bg-white hover:shadow-md hover:text-indigo-600"
              }`}
            >
              <Navigation size={18} className={isNearby ? "fill-current animate-pulse" : ""} />
              <span className="whitespace-nowrap">{isNearby ? "Near Me Active" : "Near Me"}</span>
            </button>
          </div>
        </motion.div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PropertySkeleton key={i} />
            ))}
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProperties.map((property, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={property._id || property.id}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={property.images?.[0]?.url || "https://placehold.co/600x400?text=No+Image"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-indigo-600 shadow-sm uppercase tracking-wide">
                        {property.propertyType}
                      </span>
                    </div>

                    <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors duration-300">
                      <Heart size={20} />
                    </button>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-xs font-medium opacity-90 mb-1">Price per month</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">₹{property.price?.amount?.toLocaleString()}</span>
                        <span className="text-sm opacity-80 font-normal">/ {property.price?.period || "month"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-slate-500 text-sm">
                        <MapPin size={16} className="mr-1.5 text-indigo-500 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {property.address?.locality}, {property.address?.city}
                        </span>
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100 mb-4">
                      <div className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors duration-300">
                        <BedDouble size={18} className="text-slate-400 group-hover:text-indigo-500 mb-1" />
                        <span className="text-xs font-semibold text-slate-700">{property.bedrooms || 0} Beds</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors duration-300">
                        <Bath size={18} className="text-slate-400 group-hover:text-indigo-500 mb-1" />
                        <span className="text-xs font-semibold text-slate-700">{property.bathrooms || 0} Bath</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors duration-300">
                        <Ruler size={18} className="text-slate-400 group-hover:text-indigo-500 mb-1" />
                        <span className="text-xs font-semibold text-slate-700">{property.totalArea || "N/A"} sqft</span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/properties/${property._id || property.id}`}
                      className="mt-auto block w-full"
                    >
                      <button className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-semibold flex items-center justify-center gap-2 group-hover:bg-indigo-600 transition-all duration-300 shadow-lg group-hover:shadow-indigo-200">
                        View Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="bg-indigo-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No properties found</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              We couldn't find any properties matching your criteria. Try adjusting your search or filters.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => {
                   setSearchTerm("");
                   setFilterType("All");
                   setIsNearby(false);
                   fetchProperties();
                }}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
