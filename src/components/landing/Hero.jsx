import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, Star, CheckCircle } from "lucide-react";
import hero from "../../assets/video1.mp4";

export default function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/properties");
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* ====== Background Video ====== */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src={hero}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* ====== Content ====== */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 font-medium text-sm mb-8"
        >
          <Star size={16} className="fill-yellow-400" />
          <span className="tracking-wide uppercase text-xs font-bold">#1 Trusted Housing Platform</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-6 drop-shadow-2xl"
        >
          Discover Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Pefect Comfort Place
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-20 font-light leading-relaxed"
        >
          Luxury isn't about price — it's about the experience. 
          Find premium PGs, flats, and rooms tailored to your lifestyle.
        </motion.p>


        {/* Stats / Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10  left-0 right-0 hidden md:flex justify-center gap-12 text-white/80"
        >
          {[
            { label: "Trusted & Safe", icon: CheckCircle },
            { label: "Verified Properties", icon: CheckCircle },
            { label: "Instant Booking", icon: CheckCircle },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="w-5 h-5 text-yellow-400" />
              <span className="font-medium tracking-wide">{item.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
