import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/PG.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 mt-[8px] z-50 px-[20px]">
      <div className="bg-white/30 backdrop-blur-lg  shadow-md rounded-4xl">
        <div className="flex h-16  items-center justify-between   ">
          {/* ===== Logo ===== */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="PG Booking"
              className="h-2  ml-[12px] w-10 object-contain"
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
                to="/properties"
                className="w-full text-center min-h-[60px] text-gray-800 font-medium hover:text-emerald-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Projects
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
    </header>
  );
}
