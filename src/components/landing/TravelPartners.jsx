import React from "react";
import {
  FaSnowflake,
  FaBed,
  FaWifi,
  FaTv,
  FaKey,
  FaTable,
} from "react-icons/fa";
import { MdBalcony, MdWater } from "react-icons/md";
import { TbDeviceLandlinePhone } from "react-icons/tb";

export default function AmenitiesList() {
  const amenities = [
    { id: 1, title: "Air Conditioner", subtitle: "Surely Available", icon: <FaSnowflake size={36} className="text-sky-600" /> },
    { id: 2, title: "Balcony", subtitle: "You need to request", icon: <MdBalcony size={36} className="text-sky-600" /> },
    { id: 3, title: "Extra Bed", subtitle: "You need to request", icon: <FaBed size={36} className="text-sky-600" /> },
    { id: 4, title: "Flat TV", subtitle: "Surely Available", icon: <FaTv size={36} className="text-sky-600" /> },
    { id: 5, title: "Hot & Cold Water", subtitle: "Surely Available", icon: <MdWater size={36} className="text-sky-600" /> },
    { id: 6, title: "InterCom", subtitle: "Surely Available", icon: <TbDeviceLandlinePhone size={36} className="text-sky-600" /> },
    { id: 7, title: "Locker", subtitle: "Surely Available", icon: <FaKey size={36} className="text-sky-600" /> },
    { id: 9, title: "WiFi", subtitle: "Surely Available", icon: <FaWifi size={36} className="text-sky-600" /> },
  ];

  return (
    <section className="bg-[#003865] py-16 px-6 text-white relative pb-20">
      <h2 className="text-[80px] font-bold text-center">Amenities List</h2>
      <div className="w-20 h-1 bg-white mx-auto mt-2 mb-8 rounded"></div>

      <p className="text-center mt-[10px] max-w-3xl mx-auto text-gray-200 mb-12">
        We provide all the amenities, some amenities are surely available in all our service places.
        Some items are provided only on request as they are not mandatory.
      </p>

      {/* Amenities Grid */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-[15px]">
        {amenities.map((item) => (
          <div
            key={item.id}
            className="bg-white text-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center justify-center gap-4 hover:shadow-lg transition h-40"
          >
            {item.icon}

            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#003865]">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fade-out shifted to bottom */}
      <div className="h-10 w-full bg-gradient-to-t from-[#003865] to-transparent mt-10"></div>
    </section>
  );
}
