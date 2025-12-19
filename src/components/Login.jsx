import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Phone, ArrowRight, Loader2, Sparkles, HeartHandshake, ArrowLeft } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

  // Check for mode switch from navigation state
  useEffect(() => {
    if (location.state?.mode === "signup") {
      setIsLogin(false);
    }
  }, [location.state]);

  // Login State
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup State
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  // --- Handlers ---
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleSignupChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.data?.user?.email || loginData.email);
        localStorage.setItem("userId", data.data?.user?._id);
        toast.success("Welcome back! Redirecting...");
        setTimeout(() => navigate("/"), 1000); 
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    setSignupLoading(true);
    try {
      const payload = { ...signupData, role: "tenant" };
      const res = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.message || "Signup failed");
      } else {
        toast.success("Account created successfully! Please login.");
        setIsLogin(true);
        setSignupData({ firstname: "", lastname: "", email: "", phone: "", password: "" });
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setSignupLoading(false);
    }
  };

  // --- UI Components ---
  const InputField = ({ icon: Icon, type, name, value, onChange, placeholder, showPassToggle, onTogglePass }) => (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-violet-400 group-focus-within:text-fuchsia-500 transition-colors duration-300" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full pl-12 pr-10 py-4 bg-white/50 border-2 border-transparent focus:border-fuchsia-400 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:shadow-lg focus:shadow-fuchsia-500/20 transition-all duration-300"
        placeholder={placeholder}
        required
      />
      {showPassToggle !== undefined && (
        <button
          type="button"
          onClick={onTogglePass}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-fuchsia-600 transition-colors"
        >
          {showPassToggle ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-50">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar theme="colored" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 p-3 bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-full text-slate-700 hover:text-fuchsia-600 transition-all shadow-sm border border-white/20 group"
        title="Go Back"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Dynamic Background with Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />
        
        {/* Animated Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 100, 0],
            scale: [1, 1.5, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-40 -right-20 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 50, 0],
            scale: [1, 1.3, 1] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute -bottom-20 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[480px]"
      >
        <div className="bg-white/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] border border-white p-2">
          
          {/* Header Section */}
          <div className="px-8 pt-8 pb-4 text-center">
             <motion.div 
               initial={{ y: -20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white mb-6 shadow-xl shadow-fuchsia-500/30"
             >
                <HeartHandshake size={32} strokeWidth={1.5} />
             </motion.div>
             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
               Welcome
             </h1>
             <p className="text-slate-500 mt-2 font-medium">Find your happy place.</p>
          </div>

          {/* Toggle Switch */}
          <div className="px-8 mb-6">
            <div className="bg-slate-100/80 p-1.5 rounded-2xl flex relative">
              <motion.div 
                className="absolute top-1.5 bottom-1.5 bg-white rounded-xl shadow-sm"
                initial={false}
                animate={{ 
                  left: isLogin ? "6px" : "50%", 
                  width: "calc(50% - 9px)" 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-sm font-bold rounded-xl relative z-10 transition-colors ${
                  isLogin ? "text-slate-800" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-sm font-bold rounded-xl relative z-10 transition-colors ${
                  !isLogin ? "text-slate-800" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form Area */}
          <div className="px-8 pb-8">
             <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleLogin}
                    className="space-y-4"
                  >
                    <InputField 
                      icon={Mail} 
                      type="email" 
                      name="email" 
                      value={loginData.email} 
                      onChange={handleLoginChange} 
                      placeholder="Email Address" 
                    />
                    <InputField 
                      icon={Lock} 
                      type={showLoginPassword ? "text" : "password"} 
                      name="password" 
                      value={loginData.password} 
                      onChange={handleLoginChange} 
                      placeholder="Password"
                      showPassToggle={showLoginPassword}
                      onTogglePass={() => setShowLoginPassword(!showLoginPassword)}
                    />

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold rounded-2xl shadow-lg shadow-fuchsia-500/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loginLoading ? <Loader2 className="animate-spin" /> : <>Log In <ArrowRight size={20} /></>}
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSignup}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <InputField 
                        icon={User} 
                        type="text" 
                        name="firstname" 
                        value={signupData.firstname} 
                        onChange={handleSignupChange} 
                        placeholder="First Name" 
                      />
                      <InputField 
                        icon={User} 
                        type="text" 
                        name="lastname" 
                        value={signupData.lastname} 
                        onChange={handleSignupChange} 
                        placeholder="Last Name" 
                      />
                    </div>
                    <InputField 
                      icon={Mail} 
                      type="email" 
                      name="email" 
                      value={signupData.email} 
                      onChange={handleSignupChange} 
                      placeholder="Email Address" 
                    />
                    <InputField 
                      icon={Phone} 
                      type="text" 
                      name="phone" 
                      value={signupData.phone} 
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 10) setSignupData({ ...signupData, phone: val });
                      }} 
                      placeholder="Phone Number" 
                    />
                    <InputField 
                      icon={Lock} 
                      type={showSignupPassword ? "text" : "password"} 
                      name="password" 
                      value={signupData.password} 
                      onChange={handleSignupChange} 
                      placeholder="Create Password"
                      showPassToggle={showSignupPassword}
                      onTogglePass={() => setShowSignupPassword(!showSignupPassword)}
                    />

                    <button
                      type="submit"
                      disabled={signupLoading}
                      className="mt-2 w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold rounded-2xl shadow-lg shadow-fuchsia-500/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {signupLoading ? <Loader2 className="animate-spin" /> : <>Join <Sparkles size={20} /></>}
                    </button>
                  </motion.form>
                )}
             </AnimatePresence>
          </div>
        </div>
        
        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-8 font-medium">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
