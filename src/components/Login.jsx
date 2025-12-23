import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { User, Mail, Lock, Phone, ArrowRight, Loader2, Building2, ArrowLeft } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import LoginPageVideo from "../assets/LoginPageVideo.mp4";

const InputField = ({ icon: Icon, type, name, value, onChange, placeholder, showPassToggle, onTogglePass }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
      <Icon className="h-5 w-5 text-white/60 group-focus-within:text-cyan-300 transition-all duration-300" />
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full pl-12 pr-10 py-4 bg-white/10 border border-white/10 focus:border-cyan-500/50 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 backdrop-blur-sm"
      placeholder={placeholder}
      required
    />
    {showPassToggle !== undefined && (
      <button
        type="button"
        onClick={onTogglePass}
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors z-10"
      >
        {showPassToggle ? "Hide" : "Show"}
      </button>
    )}
  </div>
);

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
        body: JSON.stringify({
          email: loginData.email.trim(),
          password: loginData.password
        }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("accessToken", data.data?.accessToken);
        localStorage.setItem("refreshToken", data.data?.refreshToken);
        localStorage.setItem("userEmail", data.data?.user?.email);
        localStorage.setItem("userFirstName", data.data?.user?.firstname);
        localStorage.setItem("userLastName", data.data?.user?.lastname);
        localStorage.setItem("userPhone", data.data?.user?.phone);
        localStorage.setItem("userId", data.data?.user?._id);
        localStorage.setItem("userRole", data.data?.user?.role);
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
      const payload = { 
        ...signupData, 
        firstname: signupData.firstname.trim(),
        lastname: signupData.lastname.trim(),
        email: signupData.email.trim(),
        phone: signupData.phone.trim(),
        role: "tenant" 
      };
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


  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar theme="colored" />

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={LoginPageVideo} type="video/mp4" />
        </video>
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-all shadow-lg border border-white/10 group overflow-hidden"
        title="Go Back"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform relative z-10" />
      </button>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[480px]">
        <div className="bg-black/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[2.5rem] border border-white/10 p-2 overflow-hidden relative">
          
          {/* Decorative Gloss Reflection */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header Section */}
          <div className="px-8 pt-8 pb-4 text-center relative z-10">
             <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white mb-6 shadow-[0_0_40px_rgba(99,102,241,0.5)] ring-1 ring-white/50 relative group backdrop-blur-sm">
                <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-3xl" />
                <Building2 size={40} strokeWidth={1.5} className="relative z-10 drop-shadow-md transition-transform duration-300" />
             </div>
             <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-tight">
               Welcome
             </h1>
             <p className="text-indigo-200 mt-2 font-medium tracking-wide">
               Find your perfect stay.
             </p>
          </div>

          {/* Toggle Switch */}
          <div className="px-8 mb-6 relative z-10">
            <div className="bg-black/30 p-1.5 rounded-2xl flex relative backdrop-blur-md border border-white/5 shadow-inner">
              <div 
                className="absolute top-1.5 bottom-1.5 bg-white/15 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm transition-all duration-300 ease-in-out"
                style={{
                  left: isLogin ? "6px" : "50%",
                  width: "calc(50% - 9px)"
                }}
              />
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-sm font-bold rounded-xl relative z-10 transition-all duration-300 ${
                  isLogin ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-sm font-bold rounded-xl relative z-10 transition-all duration-300 ${
                  !isLogin ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form Area */}
          <div className="px-8 pb-8 relative z-10">
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
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

                <div className="flex justify-end">
                  <button type="button" className="text-sm text-indigo-300 hover:text-white transition-colors">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 border border-white/20 relative overflow-hidden group hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">
                    {loginLoading ? <Loader2 className="animate-spin" /> : <>Log In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                  </span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-3">
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
                  className="mt-2 w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 border border-white/20 relative overflow-hidden group hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">
                    {signupLoading ? <Loader2 className="animate-spin" /> : <>Sign Up <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <p className="text-center text-white/30 text-xs mt-8 font-medium drop-shadow-md">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </div>
  );
}
