import Type1 from "../../assets/Design1.jpeg";
import Type2 from "../../assets/Design2.jpeg";
import Type3 from "../../assets/Design3.jpeg";
import Type4 from "../../assets/Design1.jpeg";
export default function Categories() {
  const categories = [
    {
     
     
      img:Type1,
    },
    {
    
     
      img: Type2,
    },
    {
     
      img: Type4,
    },
    {
     
      img: Type3,
    },
  ];

  return (
    <section className="mx-auto ashubom ashuboms max-w-7xl px-4 py-24 mt-[120px]">
      {/* === Section Header (Centered) === */}
      <div className="text-center mb-40">   {/* old value: mb-20, increase if needed */}
  <div className="inline-flex items-center gap-3 justify-center mb-4">
    <span className="h-7 w-7 rounded-md bg-yellow-500 inline-block"></span>
    <h2 className="text-[60px] font-semibold leading-tight text-gray-900">
      Check Our 3D <br />Layouts
    </h2>
  </div>

  <p className="text-gray-600 text-lg mt-3">
    Created by expert real estate agents!
  </p>

  <div className="h-1 w-28 bg-yellow-500 mt-[40px] mx-auto rounded-full"></div>
</div>

      {/* === Category Grid === */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Apartment (Large Left) */}
        <div className="relative overflow-hidden rounded-2xl sm:row-span-2 group">
          <img
            src={categories[0].img}
            alt="Apartment"
            className="h-[550px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">{categories[0].title}</h3>
            <p className="text-sm text-gray-200">{categories[0].properties}</p>
          </div>
        </div>

        {/* Middle Column (Farmhouse + Bungalow) */}
        <div className="flex flex-col gap-6">
          {categories.slice(1, 3).map((cat) => (
            <div
              key={cat.title}
              className="relative overflow-hidden rounded-2xl group"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="h-[250px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">{cat.title}</h3>
                <p className="text-sm text-gray-200">{cat.properties}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Condominium (Tall Right) */}
        <div className="relative overflow-hidden rounded-2xl sm:row-span-2 group">
          <img
            src={categories[3].img}
            alt="Condominium"
            className="h-[550px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">{categories[3].title}</h3>
            <p className="text-sm text-gray-200">{categories[3].properties}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
