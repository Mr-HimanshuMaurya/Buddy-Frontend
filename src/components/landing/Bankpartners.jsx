import { motion } from "framer-motion";
import makeMyTrip from "../../assets/bank.png";
import booking from "../../assets/bank2.png";
import goibibo from "../../assets/bank3.webp";
import yatra from "../../assets/bank4.png";
import yatras from "../../assets/bank5.png";
import yatrass from "../../assets/bank6.png";

const partners = [
  { name: "Partner 1", logo: makeMyTrip },
  { name: "Partner 2", logo: booking },
  { name: "Partner 3", logo: goibibo },
  { name: "Partner 4", logo: yatra },
  { name: "Partner 5", logo: yatras },
  { name: "Partner 6", logo: yatrass },
];

export default function BankPartners() {
  return (
    <section className="py-10 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-3 py-1 rounded-full">
            Trusted Financial Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4">
            Our Banking & <span className="text-indigo-600">Loan Partners</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We've partnered with leading financial institutions to ensure you have seamless access to financial support for your accommodation needs.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        {/* Infinite Marquee */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-16 md:gap-24 items-center flex-nowrap"
            animate={{
              x: [0, -100 * partners.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Repeat partners list twice for seamless loop */}
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 group relative flex items-center justify-center"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 md:h-16 w-auto object-contain transition-all duration-300 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(79,70,229,0.6)]"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
