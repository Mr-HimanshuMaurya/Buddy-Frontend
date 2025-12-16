import Plan4 from "../../assets/Plan4.jpg";

export default function LocationMap() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 mt-[120px] text-center space-y-10">
      {/* Heading */}
      <h2 className="text-[60px] font-extrabold text-gray-900 leading-tight">
        Discover Our Layout Map
      </h2>

      {/* Subheading */}
      <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
        Nestled amidst lush green surroundings, Amira Greens offers the perfect
        blend of connectivity, serenity, and modern infrastructure — a
        destination where nature and luxury coexist.
      </p>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-5 mt-6 mb-10">
        <span className="bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full text-base font-semibold">
          🌿 Eco-Friendly Community
        </span>
        <span className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-base font-semibold">
          📍 Prime Location
        </span>
        <span className="bg-yellow-100 text-yellow-700 px-6 py-3 rounded-full text-base font-semibold">
          🏡 Luxury Living
        </span>
      </div>

      {/* Map Image */}
      <div className="rounded-2xl mt-[20px] overflow-hidden shadow-2xl ">
        <img
          src={Plan4}
          alt="Amira Greens Location Map"
          className="w-full h-auto object-cover hover:scale-[1.03] transition-transform duration-700"
        />
        
      </div>
     

      {/* ===== Description Below Image ===== */}
    
    </section>
  );
}
