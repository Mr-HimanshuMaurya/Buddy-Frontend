import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Home, Info, Building2, Phone, UserCircle,
  LogIn, ChevronRight, LogOut, Mail, Pencil, User, Save
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import logo from "../assets/PG.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
const [profileLoading, setProfileLoading] = useState(false);

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";



  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Check auth status
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated");
      if (auth === "true") {
        setUserData({
          firstname: localStorage.getItem("userFirstName") || "User",
          lastname: localStorage.getItem("userLastName") || "",
          email: localStorage.getItem("userEmail") || "",
          phone: localStorage.getItem("userPhone") || "",
          role: localStorage.getItem("userRole") || "tenant"
        });
      } else {
        setUserData(null);
      }
    };

    checkAuth();
    // Listen for custom event or storage event if needed, but simplistic check works for now
  }, [location.pathname]); // Re-check on route change (e.g. coming back from login)

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    const userId = localStorage.getItem("userId");
    
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      
      if (response.ok) {
        // Update local storage
        localStorage.setItem("userFirstName", userData.firstname);
        localStorage.setItem("userLastName", userData.lastname);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userPhone", userData.phone);
        
        setIsEditingProfile(false);
      } else {
        console.error("Failed to update profile:", data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    setIsProfileModalOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    { name: "Properties", path: "/properties", icon: Building2 },
    { name: "For PG Owners", path: "/pg-owner-login", icon: UserCircle },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <>
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar theme="colored" />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 ${
          scrolled ? "pt-4" : "pt-6"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-300 rounded-2xl md:rounded-full border ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl shadow-lg border-white/40 py-3 px-6"
              : "bg-white/50 backdrop-blur-md shadow-sm border-white/20 py-4 px-8"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* ===== Logo ===== */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-vvtlet-600 to-fuchsuaa-600 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                <img
                  src={logo}
                  alt="PG Booking"
                  className="h-10 w-10 object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 ${scrolled ? 'hidden md:block' : 'block'}`}>
                Buddy
              </span>
            </Link>

            {/* ===== Desktop Navigation ===== */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-semibold transition-colors duration-300 group flex items-center gap-1.5 ${
                    location.pathname === link.path
                      ? "text-violet-600"
                      : "text-slate-600 hover:text-violet-600"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* ===== Action Buttons ===== */}
            <div className="hidden md:flex items-center gap-4">
              {userData ? (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-white border border-slate-200 hover:border-indigo-200 rounded-full shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-9 h-9 bg-gradient-to-tr from-indigo-100 to-violet-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm shadow-inner group-hover:scale-110 transition-transform">
                    {userData.firstname?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs text-slate-400 font-medium leading-none mb-1">Welcome,</p>
                    <p className="text-sm text-slate-700 font-bold leading-none">{userData.firstname}</p>
                  </div>
                </motion.button>
              ) : (
                <Link
                  to="/login"
                  className="group relative px-6 py-2.5 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="relative flex items-center gap-2 text-white font-semibold text-sm">
                    <span>Login / Sign Up</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )}
            </div>

            {/* ===== Mobile Menu Button ===== */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-violet-600 transition-colors rounded-lg hover:bg-violet-50"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ===== Mobile Dropdown Menu ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-24 left-4 right-4 z-50 md:hidden bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                      location.pathname === link.path
                        ? "bg-violet-50 text-violet-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${
                        location.pathname === link.path ? "bg-white text-violet-600 shadow-sm" : "bg-slate-100 text-slate-500"
                      }`}>
                        <link.icon size={20} />
                      </div>
                      <span className="font-semibold">{link.name}</span>
                    </div>
                    {location.pathname === link.path && (
                      <motion.div layoutId="activeMobile" className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                    )}
                  </Link>
                ))}
                
                <div className="h-px bg-slate-100 my-2 mx-4" />
                
                {userData ? (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/profile');
                    }}
                    className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold shadow-sm active:scale-95 transition-transform"
                  >
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs">
                      {userData.firstname?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span>My Profile</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-lg shadow-violet-500/20 active:scale-95 transition-transform"
                  >
                    <LogIn size={20} />
                    <span>Login / Sign Up</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && userData && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
              <div className="h-32 bg-gradient-to-r from-indigo-400 to-violet-400 relative overflow-hidden">
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
                     {userData.firstname?.[0]?.toUpperCase() || "U"}{userData.lastname?.[0]?.toUpperCase()}
                   </motion.div>
                   
                   {!isEditingProfile && (
                     <div className="text-center">
                      <h2 className="text-2xl font-bold text-slate-800">{userData.firstname} {userData.lastname}</h2>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mt-2 border border-indigo-100">
                        <User size={12} /> {userData.role === 'owner' ? 'PG Owner' : 'Tenant'}
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
                       
                       {userData.phone && (
                         <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                             <Phone size={20} />
                           </div>
                           <div className="flex-1">
                             <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phone Number</p>
                             <p className="text-sm text-slate-700 font-semibold">{userData.phone}</p>
                           </div>
                         </div>
                       )}
                     </div>

                     <div className="grid grid-cols-1 gap-3 pt-2">
                       {/* <button 
                         onClick={() => setIsEditingProfile(true)}
                         className="flex justify-center items-center gap-2 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition text-sm"
                       >
                         <Pencil size={18} /> Edit Profile
                       </button> */}
                       <button
                         onClick={handleLogout}
                         className="flex justify-center items-center gap-2 py-3 bg-rose-200 text-rose-600 font-bold rounded-xl hover:bg-rose-300 transition text-sm"
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
    </>
  );
}
