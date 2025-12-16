import { motion } from "framer-motion";
import { useRef } from "react";
import hero from "../assets/video1.mp4";
import about1 from "../assets/about1.mp4";
import about2 from "../assets/about2.mp4";

export default function About() {
  const videoRef = useRef(null);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  const staggerParent = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  return (
    <div className="w-full min-h-screen p-[5px] md:p-[0px] pt-[120px] bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* ==== HERO SECTION ==== */}
      <section className="w-full max-w-6xl mx-auto px-6 text-center">
        {/* Heading stays at the top */}
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <h1
            className="text-[50px] mb-[20px] font-bold md:text-6xl font-extrabold leading-tight 
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
      bg-clip-text text-transparent"
          >
            Revolutionizing Rooms Booking in Noida
          </h1>
        </motion.div>

        {/* Background Motion Video */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-40 rounded-3xl overflow-hidden shadow-2xl border border-white/40 backdrop-blur-xl relative"
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40 z-10 rounded-3xl"></div>

          {/* Paragraph inside the video (centered) */}
          <p
            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      text-[20px] md:text-[24px] max-w-3xl text-white font-semibold leading-relaxed 
      drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] px-6"
          >
            Find the perfect PG that truly feels like home — smart filters,
            verified homes, real-time availability and a stress-free search
            experience tailored for Noida’s lifestyle.
          </p>

          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            className="w-full h-[520px] object-cover brightness-90"
            src={about2}
          />
        </motion.div>
      </section>

      {/* ==== WHO WE ARE ==== */}
      <section className="w-full max-w-6xl mx-auto px-6 mt-[60px]">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="p-0 rounded-none shadow-none bg-transparent"
          >
            <h2
              className="text-[50px] font-bold mb-8 text-center
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
        bg-clip-text text-transparent tracking-tight"
            >
              Who We Are
            </h2>

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.p
                variants={fadeUp}
                className="text-gray-800 text-lg leading-relaxed font-medium"
              >
                We are a next-generation PG discovery platform built for Noida’s
                dynamic lifestyle. Whether you're a student in Sector 62 or a
                tech professional in Sector 135 — we connect you to verified,
                safe and comfortable stays.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-gray-800 text-lg leading-relaxed font-medium"
              >
                Our goal is simple: save your time, provide clarity, remove
                scams, and help you find a home that feels welcoming from day
                one.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* RIGHT VIDEO */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-3xl shadow-2xl overflow-hidden"
          >
            <video
              className="w-full h-[380px] object-cover"
              src={about1}
              autoPlay
              loop
              muted
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* ==== WHAT WE DO ==== */}
      <section className="w-full max-w-6xl mx-auto px-6 mt-[60px]">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* LEFT VIDEO (same styling as Who We Are) */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-3xl shadow-2xl overflow-hidden"
          >
            <video
              className="w-full h-[380px] object-cover"
              src={hero}
              autoPlay
              loop
              muted
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
          </motion.div>

          {/* RIGHT CONTENT (same styling as Who We Are) */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="p-0 rounded-none shadow-none bg-transparent"
          >
            <h2
              className="text-[50px] font-bold mb-8 text-center
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
        bg-clip-text text-transparent tracking-tight"
            >
              What We Do
            </h2>

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.p
                variants={fadeUp}
                className="text-gray-800 text-lg leading-relaxed font-medium"
              >
                We curate verified PGs across Noida and help you explore them
                with powerful filters — locality, metro access, budget, food,
                gender, amenities and more.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-gray-800 text-lg leading-relaxed font-medium"
              >
                Transparent listings for guests. Faster occupancy for owners.
                Smart, trustworthy experience for everyone.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==== OUR AIM ==== */}
      {/* ==== OUR AIM ==== */}
      <section className="w-full max-w-6xl mx-auto px-6 pb-32 mt-[40px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="p-0 rounded-none shadow-none bg-transparent"
        >
          <h2
            className="text-[50px] font-bold mb-8 text-center
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
      bg-clip-text text-transparent tracking-tight"
          >
            Our Aim
          </h2>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <motion.p
              variants={fadeUp}
              className="text-gray-800 text-lg leading-relaxed font-medium text-center"
            >
              Our vision is to build a trusted PG ecosystem in Noida — verified
              homes, verified guests, fast matching, and a smooth digital
              experience that makes finding the right stay absolutely
              effortless.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
