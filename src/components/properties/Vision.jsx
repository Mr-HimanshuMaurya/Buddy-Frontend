export default function VisionMission() {
  return (
    <section className="flex justify-center items-center gap-8 py-10 bg-white">
      {/* Vision Card */}
      <div className="relative bg-[#0A1830] text-white rounded-[1.5rem] p-8 w-[300px] h-[220px] text-center flex flex-col justify-center">
        {/* Yellow Corner Circle */}
        <div className="absolute top-3 right-3 w-5 h-5 bg-[#F8C14A] rounded-full"></div>

        <h3 className="text-xl font-bold mb-3">Vision</h3>
        <p className="text-sm leading-relaxed">
          our vision is to build communities where people can experience a serene
          lifestyle while enjoying modern sophistication.
        </p>
      </div>

      {/* Divider */}
      <div className="h-[140px] w-[2px] bg-gray-300"></div>

      {/* Mission Card */}
      <div className="relative bg-[#0A1830] text-white mr-[20px] rounded-[1.5rem] p-8 w-[300px] h-[220px] text-center flex flex-col justify-center">
        {/* Yellow Corner Circle */}
        <div className="absolute top-3 right-3 w-5 h-5 bg-[#F8C14A] rounded-full"></div>

        <h3 className="text-xl font-bold mb-3">Mission</h3>
        <p className="text-sm ashubom leading-relaxed">
          our mission is to create luxurious farmhouses that blend nature, comfort,
          and modern living, offering our clients exclusive spaces that inspire
          peace, privacy, and long-term value.
        </p>
      </div>
    </section>
  );
}
