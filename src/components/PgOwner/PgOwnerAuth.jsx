import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Phone, ArrowRight, Building2, ShieldCheck, TrendingUp, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Background Image (You can replace this with a real image URL or import)
const BG_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop";

export default function PgOwnerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

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
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  
  // Loading & Password Visibility States
  const [signupLoading, setSignupLoading] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  
  // OTP State
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [isVerifyingSignup, setIsVerifyingSignup] = useState(false);

  // Forgot Password State
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPasswordOTP, setShowForgotPasswordOTP] = useState(false);
  const [forgotPasswordOTP, setForgotPasswordOTP] = useState("");
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // Handlers
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleSignupChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    try {
      // Use verify-otp for signup, verify-login-otp for login
      const endpoint = isVerifyingSignup ? "/users/verify-otp" : "/users/verify-login-otp";
      const emailToUse = isVerifyingSignup ? signupData.email : otpEmail || loginData.email;
      
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToUse, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "OTP Verification failed");
      } else {
        // Check if owner or admin role for login flow
        const userRole = data?.data?.user?.role;
        if (!isVerifyingSignup && userRole !== "owner" && userRole !== "admin") {
          toast.error("Only PG Owners or Admin can login here");
          setShowOtpModal(false);
          return;
        }
        
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("accessToken", data?.data?.accessToken || "");
        localStorage.setItem("refreshToken", data?.data?.refreshToken || "");
        localStorage.setItem("userId", data?.data?.user?._id || "");
        localStorage.setItem("userEmail", data?.data?.user?.email || "");
        localStorage.setItem("userRole", userRole);
        
        // Redirect based on role
        let redirectPath = "/pg-owner/dashboard";
        
        if (userRole === "admin") {
          redirectPath = "/admin/dashboard";
        }
        
        toast.success(isVerifyingSignup ? "Verified & Logged in!" : userRole === "admin" ? "Welcome back, Admin!" : "Welcome back, Owner!");
        setShowOtpModal(false);
        setOtp(""); // Clear OTP
        setTimeout(() => navigate(redirectPath), 1000);
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginData.email.trim(), password: loginData.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Login failed");
      } else {
        // Check if user needs verification (not verified)
        if (data?.data?.requiresVerification) {
          // User is not verified, show OTP modal
          setOtpEmail(loginData.email.trim());
          setIsVerifyingSignup(false);
          setShowOtpModal(true);
          toast.info(data.message || "OTP sent! Please verify to continue.");
        } else {
          // User is verified, login directly
          const userRole = data?.data?.user?.role;
          
          // Check if owner or admin role
          if (userRole !== "owner" && userRole !== "admin") {
            toast.error("Only PG Owners or Admin can login here");
            return;
          }
          
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("accessToken", data?.data?.accessToken || "");
          localStorage.setItem("refreshToken", data?.data?.refreshToken || "");
          localStorage.setItem("userId", data?.data?.user?._id || "");
          localStorage.setItem("userEmail", data?.data?.user?.email || "");
          localStorage.setItem("userRole", userRole);
          
          // Redirect based on role
          let redirectPath = "/pg-owner/dashboard";
          
          if (userRole === "admin") {
            redirectPath = "/admin/dashboard";
          }
          
          toast.success(userRole === "admin" ? "Welcome back, Admin!" : "Welcome back, Owner!");
          setTimeout(() => navigate(redirectPath), 1000);
        }
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    try {
      const payload = { ...signupData, role: "owner" };
      const res = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Signup failed");
      } else {
        setOtpEmail(signupData.email);
        setIsVerifyingSignup(true);
        toast.success("OTP Sent! Please check your email.");
        setShowOtpModal(true);
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setSignupLoading(false);
    }
  };

  // Forgot Password Handlers
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotPasswordLoading(true);
    try {
      const response = await fetch(`${apiUrl}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail.trim() }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "OTP sent to your email!");
        setShowForgotPasswordModal(false);
        setShowForgotPasswordOTP(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleForgotPasswordOTPVerify = async (e) => {
    e.preventDefault();
    setForgotPasswordLoading(true);
    try {
      const response = await fetch(`${apiUrl}/users/verify-forgot-password-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail.trim(), otp: forgotPasswordOTP }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "OTP verified!");
        setShowForgotPasswordOTP(false);
        setShowNewPasswordForm(true);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setForgotPasswordLoading(true);
    try {
      const response = await fetch(`${apiUrl}/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotPasswordEmail.trim(),
          otp: forgotPasswordOTP,
          newPassword: newPassword,
        }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Password reset successfully!");
        // Reset all states
        setShowNewPasswordForm(false);
        setShowForgotPasswordModal(false);
        setForgotPasswordEmail("");
        setForgotPasswordOTP("");
        setNewPassword("");
        setConfirmPassword("");
        // Optionally redirect to login
        setTimeout(() => {
          toast.info("Please login with your new password");
        }, 2000);
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pt-18">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative">
            <button
              onClick={() => {
                setShowOtpModal(false);
                setOtp(""); // Clear OTP when canceling
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-center mb-4">Verify Email</h3>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter the 6-digit code sent to <br />
              <strong>
                {isVerifyingSignup
                  ? signupData.email
                  : otpEmail || loginData.email}
              </strong>
            </p>

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <ShieldCheck size={20} />
                </div>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white tracking-widest text-center text-lg"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={otpLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {otpLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Forgot Password Email Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative">
            <button
              onClick={() => {
                setShowForgotPasswordModal(false);
                setForgotPasswordEmail("");
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-center mb-4">
              Reset Password
            </h3>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter your email address to receive a verification code
            </p>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={forgotPasswordLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {forgotPasswordLoading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Forgot Password OTP Modal */}
      {showForgotPasswordOTP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative">
            <button
              onClick={() => {
                setShowForgotPasswordOTP(false);
                setForgotPasswordOTP("");
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-center mb-4">Verify OTP</h3>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter the 6-digit code sent to <br />
              <strong>{forgotPasswordEmail}</strong>
            </p>

            <form
              onSubmit={handleForgotPasswordOTPVerify}
              className="space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <ShieldCheck size={20} />
                </div>
                <input
                  type="text"
                  required
                  value={forgotPasswordOTP}
                  onChange={(e) => setForgotPasswordOTP(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white tracking-widest text-center text-lg"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={forgotPasswordLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {forgotPasswordLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New Password Form Modal */}
      {showNewPasswordForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative">
            <button
              onClick={() => {
                setShowNewPasswordForm(false);
                setNewPassword("");
                setConfirmPassword("");
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-center mb-4">
              Set New Password
            </h3>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter your new password
            </p>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} />
                </div>

                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
                  placeholder="New Password"
                  minLength={8}
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} />
                </div>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
                  placeholder="Confirm New Password"
                  minLength={8}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={forgotPasswordLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {forgotPasswordLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Left Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 relative bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
              {isLogin ? "Welcome Back, Owner" : "Join Our Partner Network"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {isLogin
                ? "Manage your properties and tenants efficiently."
                : "Start listing your properties and reach thousands of tenants."}
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isLogin
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                !isLogin
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail size={20} />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock size={20} />
                    </div>
                    <input
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      required
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showLoginPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPasswordModal(true)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loginLoading ? "Authenticating..." : "Sign In to Dashboard"}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSignup}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User size={18} />
                      </div>
                      <input
                        name="firstname"
                        type="text"
                        required
                        value={signupData.firstname}
                        onChange={handleSignupChange}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    <div className="mt-1 relative">
                      {/* Reusing User icon but could be generic */}
                      <input
                        name="lastname"
                        type="text"
                        required
                        value={signupData.lastname}
                        onChange={handleSignupChange}
                        className="block w-full px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail size={18} />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      value={signupData.email}
                      onChange={handleSignupChange}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone size={18} />
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={signupData.phone}
                      onChange={handleSignupChange}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input
                      name="password"
                      type={showSignupPassword ? "text" : "password"}
                      required
                      value={signupData.password}
                      onChange={handleSignupChange}
                      className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showSignupPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={signupLoading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {signupLoading
                    ? "Creating Account..."
                    : "Create Owner Account"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              By continuing, you agree{" "}
              <a href="#" className="underline hover:text-indigo-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-indigo-600">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Content */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={BG_IMAGE}
            alt="Property Management"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-purple-900/90" />
        </div>

        <div className="relative z-10 w-full flex flex-col justify-center p-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs font-semibold mb-6">
              <ShieldCheck size={14} /> Trusted by 5000+ Owners
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Grow Your Property Business with Us!
            </h1>
            <p className="text-lg text-indigo-100 mb-10 leading-relaxed max-w-lg">
              Streamline your PG management, find verified tenants faster, and
              maximize your rental yields with our comprehensive dashboard.
            </p>

            <div className="space-y-4">
              {[
                { icon: Building2, text: "List unlimited properties for free" },
                {
                  icon: TrendingUp,
                  text: "Real-time analytics and revenue tracking",
                },
                {
                  icon: ShieldCheck,
                  text: "Verified tenant leads and secure payments",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span className="font-medium text-indigo-50">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
