import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MapPin, Pencil, Trash2, Home, RefreshCw, Building2, X, Mail, Phone, LogOut, Save, LayoutDashboard, Users, TrendingUp, Wallet } from "lucide-react";
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

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 relative overflow-hidden group"
    >
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:scale-110 transition-transform duration-500 ${color}`} />
      <div className="flex items-center gap-4 relative z-10">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-white shadow-sm`}>
           <div className={`p-2 rounded-lg ${color}`}>
             <Icon size={24} className="text-white" />
           </div>
        </div>
        <div>
          <p className="text-slate-500 text-sm font-medium">{label}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50 to-slate-50 -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-40 left-0 w-[300px] h-[300px] bg-fuchsia-200/20 rounded-full blur-[80px] -z-10" />

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      
      {/* Header */}
      <header className="sticky top-0 z-40 px-6 py-4 bg-white/70 backdrop-blur-2xl border-b border-white/40 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-500/30 text-white">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                Owner Dashboard
              </h1>
              <p className="text-xs text-slate-500 font-medium">Manage your properties</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>{navigate("/pg-owner/create-property")}} 
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all font-medium border border-white/10"
            >
              <Plus size={18} /> <span className="hidden sm:inline">Add Property</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-white border border-slate-200 hover:border-indigo-200 rounded-full shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-9 h-9 bg-gradient-to-tr from-indigo-100 to-violet-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm shadow-inner group-hover:scale-110 transition-transform">
                {userData.firstname?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs text-slate-400 font-medium leading-none mb-1">Welcome,</p>
                <p className="text-sm text-slate-700 font-bold leading-none">{userData.firstname || "Owner"}</p>
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 border border-white/50"
            >
              {/* Modal Header Decor */}
              <div className="h-32 bg-gradient-to-r from-purple-400 to-red-400 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <button 
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setIsEditingProfile(false);
                  }} 
                  className="absolute top-4 right-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition backdrop-blur-sm"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-8 pb-8 -mt-12 relative">
                <div className="flex flex-col items-center mb-6">
                   <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-violet-600 text-4xl font-bold mb-4 shadow-xl ring-4 ring-violet-600 relative z-10"
                   >
                     {userData.firstname?.[0]?.toUpperCase()}{userData.lastname?.[0]?.toUpperCase()}
                   </motion.div>
                   
                   {!isEditingProfile && (
                     <div className="text-center">
                      <h2 className="text-2xl font-bold text-slate-800">{userData.firstname} {userData.lastname}</h2>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mt-2 border border-indigo-100">
                        <Building2 size={12} /> PG Owner
                      </div>
                     </div>
                   )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">First Name</label>
                        <input
                          type="text"
                          value={userData.firstname}
                          onChange={(e) => setUserData({...userData, firstname: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Last Name</label>
                        <input
                          type="text"
                          value={userData.lastname}
                          onChange={(e) => setUserData({...userData, lastname: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition-all"
                        required
                      />
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="flex-1 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={profileLoading}
                        className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all text-sm flex items-center justify-center gap-2"
                      >
                        {profileLoading ? "Saving..." : <><Save size={18} /> Save Changes</>}
                      </button>
                    </div>
                  </form>
                ) : (
                   <div className="space-y-6">
                     <div className="space-y-4">
                       <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                           <Mail size={20} />
                         </div>
                         <div className="flex-1">
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Address</p>
                           <p className="text-sm text-slate-700 font-semibold break-all">{userData.email}</p>
                         </div>
                       </div>
                       
                       <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                           <Phone size={20} />
                         </div>
                         <div className="flex-1">
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phone Number</p>
                           <p className="text-sm text-slate-700 font-semibold">{userData.phone || "Not provided"}</p>
                         </div>
                       </div>
                     </div>

                     <div className="grid grid-cols-2 gap-3 pt-2">
                       <button 
                         onClick={() => setIsEditingProfile(true)}
                         className="flex justify-center items-center gap-2 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition text-sm"
                       >
                         <Pencil size={18} /> Edit Profile
                       </button>
                       <button
                         onClick={handleLogout}
                         className="flex justify-center items-center gap-2 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition text-sm"
                       >
                         <LogOut size={18} /> Logout
                       </button>
                     </div>
                   </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
      

        <div className="flex justify-between items-end">
          <div>
             <h2 className="text-2xl font-bold text-slate-800">Your Properties</h2>
             <p className="text-slate-500 text-sm mt-1">Manage and track all your listed properties</p>
          </div>
          <button 
            onClick={() => fetchProperties(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium text-sm"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin text-indigo-600" : ""} />
            {isRefreshing ? "Refreshing..." : "Refresh List"}
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-medium">Loading your empire...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24 bg-white/60 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
               <Building2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No properties found</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">It looks like you haven't listed any properties yet. Start your journey today!</p>
            <button onClick={()=>{navigate("/pg-owner/create-property")}} className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20">
              Create First Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden group border border-slate-100"
              >
                <div className="relative cursor-pointer overflow-hidden h-56" onClick={() => navigate(`/pg-owner/properties/${property.id}`)}>
                  <img
                    src={property.displayImage}
                    alt={property.title}
                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-indigo-600 shadow-lg flex items-center gap-1">
                    <Building2 size={12} /> {property.propertyType}
                  </div>
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">
                    {property.furnishingStatus}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                    <div>
                      <p className="text-xs font-medium text-white/80 flex items-center gap-1 mb-1">
                        <MapPin size={12} /> {property.address?.city || "City"}
                      </p>
                      <h3 className="text-lg font-bold leading-tight line-clamp-1 text-shadow-sm" title={property.title}>
                        {property.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                     <div className="text-indigo-600">
                        <span className="text-xs font-semibold uppercase text-slate-400 block mb-0.5">Rent</span>
                        <span className="text-xl font-extrabold">{property.displayPrice}</span>
                     </div>
                     <div className="text-right">
                        <span className="text-xs font-semibold uppercase text-slate-400 block mb-0.5">Area</span>
                        <span className="text-sm font-bold text-slate-700">{property.totalArea || 0} sqft</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-6">
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                      <span className="font-bold text-slate-700 text-sm">{property.bedrooms || 0}</span> Bedrooms
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                      <span className="font-bold text-slate-700 text-sm">{property.bathrooms || 1}</span> Bathrooms
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                     <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleEdit(property)}
                      className="flex justify-center items-center gap-2 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition text-sm border border-indigo-100"
                    >
                      <Pencil size={16} /> Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDelete(property.id)}
                      className="flex justify-center items-center gap-2 py-3 bg-white text-rose-500 font-bold rounded-xl hover:bg-rose-50 transition text-sm border border-slate-200 hover:border-rose-200"
                    >
                      <Trash2 size={16} /> Delete
                    </motion.button>
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
