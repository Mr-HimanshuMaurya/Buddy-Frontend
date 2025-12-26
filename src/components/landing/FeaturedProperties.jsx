import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, BedDouble, Bath, Square, Star } from "lucide-react";
import Image4 from "/RoyalRoom.png";
import Image1 from "/Appartment.png";
import Image2 from "/Luxuary.png";
import { useNavigate } from "react-router-dom";

const featuredProps = [
  {
    id: 1,
    image: Image4,
    title: "The Royal Room",
    location: "Sector 15, Noida",
    price: "₹18***",
    rating: 4.8,
    beds: 3,
    baths: 2,
    area: "1,800 sqft",
    tag: "Premium",
  },
  {
    id: 2,
    image: Image1,
    title: "Appartments",
    location: "Indirapuram, Ghaziabad",
    price: "₹12***",
    rating: 4.5,
    beds: 2,
    baths: 2,
    area: "1,200 sqft",
    tag: "Trending",
  },
  {
    id: 3,
    image: Image2,
    title: "Luxury Kitchen",
    location: "Greater Noida West",
    price: "₹22***",
    rating: 4.9,
    beds: 4,
    baths: 3,
    area: "2,500 sqft",
    tag: "Luxury",
  },
];

export default function FeaturedProperties() {
  const navigate = useNavigate();
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-50/50 rounded-bl-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-50/50 rounded-tr-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-orange-600" />
              Handpicked Collections
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Exclusive <span className="text-indigo-600">Featured</span> Properties
            </h2>
            <p className="text-slate-600 text-lg">
              Discover our most sought-after properties, curated for comfort, luxury, and premium living experiences across Delhi NCR.
            </p>
          </motion.div>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          {/* Main Feature Card (Left - Spans 7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group rounded-3xl overflow-hidden shadow-xl h-full min-h-[400px]"
          >
            <img
              src={featuredProps[0].image}
              alt={featuredProps[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
            
            {/* Tag */}
            <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider">
              {featuredProps[0].tag}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{featuredProps[0].title}</h3>
                  <div className="flex items-center text-slate-300 mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-indigo-400" />
                    {featuredProps[0].location}
                  </div>
                  
                  {/* Specs */}
                  <div className="flex items-center gap-6 text-slate-200">
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-5 h-5" /> {featuredProps[0].beds} Beds
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5" /> {featuredProps[0].baths} Baths
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="w-5 h-5" /> {featuredProps[0].area}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-white mb-2">{featuredProps[0].price}<span className="text-lg text-slate-300 font-normal">/mo</span></div>
                  <button
                  onClick={() => navigate(`/properties`)}
                   className="bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2">
                    View Details <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Column (Right - Spans 5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            {featuredProps.slice(1).map((prop, index) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative group flex-1 rounded-3xl overflow-hidden shadow-lg min-h-[280px]"
              >
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                {/* Tag */}
                <div className="absolute top-4 left-4 bg-indigo-600/90 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {prop.tag}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{prop.title}</h3>
                      <div className="flex items-center text-slate-300 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1 text-indigo-400" />
                        {prop.location}
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-xl font-bold text-white">{prop.price}</div>
                       <div className="text-xs text-slate-300">/month</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-1">
                    <div className="flex items-center gap-4 text-slate-200 text-xs">
                      <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /> {prop.beds}</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {prop.baths}</span>
                      <span className="flex items-center gap-1"><Square className="w-3.5 h-3.5" /> {prop.area}</span>
                    </div>
                    <button onClick={() => navigate(`/properties`)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
