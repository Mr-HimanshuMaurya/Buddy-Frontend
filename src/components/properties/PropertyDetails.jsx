import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  IndianRupee, 
  BedDouble, 
  Bath, 
  Sofa, 
  Layers, 
  Calendar, 
  User, 
  Phone, 
  Mail,
  ArrowLeft,
  Share2,
  Clock,
  X
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [visitLoading, setVisitLoading] = useState(false);
  const [visitForm, setVisitForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: ""
  });

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
    message: ""
  });

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const checkAuth = (action) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.info("Please login to continue");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    action();
  };

  const handleVisitChange = (e) => {
    setVisitForm({ ...visitForm, [e.target.name]: e.target.value });
  };

  const handleEnquiryChange = (e) => {
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryLoading(true);

    try {
      const response = await fetch(`${apiUrl}/bookings/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
          propertyId: id,
          ...enquiryForm
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Enquiry sent successfully!");
        setIsEnquiryModalOpen(false);
        setEnquiryForm({
          name: "",
          email: "",
          number: "",
          city: "",
          message: ""
        });
      } else {
        toast.error(data.message || "Failed to send enquiry");
      }
    } catch (error) {
      console.error("Error sending enquiry:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setEnquiryLoading(false);
    }
  };


  const handleVisitSubmit = async (e) => {
    e.preventDefault();
    setVisitLoading(true);

    try {
      const response = await fetch(`${apiUrl}/bookings/visit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
          propertyId: id,
          ...visitForm
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Visit scheduled successfully!");
        setIsVisitModalOpen(false);
        setVisitForm({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          message: ""
        });
      } else {
        toast.error(data.message || "Failed to schedule visit");
      }
    } catch (error) {
      console.error("Error scheduling visit:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setVisitLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const fetchPropertyDetails = async () => {
    try {
      const response = await fetch(`${apiUrl}/properties/${id}`);
      const data = await response.json();

      if (response.ok) {
        setProperty(data.data);
      } else {
        toast.error(data.message || "Failed to fetch property details");
      }
    } catch (error) {
      console.error("Error fetching property details:", error);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-700">Property Not Found</h2>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <nav className="bg-white shadow-sm z-20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <div className="flex gap-4">
            <button 
              onClick={handleShare}
              className="p-2 hover:bg-slate-100 rounded-full transition text-slate-500"
              title="Share Property"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <img 
                src={property.images?.[0]?.url || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"} 
                alt={property.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Title & Address */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    {property.propertyType}
                  </span>
                  <h1 className="text-3xl font-bold text-slate-800 mt-3">{property.title}</h1>
                  <div className="flex items-center gap-2 text-slate-500 mt-2">
                    <MapPin size={18} />
                    <span>{property.address?.street}, {property.address?.locality}, {property.address?.city} - {property.address?.pincode}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-indigo-600">₹{property.price?.amount?.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">per {property.price?.period}</p>
                </div>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
                <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl">
                    <BedDouble className="text-indigo-500 mb-2" />
                    <span className="font-bold text-slate-700">{property.bedrooms}</span>
                    <span className="text-xs text-slate-500">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl">
                    <Bath className="text-indigo-500 mb-2" />
                    <span className="font-bold text-slate-700">{property.bathrooms}</span>
                    <span className="text-xs text-slate-500">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl">
                    <Layers className="text-indigo-500 mb-2" />
                    <span className="font-bold text-slate-700">{property.totalArea}</span>
                    <span className="text-xs text-slate-500">Sq. Ft.</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl">
                    <Sofa className="text-indigo-500 mb-2" />
                    <span className="font-bold text-slate-700">{property.furnishingStatus}</span>
                    <span className="text-xs text-slate-500">Furnishing</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-600">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact & Booking */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Owner Details</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                  {property.owner?.firstname?.[0] || <User />}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    {property.owner?.firstname || "Property Owner"} {property.owner?.lastname || ""}
                  </p>
                  <p className="text-xs text-slate-500">Property Owner</p>
                </div>
              </div>

              <div className="space-y-4">
                {property.owner?.phone && (
                  <button 
                  onClick={() =>
                    checkAuth(() => {
                      window.location.href = "tel:+916397356013";
                    })
                  }
                    className="w-full flex items-center justify-center gap-2 py-3 border border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition"
                  >
                    <Phone size={18} /> Call Owner
                  </button>
                )}
                
                <button 
                  onClick={() => checkAuth(() => setIsEnquiryModalOpen(true))}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg hover:shadow-xl transition"
                >
                  <Mail size={18} /> Send Enquiry
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="font-semibold text-slate-700 mb-3">Availability</h3>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Calendar size={16} />
                  <span>Available from {new Date(property.availableFrom).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Visit Modal */}
      <AnimatePresence>
        {isVisitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800">Schedule a Visit</h3>
                <button 
                  onClick={() => setIsVisitModalOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleVisitSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={visitForm.name}
                    onChange={handleVisitChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={visitForm.email}
                    onChange={handleVisitChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={visitForm.phone}
                    onChange={handleVisitChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={visitForm.date}
                      onChange={handleVisitChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={visitForm.time}
                      onChange={handleVisitChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={visitForm.message}
                    onChange={handleVisitChange}
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition resize-none"
                    placeholder="Any specific questions or preferences?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={visitLoading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {visitLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Confirm Visit"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800">Send Enquiry</h3>
                <button 
                  onClick={() => setIsEnquiryModalOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleEnquirySubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={enquiryForm.name}
                    onChange={handleEnquiryChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={enquiryForm.email}
                    onChange={handleEnquiryChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="number"
                    value={enquiryForm.number}
                    onChange={handleEnquiryChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={enquiryForm.city}
                    onChange={handleEnquiryChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about requirement</label>
                  <textarea
                    name="message"
                    value={enquiryForm.message}
                    onChange={handleEnquiryChange}
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition resize-none"
                    placeholder="What kind of property are you looking for?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={enquiryLoading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {enquiryLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Submit Enquiry"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
