import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, MapPin, Pencil, Trash2, Home, RefreshCw, Building2, X, Mail, Phone, LogOut, Save } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function PgDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Profile State
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const navigate = useNavigate()

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchProperties();
    if (userId) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`);
      const data = await response.json();
      if (response.ok && data.data) {
        setUserData(data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Profile updated successfully");
        setIsEditingProfile(false);
        // Update local storage if email changed (optional)
        if (userData.email) localStorage.setItem("userEmail", userData.email);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const fetchProperties = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const response = await fetch(`${apiUrl}/properties`);
      const data = await response.json();

      if (response.ok) {
        // Map backend data to frontend structure if necessary
        // Assuming backend returns { data: { properties: [...] } } based on getAllProperties controller
        const fetchedProperties = data.data?.properties || [];
        
        const formattedProperties = fetchedProperties.map((p) => ({
          ...p, // Keep all original data for editing
          id: p._id,
          displayLocation: `${p.address?.locality || ""}, ${p.address?.city || ""}`,
          displayPrice: `₹${p.price?.amount || 0} / month`,
          displayImage: p.images?.[0]?.url || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        }));

        setProperties(formattedProperties);
      } else {
        toast.error(data.message || "Failed to fetch properties");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Network error");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleEdit = (property) => {
    navigate("/pg-owner/create-property", { state: { propertyToEdit: property } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      const response = await fetch(`${apiUrl}/properties/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProperties(properties.filter((p) => p.id !== id));
        toast.success("Property deleted successfully");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Home className="text-indigo-600" />
          <h1 className="text-xl font-semibold text-slate-800">
            PG Owner Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2 hover:bg-slate-100 px-3 py-1.5 rounded-full transition cursor-pointer"
          >
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
              {userData.firstname?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="text-slate-700 font-medium hidden sm:block">
              {userData.firstname || "Owner"}
            </span>
          </button>
          <button onClick={()=>{navigate("/pg-owner/create-property")}} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition shadow-sm">
            <Plus size={18} /> <span className="hidden sm:inline">Add Property</span>
          </button>
        </div>
      </header>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
          >
            <button 
              onClick={() => {
                setIsProfileModalOpen(false);
                setIsEditingProfile(false);
              }} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition"
            >
              <X size={20} />
            </button>
            
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                 <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold mb-4 ring-4 ring-white shadow-lg">
                   {userData.firstname?.[0]?.toUpperCase()}{userData.lastname?.[0]?.toUpperCase()}
                 </div>
                 {!isEditingProfile && (
                   <>
                    <h2 className="text-xl font-bold text-slate-800">{userData.firstname} {userData.lastname}</h2>
                    <p className="text-slate-500 text-sm font-medium bg-slate-100 px-3 py-1 rounded-full mt-2">PG Owner Account</p>
                   </>
                 )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">First Name</label>
                      <input
                        type="text"
                        value={userData.firstname}
                        onChange={(e) => setUserData({...userData, firstname: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={userData.lastname}
                        onChange={(e) => setUserData({...userData, lastname: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                      required
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="flex-1 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition text-sm flex items-center justify-center gap-2"
                    >
                      {profileLoading ? "Saving..." : <><Save size={16} /> Save Changes</>}
                    </button>
                  </div>
                </form>
              ) : (
                 <div className="space-y-6">
                   <div className="space-y-4">
                     <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                       <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm">
                         <Mail size={18} />
                       </div>
                       <div>
                         <p className="text-xs text-slate-400 font-medium">Email Address</p>
                         <p className="text-sm text-slate-700 font-medium break-all">{userData.email}</p>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                       <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm">
                         <Phone size={18} />
                       </div>
                       <div>
                         <p className="text-xs text-slate-400 font-medium">Phone Number</p>
                         <p className="text-sm text-slate-700 font-medium">{userData.phone || "Not provided"}</p>
                       </div>
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 pt-2">
                     <button 
                       onClick={() => setIsEditingProfile(true)}
                       className="flex justify-center items-center gap-2 py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-xl hover:bg-indigo-100 transition text-sm"
                     >
                       <Pencil size={16} /> Edit Profile
                     </button>
                     <button
                       onClick={handleLogout}
                       className="flex justify-center items-center gap-2 py-2.5 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition text-sm"
                     >
                       <LogOut size={16} /> Logout
                     </button>
                   </div>
                 </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Content */}
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          
            Your Properties
          </h2>
          <button 
            onClick={() => fetchProperties(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-100 transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <RefreshCw size={18} className={isRefreshing ? "animate-spin text-indigo-600" : ""} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-slate-500 text-lg">No properties found.</p>
            <p className="text-slate-400 text-sm mt-2">Add a new property to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition relative group"
              >
                <div className="relative cursor-pointer" onClick={() => navigate(`/pg-owner/properties/${property.id}`)}>
                  <img
                    src={property.displayImage}
                    alt={property.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-indigo-600 shadow-sm">
                    {property.propertyType}
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-white">
                    {property.furnishingStatus}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1" title={property.title}>
                      {property.title}
                    </h3>
                    <p className="text-indigo-600 font-bold whitespace-nowrap">
                      {property.displayPrice}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="truncate">{property.displayLocation}</span>
                  </div>

                  <div className="flex gap-4 text-xs text-slate-500 mb-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-700">{property.bedrooms || 0}</span> Beds
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-700">{property.bathrooms || 1}</span> Baths
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-700">{property.totalArea || 0}</span> sqft
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                     <button 
                      onClick={() => handleEdit(property)}
                      className="flex justify-center items-center gap-2 py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-xl hover:bg-indigo-100 transition text-sm"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="flex justify-center items-center gap-2 py-2.5 bg-red-50 text-red-500 font-medium rounded-xl hover:bg-red-100 transition text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
