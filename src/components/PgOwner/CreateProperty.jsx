import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Upload,
  MapPin,
  IndianRupee,
  FileText,
  Home,
  BedDouble,
  Bath,
  Sofa,
  Layers,
  Calendar,
  Users,
  LocateFixed,
  Store,
} from "lucide-react";

const PROPERTY_TYPES = [
  "PG", "1BHK", "2BHK", "3BHK", "Villa", "Studio", "Shared Room", "Independent House", "Shop"
];

const FURNISHING = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

const AMENITIES = [
  "WiFi", "Parking", "Lift", "Power Backup", "CCTV", "AC", "Washing Machine",
  "Bed", "Wardrobe", "Gym", "Housekeeping",
];

export default function CreateProperty() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    propertyType: "PG",
    price: "",
    securityDeposit: "",
    street: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    latitude: "",
    longitude: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    floor: "",
    totalFloors: "",
    furnishingStatus: "Semi Furnished",
    totalArea: "",
    preferredTenant: "Both",
    foodType: "Both",
    noticePeriod: "",
    description: "",
    availableFrom: "",
    availableTo: "",
    amenities: [],
  });

  useEffect(() => {
    if (location.state?.propertyToEdit) {
      const p = location.state.propertyToEdit;
      setIsEditMode(true);
      setEditId(p._id || p.id);
      
      // Populate form data
      setFormData({
        title: p.title || "",
        propertyType: p.propertyType || "PG",
        price: p.price?.amount || "",
        securityDeposit: p.securityDeposit || "",
        street: p.address?.street || "",
        locality: p.address?.locality || "",
        city: p.address?.city || "",
        state: p.address?.state || "",
        pincode: p.address?.pincode || "",
        landmark: p.address?.landmark || "",
        latitude: p.location?.coordinates?.[1] || "",
        longitude: p.location?.coordinates?.[0] || "",
        bedrooms: p.bedrooms || "",
        bathrooms: p.bathrooms || "",
        balconies: p.balconies || "",
        floor: p.floor || "",
        totalFloors: p.totalFloors || "",
        furnishingStatus: p.furnishingStatus || "Semi Furnished",
        totalArea: p.totalArea || "",
        preferredTenant: p.pgDetails?.preferredTenant || "Both",
        foodType: p.pgDetails?.foodType || "Both",
        noticePeriod: p.pgDetails?.noticePeriod || "",
        description: p.description || "",
        availableFrom: p.availableFrom ? new Date(p.availableFrom).toISOString().split('T')[0] : "",
        availableTo: p.availableTo ? new Date(p.availableTo).toISOString().split('T')[0] : "",
        amenities: p.amenities || [],
        imageBase64: p.images?.[0]?.url || ""
      });
      
      if(p.images?.[0]?.url) {
        setPreview(p.images[0].url);
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (item) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(item)
        ? prev.amenities.filter((a) => a !== item)
        : [...prev.amenities, item],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create local preview
      setPreview(URL.createObjectURL(file));
      
      // Convert to Base64 for backend submission
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    toast.info("Fetching location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        toast.success("Location fetched successfully!");
      },
      (error) => {
        console.error("Error fetching location:", error);
        toast.error("Unable to retrieve your location");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const userId = localStorage.getItem("userId");
    // if (!userId) {
    //   toast.error("Please login first");
    //   setLoading(false);
    //   return;
    // }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
      const method = isEditMode ? "PUT" : "POST";
      const url = isEditMode ? `${apiUrl}/properties/${editId}` : `${apiUrl}/properties`;
      
      // Construct payload matching Mongoose schema
      const payload = {
        owner: localStorage.getItem("userId") || undefined, // Optional owner (omitted if not logged in)
        title: formData.title,
        description: formData.description,
        propertyType: formData.propertyType,
        price: {
          amount: Number(formData.price),
          period: "month",
          currency: "INR"
        },
        securityDeposit: Number(formData.securityDeposit) || 0,
        address: {
          street: formData.street,
          locality: formData.locality,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          landmark: formData.landmark,
          country: "India"
        },
        location: {
            type: "Point",
            coordinates: [
              Number(formData.longitude) || 77.2090, 
              Number(formData.latitude) || 28.6139
            ] 
        },
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 1,
        balconies: Number(formData.balconies) || 0,
        floor: Number(formData.floor) || 0,
        totalFloors: Number(formData.totalFloors) || 1,
        furnishingStatus: formData.furnishingStatus,
        totalArea: Number(formData.totalArea) || 100,
        amenities: formData.amenities,
        pgDetails: {
          preferredTenant: formData.preferredTenant,
          foodType: formData.foodType,
          noticePeriod: Number(formData.noticePeriod) || 30
        },
        availableFrom: formData.availableFrom || new Date(),
        availableTo: formData.availableTo || new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        images: [{
          url: formData.imageBase64 || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          publicId: "dummy_" + Date.now(), // Mock ID until upload is implemented
          order: 0
        }]
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(isEditMode ? "Property updated successfully!" : "Property created successfully!");
        setTimeout(() => navigate("/pg-owner/dashboard"), 1500);
      } else {
        if (data.errors && data.errors.length > 0) {
            // Show specific backend validation errors
            data.errors.forEach(err => toast.error(err));
        } else {
            toast.error(data.message || "Failed to create property");
        }
        console.error("Backend validation error:", data);
      }
    } catch (error) {
      console.error("Error creating property:", error);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50 to-slate-50 -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px] -z-10" />
      
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <header className="sticky top-0 z-40 px-6 py-4 bg-white/70 backdrop-blur-2xl border-b border-white/40 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              {isEditMode ? "Edit Property" : "Create New Property"}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {isEditMode ? "Update property details" : "Fill details exactly as per property schema"}
            </p>
          </div>
          <button 
            type="button" 
            onClick={() => navigate("/pg-owner/dashboard")}
            className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all font-medium"
          >
            Cancel
          </button>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Images */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                   <Upload size={20} /> 
                </div>
                Property Images
              </h2>
              <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/30 rounded-2xl p-8 text-center hover:bg-indigo-50 transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="image" className="cursor-pointer block w-full h-full">
                  {preview ? (
                    <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                      <img
                        src={preview}
                        className="mx-auto h-64 w-full object-cover rounded-xl shadow-lg"
                        alt="Property Preview"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <p className="text-white font-medium flex items-center gap-2"><Upload size={18} /> Change Image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-500 py-10">
                      <div className="p-5 bg-white rounded-full text-indigo-600 shadow-md group-hover:scale-110 transition-transform">
                        <Upload size={32} />
                      </div>
                      <span className="font-semibold text-lg text-slate-700">Click to upload property image</span>
                      <span className="text-sm text-slate-400">JPG, PNG supported (Max 5MB)</span>
                    </div>
                  )}
                </label>
              </div>
            </section>

            {/* Basic Info */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                       <FileText size={20} />
                    </div>
                    Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="label block text-sm font-bold text-slate-600 mb-2">Title <span className="text-red-500">*</span></label>
                    <input 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" 
                        placeholder="e.g. Spacious PG near metro" 
                    />
                </div>
                <div>
                    <label className="label block text-sm font-bold text-slate-600 mb-2">Property Type</label>
                    <div className="relative">
                       <select 
                           name="propertyType"
                           value={formData.propertyType}
                           onChange={handleChange}
                           className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium appearance-none"
                       >
                       {PROPERTY_TYPES.map((t) => (
                           <option key={t} value={t}>{t}</option>
                       ))}
                       </select>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                       </div>
                    </div>
                </div>
                <div>
                    <label className="label block text-sm font-bold text-slate-600 mb-2">Price (Monthly) <span className="text-red-500">*</span></label>
                    <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <IndianRupee size={18} />
                    </div>
                    <input 
                        type="number" 
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full p-3.5 pl-11 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" 
                        placeholder="0.00"
                    />
                    </div>
                </div>
                <div>
                    <label className="label block text-sm font-bold text-slate-600 mb-2">Security Deposit</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <IndianRupee size={18} />
                        </div>
                        <input 
                            type="number" 
                            name="securityDeposit"
                            value={formData.securityDeposit}
                            onChange={handleChange}
                            className="w-full p-3.5 pl-11 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" 
                            placeholder="0.00"
                        />
                    </div>
                </div>
                </div>
            </section>

            {/* Address */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                        <MapPin size={20} />
                    </div>
                    Address & Location
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-full">
                     <label className="label block text-sm font-bold text-slate-600 mb-2">Street Address</label>
                     <input name="street" value={formData.street} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="House/Flat No, Street Name" required />
                  </div>
                  
                  <div>
                    <label className="label block text-sm font-bold text-slate-600 mb-2">Locality</label>
                    <input name="locality" value={formData.locality} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="Sector, Area" required />
                  </div>
                  
                  <div>
                    <label className="label block text-sm font-bold text-slate-600 mb-2">City</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="City" required />
                  </div>
                  
                  <div>
                    <label className="label block text-sm font-bold text-slate-600 mb-2">State</label>
                    <input name="state" value={formData.state} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="State" required />
                  </div>
                  
                  <div>
                    <label className="label block text-sm font-bold text-slate-600 mb-2">Pincode</label>
                    <input name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="6 digits" required maxLength={6} minLength={6} pattern="\d{6}" />
                  </div>
                  
                  <div className="col-span-full">
                    <label className="label block text-sm font-bold text-slate-600 mb-2">Landmark (Optional)</label>
                    <input name="landmark" value={formData.landmark} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="Near..." />
                  </div>
                  
                  <div className="col-span-full pt-4 border-t border-slate-100">
                    <label className="label block text-sm font-bold text-slate-600 mb-3">Map Coordinates (Auto-fetch recommended)</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input name="latitude" value={formData.latitude} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="Latitude" type="number" step="any" />
                      <input name="longitude" value={formData.longitude} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="Longitude" type="number" step="any" />
                      <button 
                        type="button" 
                        onClick={handleGetLocation}
                        className="p-3.5 rounded-xl bg-indigo-50 text-indigo-600 font-bold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 border border-indigo-100 shadow-sm"
                      >
                        <LocateFixed size={18} /> Auto-Detect
                      </button>
                    </div>
                  </div>
                </div>
            </section>

            {/* Property Details */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                        <Home size={20} />
                    </div>
                    Property Specs
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Bedrooms</label>
                    <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="0" />
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Bathrooms</label>
                    <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="1" required />
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Balconies</label>
                    <input type="number" name="balconies" value={formData.balconies} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="0" />
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Total Area (sqft)</label>
                    <input type="number" name="totalArea" value={formData.totalArea} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="100" required />
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Floor No.</label>
                    <input type="number" name="floor" value={formData.floor} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="0" />
                </div>
                 <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Total Floors</label>
                    <input type="number" name="totalFloors" value={formData.totalFloors} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="1" />
                </div>

                {/* Shop Field */}
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2 flex items-center gap-1"><Store size={14} /> Shop Available</label>
                    <select
                        name="shop"
                        value={formData.shop || "false"}
                        onChange={handleChange}
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium appearance-none"
                    >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>
                </div>
            </section>

            {/* Furnishing */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <label className="label block text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <div className="p-1.5 bg-pink-50 rounded-lg text-pink-600">
                    <Sofa size={18} />
                 </div>
                 Furnishing Status
              </label>
              <div className="flex gap-3 flex-wrap">
                {FURNISHING.map((f) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setFormData({...formData, furnishingStatus: f})}
                    className={`px-5 py-3 rounded-xl border font-medium transition-all ${
                        formData.furnishingStatus === f 
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200" 
                        : "hover:bg-indigo-50 border-slate-200 text-slate-600 bg-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <label className="label block text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <div className="p-1.5 bg-teal-50 rounded-lg text-teal-600">
                    <Layers size={18} />
                 </div>
                 Amenities
              </label>
              <div className="flex flex-wrap gap-3">
                {AMENITIES.map((a) => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={`px-4 py-2.5 rounded-xl border font-medium transition-all flex items-center gap-2 ${
                      formData.amenities.includes(a)
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                        : "hover:bg-slate-50 border-slate-200 text-slate-600 bg-white"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </section>

            {/* PG Details */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                        <Users size={20} />
                    </div>
                    PG Specifics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Preferred Tenant</label>
                    <select name="preferredTenant" value={formData.preferredTenant} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium appearance-none">
                        <option value="Both">Both</option>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                    </select>
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Food Type</label>
                    <select name="foodType" value={formData.foodType} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium appearance-none">
                        <option value="Both">Both</option>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Notice Period (Days)</label>
                    <input
                        type="number"
                        name="noticePeriod"
                        value={formData.noticePeriod}
                        onChange={handleChange}
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                        placeholder="30"
                    />
                </div>
                </div>
            </section>

            {/* Description */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <label className="label block text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <div className="p-1.5 bg-yellow-50 rounded-lg text-yellow-600">
                    <FileText size={18} />
                 </div>
                 Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5} 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all min-h-[150px] font-medium leading-relaxed resize-y" 
                placeholder="Describe your property in detail..."
                required
                minLength={20}
              />
            </section>

            {/* Availability */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                        <Calendar size={20} />
                    </div>
                    Availability
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Available From</label>
                    <input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" />
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-2">Available To</label>
                    <input type="date" name="availableTo" value={formData.availableTo} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" required />
                </div>
                </div>
            </section>

            {/* Actions */}
            <div className="flex justify-end pt-6 border-t border-slate-200 mt-8">
              <button 
                type="submit" 
                disabled={loading}
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-1 transition-all font-bold text-lg disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none flex items-center gap-3"
              >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                    </>
                ) : (
                    isEditMode ? "Update Property" : "Publish Property"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
