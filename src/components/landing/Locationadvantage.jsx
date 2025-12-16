export default function LocationAdvantage() {
  const locations = [
    { title: "NH44 (Mathura Road)", time: "8 Mins Away", color: "text-red-600" },
    { title: "Palwal City", time: "10 Mins Away", color: "text-red-600" },
    { title: "Eastern & Western Peripheral Expressway", time: "10 Mins Away", color: "text-red-600" },
    { title: "Delhi", time: "45 Mins Away", color: "text-red-600" },
    { title: "Delhi-Mumbai Expressway", time: "15 Mins Away", color: "text-orange-600" },
    { title: "Vrindavan", time: "40 Mins Away", color: "text-orange-600" },
    { title: "Gurugram", time: "30 Mins Away", color: "text-orange-600" },
    { title: "Jewar International Airport", time: "30 Mins Away", color: "text-orange-600" },
  ];

  return (
    <section className="bg-white ashubom ashuboms py-10 mt-[40px] px-4 text-center">
      <h2 className="text-[60px] font-bold text-blue-900 mb-2">Location Advantage</h2>

      <p className="text-gray-700 mt-[20px] mb-8">
        Project Address:{" "}
        <span className="font-semibold">
          Amira Greens, Village Teekri Brahman, Palwal, Haryana
        </span>
      </p>

      {/* Center marker */}
      <div className="flex justify-center mb-10">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex mt-[10px] items-center justify-center text-white text-3xl shadow-md">
            📍
          </div>
          <div className="bg-green-600 text-white mt-2 px-3 py-1 rounded-md font-medium text-sm shadow-sm">
            Amira Greens
          </div>
        </div>
      </div>

      {/* Compact 4-column grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 mt-[15px] sm:grid-cols-3 md:grid-cols-4 gap-6 px-4">
        {locations.map((loc, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl border border-gray-100 p-4 hover:shadow-lg transition"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 ${loc.color} text-xl mb-2`}
            >
              📌
            </div>
            <p className={`font-semibold ${loc.color} text-sm leading-tight text-center`}>
              {loc.title}
            </p>
            <p className="text-gray-600 text-xs mt-1">{loc.time}</p>
          </div>
        ))}
      </div>

      <p className="max-w-2xl mt-[60px] mx-auto text-gray-700 leading-relaxed">
        A rare blend of serene countryside charm and seamless urban connectivity, Amira Greens is perfectly positioned to let you enjoy nature’s calm while staying connected to India’s fastest-growing development corridors.
      </p>
    </section>
  );
}
