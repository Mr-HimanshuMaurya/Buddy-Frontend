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
} from "lucide-react";

const PROPERTY_TYPES = [
  "PG", "1BHK", "2BHK", "3BHK", "Villa", "Studio", "Shared Room", "Independent House",
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
            coordinates: [77.2090, 28.6139] // Default: New Delhi (TODO: Get real coords from address)
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
    <div className="min-h-screen bg-slate-100">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
            <h1 className="text-xl font-semibold text-slate-800">
            {isEditMode ? "Edit Property" : "Create New Property"}
            </h1>
            <p className="text-sm text-slate-500">
            {isEditMode ? "Update property details" : "Fill details exactly as per property schema"}
            </p>
        </div>
        <button 
            type="button" 
            onClick={() => navigate("/pg-owner/dashboard")}
            className="text-slate-500 hover:text-slate-800"
        >
            Cancel
        </button>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Images */}
            <section>
              <h2 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Upload size={20} /> Property Images
              </h2>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="image" className="cursor-pointer block">
                  {preview ? (
                    <img
                      src={preview}
                      className="mx-auto h-64 rounded-xl object-cover shadow-md"
                      alt="Property Preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500 py-10">
                      <div className="p-4 bg-indigo-50 rounded-full text-indigo-600">
                        <Upload size={30} />
                      </div>
                      <span className="font-medium">Click to upload property image</span>
                      <span className="text-xs text-slate-400">JPG, PNG supported</span>
                    </div>
                  )}
                </label>
              </div>
            </section>

            {/* Basic Info */}
            <section>
                <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <FileText size={20} /> Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="label block text-sm font-medium text-slate-700 mb-1">Title <span className="text-red-500">*</span></label>
                    <input 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="input w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                        placeholder="e.g. Spacious PG near metro" 
                    />
                </div>
                <div>
                    <label className="label block text-sm font-medium text-slate-700 mb-1">Property Type</label>
                    <select 
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="input w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                    {PROPERTY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <label className="label block text-sm font-medium text-slate-700 mb-1">Price (Monthly) <span className="text-red-500">*</span></label>
                    <div className="relative">
                    <div className="absolute left-3 top-3.5 text-slate-400">
                        <IndianRupee size={18} />
                    </div>
                    <input 
                        type="number" 
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="input w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                        placeholder="0.00"
                    />
                    </div>
                </div>
                <div>
                    <label className="label block text-sm font-medium text-slate-700 mb-1">Security Deposit</label>
                    <div className="relative">
                        <div className="absolute left-3 top-3.5 text-slate-400">
                            <IndianRupee size={18} />
                        </div>
                        <input 
                            type="number" 
                            name="securityDeposit"
                            value={formData.securityDeposit}
                            onChange={handleChange}
                            className="input w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                            placeholder="0.00"
                        />
                    </div>
                </div>
                </div>
            </section>

            {/* Address */}
            <section>
                <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <MapPin size={20} /> Address & Location
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input name="street" value={formData.street} onChange={handleChange} className="input p-3 border rounded-xl" placeholder="Street Address" required />
                <input name="locality" value={formData.locality} onChange={handleChange} className="input p-3 border rounded-xl" placeholder="Locality" required />
                <input name="city" value={formData.city} onChange={handleChange} className="input p-3 border rounded-xl" placeholder="City" required />
                <input name="state" value={formData.state} onChange={handleChange} className="input p-3 border rounded-xl" placeholder="State" required />
                <input name="pincode" value={formData.pincode} onChange={handleChange} className="input p-3 border rounded-xl" placeholder="Pincode (6 digits)" required maxLength={6} minLength={6} pattern="\d{6}" />
                <input name="landmark" value={formData.landmark} onChange={handleChange} className="input p-3 border rounded-xl" placeholder="Landmark (optional)" />
                </div>
            </section>

            {/* Property Details */}
            <section>
                <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <Home size={20} /> Property Specs
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Bedrooms</label>
                    <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="input w-full p-3 border rounded-xl" placeholder="0" />
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Bathrooms</label>
                    <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="input w-full p-3 border rounded-xl" placeholder="1" required />
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Balconies</label>
                    <input type="number" name="balconies" value={formData.balconies} onChange={handleChange} className="input w-full p-3 border rounded-xl" placeholder="0" />
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Total Area (sqft)</label>
                    <input type="number" name="totalArea" value={formData.totalArea} onChange={handleChange} className="input w-full p-3 border rounded-xl" placeholder="100" required />
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Floor No.</label>
                    <input type="number" name="floor" value={formData.floor} onChange={handleChange} className="input w-full p-3 border rounded-xl" placeholder="0" />
                </div>
                 <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Total Floors</label>
                    <input type="number" name="totalFloors" value={formData.totalFloors} onChange={handleChange} className="input w-full p-3 border rounded-xl" placeholder="1" />
                </div>
                </div>
            </section>

            {/* Furnishing */}
            <section>
              <label className="label block text-sm font-medium text-slate-700 mb-2">Furnishing Status</label>
              <div className="flex gap-3 flex-wrap">
                {FURNISHING.map((f) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setFormData({...formData, furnishingStatus: f})}
                    className={`px-4 py-2 rounded-xl border transition-all ${
                        formData.furnishingStatus === f 
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md" 
                        : "hover:bg-indigo-50 border-slate-300 text-slate-600"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section>
              <label className="label block text-sm font-medium text-slate-700 mb-2">Amenities</label>
              <div className="flex flex-wrap gap-3">
                {AMENITIES.map((a) => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={`px-4 py-2 rounded-xl border transition-all ${
                      formData.amenities.includes(a)
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                        : "hover:bg-slate-100 border-slate-300 text-slate-600"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </section>

            {/* PG Details */}
            <section>
                <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <Users size={20} /> PG Specifics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Preferred Tenant</label>
                    <select name="preferredTenant" value={formData.preferredTenant} onChange={handleChange} className="input w-full p-3 border rounded-xl">
                        <option value="Both">Both</option>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                    </select>
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Food Type</label>
                    <select name="foodType" value={formData.foodType} onChange={handleChange} className="input w-full p-3 border rounded-xl">
                        <option value="Both">Both</option>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Notice Period (Days)</label>
                    <input
                        type="number"
                        name="noticePeriod"
                        value={formData.noticePeriod}
                        onChange={handleChange}
                        className="input w-full p-3 border rounded-xl"
                        placeholder="30"
                    />
                </div>
                </div>
            </section>

            {/* Description */}
            <section>
              <label className="label block text-sm font-medium text-slate-700 mb-2">Description <span className="text-red-500">*</span></label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5} 
                className="input w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" 
                placeholder="Describe your property in detail..."
                required
                minLength={20}
              />
            </section>

            {/* Availability */}
            <section>
                <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <Calendar size={20} /> Availability
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Available From</label>
                    <input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} className="input w-full p-3 border rounded-xl" />
                </div>
                <div>
                    <label className="label block text-xs font-bold uppercase text-slate-500 mb-1">Available To</label>
                    <input type="date" name="availableTo" value={formData.availableTo} onChange={handleChange} className="input w-full p-3 border rounded-xl" required />
                </div>
                </div>
            </section>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <button 
                type="button" 
                onClick={() => navigate("/pg-owner/dashboard")}
                className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 font-medium text-slate-700"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {isEditMode ? "Updating..." : "Creating..."}
                    </>
                ) : (
                    isEditMode ? "Update Property" : "Create Property"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
