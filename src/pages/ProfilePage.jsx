import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, LogOut, Save, Pencil } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "",
    id: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      navigate("/login");
      return;
    }

    setUserData({
      firstname: localStorage.getItem("userFirstName") || "",
      lastname: localStorage.getItem("userLastName") || "",
      email: localStorage.getItem("userEmail") || "",
      phone: localStorage.getItem("userPhone") || "",
      role: localStorage.getItem("userRole") || "tenant",
      id: localStorage.getItem("userId") || ""
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 500);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

    try {
      const response = await fetch(`${apiUrl}/users/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userFirstName", userData.firstname);
        localStorage.setItem("userLastName", userData.lastname);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userPhone", userData.phone);
        
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-center" theme="colored" />
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="h-40 bg-gradient-to-r from-indigo-600 to-violet-600 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          </div>
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-6 gap-6">
              <div className="w-32 h-32 bg-white rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-indigo-50 rounded-2xl flex items-center justify-center text-4xl font-bold text-indigo-600">
                  {userData.firstname?.[0]?.toUpperCase()}
                </div>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-3xl font-bold text-slate-900">{userData.firstname} {userData.lastname}</h1>
                <p className="text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">
                    {userData.role}
                  </span>
                  <span className="text-sm">{userData.email}</span>
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Profile Details</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition flex items-center gap-2"
              >
                <Pencil size={18} /> Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
             <form onSubmit={handleUpdate} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                   <input
                     type="text"
                     value={userData.firstname}
                     onChange={(e) => setUserData({...userData, firstname: e.target.value})}
                     className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                     required
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                   <input
                     type="text"
                     value={userData.lastname}
                     onChange={(e) => setUserData({...userData, lastname: e.target.value})}
                     className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                     required
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Email</label>
                   <input
                     type="email"
                     value={userData.email}
                     disabled
                     className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                   />
                   <p className="text-xs text-slate-400">Email cannot be changed</p>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Phone</label>
                   <input
                     type="tel"
                     value={userData.phone}
                     onChange={(e) => setUserData({...userData, phone: e.target.value})}
                     className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                   />
                 </div>
               </div>
               
               <div className="flex gap-4 pt-4">
                 <button
                   type="button"
                   onClick={() => setIsEditing(false)}
                   className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition"
                 >
                   Cancel
                 </button>
                 <button
                   type="submit"
                   disabled={loading}
                   className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center gap-2"
                 >
                   {loading ? "Saving..." : <><Save size={18} /> Save Changes</>}
                 </button>
               </div>
             </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</p>
                  <p className="text-lg font-bold text-slate-800">{userData.firstname} {userData.lastname}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="text-lg font-bold text-slate-800">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="text-lg font-bold text-slate-800">{userData.phone || "Not provided"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
