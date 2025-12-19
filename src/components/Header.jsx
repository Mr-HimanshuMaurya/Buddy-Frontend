import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/PG.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);
  const [ownerTab, setOwnerTab] = useState("login");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupFirstname, setSignupFirstname] = useState("");
  const [signupLastname, setSignupLastname] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const openOwnerModal = () => {
    setOwnerModalOpen(true);
    setOwnerTab("login");
  };
  const closeOwnerModal = () => {
    setOwnerModalOpen(false);
  };

  const handleOwnerLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Login failed");
      } else {
        const role = data?.data?.user?.role;
        if (role !== "owner") {
          toast.error("Only PG Owners can login here");
        } else {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userId", data?.data?.user?._id || "");
          localStorage.setItem("userEmail", data?.data?.user?.email || "");
          localStorage.setItem("userRole", role);
          toast.success("Owner login successful");
          setTimeout(() => {
            closeOwnerModal();
            navigate("/pg-owner/dashboard");
          }, 800);
        }
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleOwnerSignup = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    try {
      const payload = {
        firstname: signupFirstname.trim(),
        lastname: signupLastname.trim(),
        email: signupEmail.trim().toLowerCase(),
        phone: signupPhone.trim(),
        password: signupPassword,
        role: "owner",
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
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", data?.data?.user?._id || "");
        localStorage.setItem("userEmail", data?.data?.user?.email || "");
        localStorage.setItem("userRole", "owner");
        toast.success("Owner signup successful");
        setTimeout(() => {
          closeOwnerModal();
          navigate("/pg-owner/dashboard");
        }, 800);
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 mt-[8px] z-50 px-[20px]">
      <div className="bg-white/30 backdrop-blur-lg  shadow-md rounded-4xl">
        <div className="flex h-16  items-center justify-between   ">
          {/* ===== Logo ===== */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="PG Booking"
              className="h-10  ml-[12px] w-10 object-contain"
            />
          </Link>

          {/* ===== Desktop Navigation ===== */}
          <nav className="sm:block">
            <div className="max-[768px]:hidden flex justify-center items-center gap-x-8">
              <Link
                to="/"
                className="text-base font-bold relative 
  after:absolute after:left-0 after:-bottom-1 
  after:h-[2px] after:w-0 after:bg-sky-400 
  after:transition-all after:duration-300 
  hover:after:w-full hover:!text-sky-400"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-base font-bold relative 
  after:absolute after:left-0 after:-bottom-1 
  after:h-[2px] after:w-0 after:bg-sky-400 
  after:transition-all after:duration-300 
  hover:after:w-full hover:!text-sky-400"
              >
                About
              </Link>

              <Link
                to="/properties"
                className="text-base font-bold relative 
  after:absolute after:left-0 after:-bottom-1 
  after:h-[2px] after:w-0 after:bg-sky-400 
  after:transition-all after:duration-300 
  hover:after:w-full hover:!text-sky-400"
              >
                Properties
              </Link>

              <Link
                to="#"
                onClick={openOwnerModal}
                className="text-base font-bold relative 
  after:absolute after:left-0 after:-bottom-1 
  after:h-[2px] after:w-0 after:bg-sky-400 
  after:transition-all after:duration-300 
  hover:after:w-full hover:!text-sky-400"
              >
                For PG Owners
              </Link>

              <Link
                to="/contact"
                className="text-base font-bold relative 
  after:absolute after:left-0 after:-bottom-1 
  after:h-[2px] after:w-0 after:bg-sky-400 
  after:transition-all after:duration-300 
  hover:after:w-full hover:!text-sky-400"
              >
                Contact Us
              </Link>

             

              {/* ===== Golden Login Button ===== */}

              <Link
                to="/login"
                className="w-[120px] h-[40px] cursor-pointer mr-[8px] rounded-[15px] bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-yellow-700 text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                Login
              </Link>
            </div>
          </nav>

          {/* ===== Mobile Menu Button ===== */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none"
              aria-label="Open Menu"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ===== Mobile Dropdown Menu ===== */}
        {isOpen && (
          <div className="sm:hidden overflow-x-hidden mt-2 bg-white/50 backdrop-blur-lg shadow-lg rounded-lg border border-white/20">
            <nav className="flex flex-col items-center space-y-2 p-4">
              <Link
                to="/"
                className="w-full text-center min-h-[60px] mt-[30px] text-gray-800 font-medium hover:text-emerald-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="#"
                onClick={() => {
                  openOwnerModal();
                  setIsOpen(false);
                }}
                className="w-full text-center min-h-[60px] text-gray-800 font-medium hover:text-emerald-600 transition-colors duration-200"
              >
                For PG Owners
              </Link>
              <Link
                to="/about"
                className="w-full text-center min-h-[60px] text-gray-800 font-medium hover:text-emerald-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="w-full text-center min-h-[60px] text-gray-800 font-medium hover:text-emerald-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                to="/enquiry"
                className="w-[120px] h-[40px] mt-[10px] cursor-pointer rounded-[15px] mb-[20px] bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto"
              >
                Enquiry-Now
              </Link>

              {/* Golden Login Button (Mobile) */}
              <Link
                to="/login"
                className="w-[120px] h-[40px] mt-[10px] cursor-pointer rounded-[15px] mb-[20px] bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-green-500 hover:to-green-700 text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
      {ownerModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex gap-4">
                <button
                  className={`px-3 py-2 font-semibold ${ownerTab === "login" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-600"}`}
                  onClick={() => setOwnerTab("login")}
                >
                  Login
                </button>
                <button
                  className={`px-3 py-2 font-semibold ${ownerTab === "signup" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-600"}`}
                  onClick={() => setOwnerTab("signup")}
                >
                  Sign Up
                </button>
              </div>
              <button
                onClick={closeOwnerModal}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-5">
              {ownerTab === "login" ? (
                <form onSubmit={handleOwnerLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  >
                    {loginLoading ? "Logging in..." : "Login as PG Owner"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOwnerSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">First Name</label>
                      <input
                        type="text"
                        value={signupFirstname}
                        onChange={(e) => setSignupFirstname(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Last Name</label>
                      <input
                        type="text"
                        value={signupLastname}
                        onChange={(e) => setSignupLastname(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Phone</label>
                    <input
                      type="tel"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      pattern="^[6-9]\d{9}$"
                      title="Enter a valid 10 digit phone number"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      minLength={8}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={signupLoading}
                    className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  >
                    {signupLoading ? "Creating account..." : "Sign Up as PG Owner"}
                  </button>
                </form>
              )}
            </div>
          </div>
          <ToastContainer position="top-right" autoClose={2500} />
        </div>
      )}
    </header>
  );
}
