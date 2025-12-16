import hero from "../../assets/video1.mp4"; // 👈 adjust the path if needed
import SimpleSelect from "../ui/SimpleSelect.jsx";

export default function Hero() {
  return (
    <section className="relative h-[100vh] flex items-center overflow-hidden">
      {/* ====== Background Video ====== */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={hero}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ====== Overlay ====== */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ====== Content ====== */}
      <div className="relative z-10 mx-auto max-w-7xlv mt-[180px] px-4 text-center text-white">
        <p className="text-lg uppercase tracking-[3px] mb-6">
        Luxury isn’t about price — it’s about the experience
        </p>

        <h1 className="text-[80px] leading-tight font-extrabold text-white drop-shadow-2xl">
        We Delivers   <br />
          <span className="text-yellow-400 block">
          Premium Rooms
          </span>
        </h1>

        <div className="mt-10 mx-auto w-24 border-b-4 border-yellow-500"></div>

        {/* ====== FILTER BAR ====== */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-5">
        
          <SimpleSelect
            placeholder="All Main Locations"
            options={["All Main Locations", "New Delhi", "Gurugram", "Noida"]}
          />

          <SimpleSelect
            placeholder="All Status"
            options={["All Status", "For Sale", "For Rent"]}
          />

          <SimpleSelect
            placeholder="All Types"
            options={["All Types", "Apartment", "Villa", "Penthouse"]}
          />

          
          <button className="h-12 px-6 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-sm shadow-md transition flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
