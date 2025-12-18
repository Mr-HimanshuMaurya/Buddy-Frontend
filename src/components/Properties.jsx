import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${apiUrl}/properties`);
      const data = await response.json();
      if (response.ok) {
        const fetchedProperties = Array.isArray(data.data) 
          ? data.data 
          : (data.data?.properties || []);
        setProperties(fetchedProperties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find Your Dream Property</h1>
          <p className="text-lg text-gray-600">Explore our exclusive listings of PGs, apartments, and homes.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by city, locality, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {["All", "PG", "Flat", "Room"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  filterType === type 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                key={property._id || property.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.images?.[0]?.url || "https://placehold.co/600x400?text=No+Image"}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 shadow-sm">
                    {property.propertyType || "Property"}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-indigo-600 text-white px-4 py-1 rounded-lg font-bold shadow-lg">
                    ₹{property.price?.amount || "N/A"}/mo
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 mb-4 text-sm">
                    <MapPin size={16} className="mr-1 text-indigo-500" />
                    <span className="line-clamp-1">
                      {property.address?.locality}, {property.address?.city}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Home size={14} /> {property.bedrooms || 0} Beds
                      </span>
                    </div>
                    
                    <Link
                      to={`/properties/${property._id || property.id}`}
                      className="text-indigo-600 font-semibold text-sm hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">No properties found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
