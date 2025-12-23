import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Home, ShieldCheck, Zap, Sparkles, MapPin, Search } from "lucide-react";
import hero from "../assets/video1.mp4";
import about1 from "../assets/about1.mp4";
import about2 from "../assets/about2.mp4";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-pink-200/40 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[50%] h-[50%] bg-indigo-100/30 rounded-full blur-[120px]" />
      </div>

      {/* ==== HERO SECTION ==== */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center text-center z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-purple-100 shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-fuchsia-500" />
            <span className="text-sm font-semibold text-slate-600 tracking-wide uppercase">Reimagining Urban Living</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Revolutionizing <br />
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              Room Booking
            </span>{" "}
            in Noida
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Find the perfect PG that feels like home. Verified listings, smart filters, and a seamless experience tailored for your lifestyle.
          </motion.p>
        </motion.div>

        {/* Hero Video Card */}
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="w-full max-w-6xl mx-auto mt-8 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 aspect-video md:aspect-[21/9]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src={about2}
            />
            <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply" />
            
            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-left">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-2">Modern Living Spaces</h3>
                  <p className="text-slate-200 max-w-lg">Experience the comfort of curated homes designed for students and professionals.</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    <span className="text-white font-bold text-xl">500+</span>
                    <span className="text-slate-300 text-xs uppercase">Properties</span>
                  </div>
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    <span className="text-white font-bold text-xl">2k+</span>
                    <span className="text-slate-300 text-xs uppercase">Happy Users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==== WHO WE ARE ==== */}
      <section className="relative py-24 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-block p-3 rounded-2xl bg-violet-100 text-violet-600 mb-6">
                <Users size={32} />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Who We Are
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  We are a <span className="text-slate-900 font-semibold">next-generation PG discovery platform</span> built for Noida’s dynamic lifestyle. Whether you're a student in Sector 62 or a tech professional in Sector 135 — we connect you to verified, safe, and comfortable stays.
                </p>
                <p>
                  Our goal is simple: save your time, provide clarity, remove scams, and help you find a home that feels welcoming from day one.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: MapPin, text: "Prime Locations" },
                  { icon: ShieldCheck, text: "Verified Hosts" },
                  { icon: Zap, text: "Instant Booking" },
                  { icon: Home, text: "Home Comforts" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <item.icon className="text-fuchsia-500 w-5 h-5" />
                    <span className="font-semibold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-pink-600 rounded-[2rem] rotate-3 opacity-20 transform translate-x-4 translate-y-4"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[600px]">
                <video
                  className="w-full h-full object-cover"
                  src={about1}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==== WHAT WE DO ==== */}
      <section className="relative py-24 px-6 bg-white/50 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            {/* Video/Image Side - Order 2 on mobile, Order 1 on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-fuchsia-600 to-indigo-600 rounded-[2rem] -rotate-3 opacity-20 transform -translate-x-4 translate-y-4"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[500px]">
                <video
                  className="w-full h-full object-cover"
                  src={hero}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                 <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay"></div>
              </div>
            </motion.div>

            {/* Content Side - Order 1 on mobile, Order 2 on desktop */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.div variants={fadeInUp} className="inline-block p-3 rounded-2xl bg-fuchsia-100 text-fuchsia-600 mb-6">
                <Target size={32} />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                What We Do
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed mb-8">
                We curate verified PGs across Noida and help you explore them with powerful filters. Transparent listings for guests. Faster occupancy for owners. A smart, trustworthy experience for everyone.
              </motion.p>

              <div className="space-y-6">
                {[
                  { title: "Smart Discovery", desc: "Filter by budget, amenities, metro proximity, and more.", icon: Search },
                  { title: "Verified Listings", desc: "Every property is physically verified for quality assurance.", icon: ShieldCheck },
                  { title: "Seamless Connect", desc: "Directly connect with owners without middleman commissions.", icon: Users },
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    variants={fadeInUp}
                    className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all hover:translate-x-2 cursor-default"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{feature.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==== OUR AIM (Call to Action) ==== */}
      <section className="relative py-32 px-6 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative max-w-4xl mx-auto text-center text-white"
        >
          <motion.div variants={scaleIn} className="mb-8 flex justify-center">
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
               <Target size={48} className="text-fuchsia-400" />
            </div>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Our Mission
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-12">
            "To build a trusted PG ecosystem in Noida — verified homes, verified guests, fast matching, and a smooth digital experience that makes finding the right stay absolutely effortless."
          </motion.p>
          
          <motion.div variants={fadeInUp}>
             <button className="px-10 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold rounded-full text-lg shadow-lg shadow-fuchsia-500/30 transition-all transform hover:-translate-y-1">
               Join Our Community
             </button>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
