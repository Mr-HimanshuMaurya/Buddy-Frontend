import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

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
    return <div className="py-20 text-center">Loading properties...</div>;
  }

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Explore Our Properties</h2>
          <p className="text-slate-600">Find your perfect home in prime locations</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {properties.slice(0, 5).map((property) => (
            <Link 
              to={`/properties/${property._id || property.id}`} 
              key={property._id || property.id}
              className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl group-hover:border-indigo-500 transition-all">
                <img
                  src={property.images?.[0]?.url || "https://placehold.co/400x400?text=No+Image"}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                  {property.address?.city || "Unknown City"}
                </h3>
                <div className="flex items-center justify-center gap-1 text-slate-500 text-sm">
                  <MapPin size={14} />
                  <span>{property.address?.locality || "Location"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
            <Link to="/properties" className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl">
                View All Properties
            </Link>
        </div>
      </div>
    </section>
  );
}
