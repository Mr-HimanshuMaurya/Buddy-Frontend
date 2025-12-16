import Plan4 from "../../assets/layout2.jpg";

export default function LocationMap() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 mt-[120px] text-center">
      {/* ===== Heading ===== */}
      <h2 className="text-[60px] font-extrabold text-gray-900 leading-tight mb-6">
        Discover Our Farmhouse Layout
      </h2>

      {/* ===== Subheading ===== */}
      <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed mb-10">
        Experience the perfect fusion of nature, comfort, and exclusivity at{" "}
        <span className="text-emerald-700 font-semibold">Amira Greens</span> —
        a beautifully planned farmhouse community that redefines countryside
        living with modern elegance.
      </p>

      {/* ===== Highlight Tags ===== */}
      <div className="flex flex-wrap justify-center gap-5 mb-16">
        <span className="bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full text-base font-semibold">
          🌿 Scenic Green Surroundings
        </span>
        <span className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-base font-semibold">
          📍 Seamless City Connectivity
        </span>
        <span className="bg-yellow-100 text-yellow-700 px-6 py-3 rounded-full text-base font-semibold">
          🏡 Premium Farmhouse Living
        </span>
      </div>

      {/* ===== Map Image ===== */}
      <div className="rounded-2xl overflow-hidden shadow-2xl  mb-20">
        <img
          src={Plan4}
          alt="Amira Greens Farmhouse Layout"
          className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
        />
      </div>

   
    </section>
  );
}
