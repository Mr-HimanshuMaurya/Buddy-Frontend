import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";
import logo from "../assets/PG.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Logo & Tagline */}
        <div className="mb-8 mt-5">
          <img src={logo} alt="Logo" className="h-12 w-auto mx-auto mb-4" />
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Your trusted companion for finding the perfect living space.
            Comfortable, secure, and affordable.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 mb-8">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="text-slate-500 hover:text-indigo-400 transition-colors hover:scale-110 transform duration-300"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Quick Links & Contact */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-400 mb-8">
          <Link to  ="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link to="/properties" className="hover:text-white transition-colors">
            Properties
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 w-full pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <div>© {currentYear} All rights reserved.</div>
          <div className="flex items-center gap-1">
            Made with{" "}
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />{" "}
            in India
          </div>
        </div>
      </div>
    </footer>
  );
}
