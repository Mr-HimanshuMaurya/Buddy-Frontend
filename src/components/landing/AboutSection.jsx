import { motion } from "framer-motion";
import { CheckCircle2, Shield, Star, Users } from "lucide-react";
import Image3 from "../../assets/pg.webp";

export default function AboutSection() {
  const features = [
    {
      icon: <Shield className="w-5 h-5 text-indigo-600" />,
      title: "Secure Environment",
      desc: "24/7 security & CCTV surveillance",
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      title: "Community Living",
      desc: "Connect with like-minded people",
    },
    {
      icon: <Star className="w-5 h-5 text-indigo-600" />,
      title: "Premium Amenities",
      desc: "Fully furnished with modern facilities",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-indigo-600" />,
      title: "Hassle-free Stay",
      desc: "Housekeeping & maintenance included",
    },
  ];

  return (
    <section className="relative py-15 lg:py-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              About Us
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Premium Living</span> in Delhi NCR
            </h2>

            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Experience the perfect blend of comfort, community, and convenience. We don't just provide a room; we provide a lifestyle designed for students and professionals who demand the best.
            </p>

            <p className="text-slate-600 mb-8 leading-relaxed">
              From fully furnished spaces to high-speed internet and nutritious meals, every detail is curated to ensure you feel at home from day one.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-slate-100"
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{feature.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={Image3}
                alt="Premium PG Accommodation"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-8 -left-8 md:bottom-8 md:-left-12 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                      U{i}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-600">+500 Happy</span>
              </div>
              <p className="text-sm font-bold text-slate-900">Trusted Residents</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="w-4/5 h-full bg-indigo-500 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
