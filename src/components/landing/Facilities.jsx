import { motion } from "framer-motion";
import {
  Home,
  Waves,
  Dumbbell,
  Leaf,
  TreePine,
  Bike,
  Baby,
  Volleyball,
  Shield,
  PlugZap,
  Lock,
  Cpu,
  Wrench,
  Route,
  Sparkles
} from "lucide-react";

export default function Facilities() {
  const facilities = [
    { icon: <Home className="w-6 h-6" />, title: "Clubhouse", desc: "A vibrant social hub for community gatherings and celebrations." },
    { icon: <Waves className="w-6 h-6" />, title: "Swimming Pool", desc: "Dive into leisure with a premium pool for relaxation and fitness." },
    { icon: <Dumbbell className="w-6 h-6" />, title: "Gym & Spa", desc: "Stay fit and rejuvenated with world-class fitness and wellness amenities." },
    { icon: <Leaf className="w-6 h-6" />, title: "Private Gardens", desc: "Personal green spaces for peace, privacy, and a touch of nature." },
    { icon: <TreePine className="w-6 h-6" />, title: "Landscaped Parks", desc: "Beautifully designed green areas for leisure walks and relaxation." },
    { icon: <Bike className="w-6 h-6" />, title: "Jogging Tracks", desc: "Safe, scenic tracks to encourage an active lifestyle." },
    { icon: <Baby className="w-6 h-6" />, title: "Kids Play Area", desc: "A fun and safe space for kids to grow, play, and explore." },
    { icon: <Volleyball className="w-6 h-6" />, title: "Sports Courts", desc: "Dedicated courts for games and sports to keep you active." },
    { icon: <Shield className="w-6 h-6" />, title: "24x7 Security", desc: "Round-the-clock surveillance ensuring a safe, worry-free life." },
    { icon: <PlugZap className="w-6 h-6" />, title: "Power Backup", desc: "Continuous supply of water, electricity, and eco-friendly solar power." },
    { icon: <Lock className="w-6 h-6" />, title: "Gated Community", desc: "A secure and exclusive environment with controlled access." },
    { icon: <Cpu className="w-6 h-6" />, title: "Smart Features", desc: "Modern technology for comfort, safety, and convenience." },
    { icon: <Wrench className="w-6 h-6" />, title: "Maintenance", desc: "Professional upkeep to keep your property flawless." },
    { icon: <Route className="w-6 h-6" />, title: "Wide Roads", desc: "60 ft. wide road for smooth and safe access throughout the community." },
  ];

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Premium Amenities
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Facilities</span>
            </h2>
            <p className="text-slate-600 text-lg">
              At Our Rooms, every detail is thoughtfully designed to provide residents with a lifestyle of comfort, luxury, and convenience.
            </p>
          </motion.div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
