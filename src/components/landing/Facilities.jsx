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
    Route, // ✅
  } from "lucide-react";
  
  export default function Facilities() {
    const facilities = [
      { icon: <Home className="w-8 h-8 text-green-600" />, title: "Clubhouse", desc: "A vibrant social hub for community gatherings and celebrations." },
      { icon: <Waves className="w-8 h-8 text-blue-600" />, title: "Swimming Pool", desc: "Dive into leisure with a premium pool for relaxation and fitness." },
      { icon: <Dumbbell className="w-8 h-8 text-purple-600" />, title: "Gym & Spa", desc: "Stay fit and rejuvenated with world-class fitness and wellness amenities." },
      { icon: <Leaf className="w-8 h-8 text-emerald-600" />, title: "Private Gardens", desc: "Personal green spaces for peace, privacy, and a touch of nature." },
      { icon: <TreePine className="w-8 h-8 text-lime-600" />, title: "Landscaped Parks", desc: "Beautifully designed green areas for leisure walks and relaxation." },
      { icon: <Bike className="w-8 h-8 text-orange-500" />, title: "Jogging & Cycling Tracks", desc: "Safe, scenic tracks to encourage an active lifestyle." },
      { icon: <Baby className="w-8 h-8 text-pink-500" />, title: "Children’s Play Area", desc: "A fun and safe space for kids to grow, play, and explore." },
      { icon: <Volleyball className="w-8 h-8 text-indigo-500" />, title: "Sports Courts", desc: "Dedicated courts for games and sports to keep you active." },
      { icon: <Shield className="w-8 h-8 text-gray-700" />, title: "24x7 Security & CCTV, with Boom Barrier", desc: "Round-the-clock surveillance ensuring a safe, worry-free life." },
      { icon: <PlugZap className="w-8 h-8 text-yellow-600" />, title: "Reliable Utilities", desc: "Continuous supply of water, electricity, and eco-friendly solar power." },
      { icon: <Lock className="w-8 h-8 text-red-500" />, title: "Gated Community", desc: "A secure and exclusive environment with controlled access." },
      { icon: <Cpu className="w-8 h-8 text-blue-400" />, title: "Smart Home Features", desc: "Modern technology for comfort, safety, and convenience." },
      { icon: <Wrench className="w-8 h-8 text-gray-600" />, title: "Maintenance Services", desc: "Professional upkeep to keep your property flawless." },
      { icon: <Route className="w-8 h-8 text-black" />, title: "Wide Road", desc: "60 ft. wide road for smooth and safe access throughout the community." },
    ];
  
    return (
      <section className="py-16 ashubom ashuboms bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-[60px] mt-[40px] md:text-4xl font-bold text-gray-800">
              Facilities at <span className="text-green-600">Our Rooms</span>
            </h2>
            <p className="text-gray-600 mt-[30px] max-w-2xl mx-auto">
              At Amira Greens, every detail is thoughtfully designed to provide residents with a lifestyle of comfort, luxury, and convenience.
            </p>
          </div>
  
          {/* Facilities Grid */}
          <div className="grid sm:grid-cols-2 mt-[30px] lg:grid-cols-3 gap-x-12 gap-y-8">
            {facilities.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 border-b pb-4 border-gray-100 hover:bg-gray-50 transition-all rounded-lg p-2"
              >
                <div>{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title} -</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
