import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function PropertyCircles() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-slate-50">
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce" />
          <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce delay-100" />
          <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce delay-200" />
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="py-4 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4"
          >
            Recommended Areas
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Explore Top <span className="text-indigo-600">Destinations</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Explore great homes in popular neighborhoods. Find a place that feels like home.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {properties.slice(0, 5).map((property, index) => (
            <motion.div
              key={property._id || property.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            >
              <Link 
                to={`/properties/${property._id || property.id}`} 
                className="group flex flex-col items-center gap-6"
              >
                <div className="relative">
                  {/* Glowing Ring Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 scale-125" />
                  
                  {/* Circle Image Container */}
                  <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl group-hover:border-indigo-500/30 transition-all duration-500 z-10">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                    <img
                      src={property.images?.[0]?.url || "https://placehold.co/400x400?text=No+Image"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700"
                    />
                    
                    {/* Hover Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-indigo-600 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Property Type Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
                      {property.propertyType || "Property"}
                    </span>
                  </div>
                </div>

                <div className="text-center transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="font-bold text-slate-800 text-xl mb-1 group-hover:text-indigo-600 transition-colors">
                    {property.address?.city || "Unknown City"}
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 text-slate-500 font-medium">
                    <MapPin size={16} className="text-indigo-400" />
                    <span className="group-hover:text-slate-700 transition-colors">
                      {property.address?.locality || "Location"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-20"
        >
            <Link to="/properties" className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30">
                <Home size={20} className="group-hover:scale-110 transition-transform" />
                <span>View All Properties</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
      </div>
    </section>
  );
}
