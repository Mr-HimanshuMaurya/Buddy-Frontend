import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Info, Building2, Phone, UserCircle, LogIn, ChevronRight } from "lucide-react";
import logo from "../assets/PG.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    { name: "Properties", path: "/properties", icon: Building2 },
    { name: "For PG Owners", path: "/pg-owner-login", icon: UserCircle },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <>
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
    </>
  );
}
