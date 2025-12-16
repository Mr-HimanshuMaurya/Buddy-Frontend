import makeMyTrip from "../../assets/bank.png";
import booking from "../../assets/bank2.png";
import goibibo from "../../assets/bank3.webp";
import yatra from "../../assets/bank4.png";
import yatras from "../../assets/bank5.png";
import yatrass from "../../assets/bank6.png";

export default function TravelPartners() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-[60px] mt-[40px] font-bold text-gray-800 mb-8">
          Our Loan Partners
        </h2>

        {/* Logos Row */}
        <div className="flex justify-between items-center gap-6 flex-nowrap overflow-x-auto hide-scrollbar">
          <img
            src={makeMyTrip}
            alt="MakeMyTrip"
            className="h-12 w-30 object-contain hover:scale-105 transition-transform duration-300"
          />
          <img
            src={booking}
            alt="Booking.com"
            className="h-12 w-30 object-contain hover:scale-105 transition-transform duration-300"
          />
          <img
            src={goibibo}
            alt="Goibibo"
            className="h-12 w-30 object-contain hover:scale-105 transition-transform duration-300"
          />
          <img
            src={yatra}
            alt="Yatra"
            className="h-12 w-30 object-contain hover:scale-105 transition-transform duration-300"
          />
          <img
            src={yatras}
            alt="Yatra"
            className="h-12 w-30 object-contain hover:scale-105 transition-transform duration-300"
          />
          <img
            src={yatrass}
            alt="Yatra"
            className="h-12 w-30 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
