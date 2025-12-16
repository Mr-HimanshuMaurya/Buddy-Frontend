import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import image from "../assets/Main.jpg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function ModernLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.user?.email || email);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/admin/dashboard"), 1000);
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Connection error. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      

      {/* Glass Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/40 rounded-2xl p-8 shadow-2xl w-[400px] flex flex-col items-center text-center">
        {/* Logo */}
        <img
          src={logo}
          alt="Amira Groups Logo"
          className="h-10 w-auto mb-1 opacity-90"
        />

        {/* Heading */}
        <h2 className="text-[30px] font-semibold mb-6">Admin Login</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Email */}
          <div className="text-left">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] ashubom bg-transparent border-b border-white/60 placeholder-white/70 text-white py-[6px] focus:outline-none focus:border-white text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="relative text-left">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] ashubom   bg-transparent border-b border-white/60 placeholder-white/70 text-white py-[6px] focus:outline-none focus:border-white text-sm pr-8"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1 text-white/70 hover:text-white"
            >
              {showPassword ? (
                <MdVisibilityOff className="w-5 mt-[12px] mr-[2px] h-5" />
              ) : (
                <MdVisibility className="w-5 mt-[12px] h-5" />
              )}
            </button>
          </div>

         

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-[140px] h-[45px] mt-[20px]  cursor-pointer mb-[40px] rounded-[15px] bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </form>

      
      </div>

      <ToastContainer position="top-right" autoClose={2500} theme="dark" />
    </div>
  );
}
