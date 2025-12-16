import { MapPin, BedDouble, Bath, Square } from "lucide-react";

export default function BuilderFloors() {
  const listings = [
    {
      id: 1,
      title: "4BHK Apartment For Sale In Vasant Vihar",
      location: "Vasant Vihar",
      type: "Apartment, Builder Floors, Residential",
      price: "Price Upon Request",
      beds: 4,
      baths: 5,
      area: 2300,
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1935&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Builder Floor For Sale In GK 1 Enclave",
      location: "Greater Kailash Enclave 1",
      type: "Apartment, Builder Floors, Residential",
      price: "Price Upon Request",
      beds: 4,
      baths: 5,
      area: 2700,
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1935&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Third Floor For Sale In SDA",
      location: "SDA",
      type: "Apartment, Builder Floors, Residential",
      price: "Price Upon Request",
      beds: 4,
      baths: 6,
      area: 3000,
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1935&auto=format&fit=crop",
    },
    {
      id: 1,
      title: "4BHK Apartment For Sale In Vasant Vihar",
      location: "Vasant Vihar",
      type: "Apartment, Builder Floors, Residential",
      price: "Price Upon Request",
      beds: 4,
      baths: 5,
      area: 2300,
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1935&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Builder Floor For Sale In GK 1 Enclave",
      location: "Greater Kailash Enclave 1",
      type: "Apartment, Builder Floors, Residential",
      price: "Price Upon Request",
      beds: 4,
      baths: 5,
      area: 2700,
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1935&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Third Floor For Sale In SDA",
      location: "SDA",
      type: "Apartment, Builder Floors, Residential",
      price: "Price Upon Request",
      beds: 4,
      baths: 6,
      area: 3000,
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1935&auto=format&fit=crop",
    },
    {
      id: 1,
      title: "4BHK Apartment For Sale In Vasant Vihar",
      location: "Vasant Vihar",
      type: "Apartment, Builder Floors, Residential",
      price: "Price Upon Request",
      beds: 4,
      baths: 5,
      area: 2300,
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1935&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Builder Floor For Sale In GK 1 Enclave",
      location: "Greater Kailash Enclave 1",
      type: "Apartment, Builder Floors, Residential",
      price: "Price Upon Request",
      beds: 4,
      baths: 5,
      area: 2700,
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1935&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Third Floor For Sale In SDA",
      location: "SDA",
      type: "Apartment, Builder Floors, Residential",
      price: "Price Upon Request",
      beds: 4,
      baths: 6,
      area: 3000,
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1935&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* ---------------- HERO SECTION ---------------- */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-5xl sm:text-6xl font-bold mb-3">
            Explore <span className="text-yellow-400">Properties</span>
          </h1>
          <div className="w-16 border-b-4 border-yellow-400"></div>
        </div>

        <div className="absolute right-10 top-10 hidden md:flex space-x-6 text-white font-medium">
          <a href="/" className="hover:text-yellow-400 transition">
            Home
          </a>
          <a href="/properties" className="hover:text-yellow-400 transition">
            Properties
          </a>
        </div>
      </section>

      {/* ---------------- RESIDENTIAL SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12  mt-[80px] items-center">
        {/* Left Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
            alt="Residential Property"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right Text */}
        <div>
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-sm mr-2"></div>
            <h2 className="text-[60px] font-bold text-gray-900">
  <span className="text-gray-800">ROI</span>{" "}
  <span className="text-yellow-500">Properties</span>
</h2>

          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            The increasing demand for luxury homes is reshaping the real estate
            landscape in South Delhi. Working professionals and business owners,
            especially millennials, are increasingly investing in luxury homes to
            upgrade their quality of life and be proud of their achievements.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            However, finding the right type of luxury residential property in
            South Delhi is always a challenging task. As the demand for luxury
            homes increases, the number of luxury apartments for sale has also
            increased. Although the options for homebuyers have increased, so is
            the confusion.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            There are a lot of things to consider before buying a luxury home,
            such as location, neighborhood, lifestyle, land prices, amenities,
            quality, pricing, overhead costs, maintenance, resale value,
            infrastructure quality, builder profile, client background, safety,
            and future development.
          </p>

          <p className="text-gray-700 leading-relaxed">
            At Royale Realtors, we do the heavy lifting for you by finding the
            best houses as per your requirements. All you need to do is tell us
            your needs, budget, and preferences, and we’ll find luxury
            ROI properties in South Delhi accordingly.
          </p>
        </div>
      </section>

      {/* ---------------- PROPERTY CARDS SECTION ---------------- */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 mt-[40px] sm:px-6 lg:px-8">
          {/* Section Heading */}
          <h2 className="text-[40px] font-bold text-gray-900 mb-10 text-center">
            Latest Properties
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 mt-[40px] lg:grid-cols-3">
            {listings.map((home) => (
              <div
              key={home.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-60">
                <img
                  src={home.img}
                  alt={home.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
                  For Sale
                </span>
                <span className="absolute top-3 right-3 bg-white p-1 rounded-full shadow cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </span>
              </div>
            
              {/* Content Section */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {home.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={14} className="mr-1 text-amber-500" />
                    {home.location}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{home.type}</p>
                  <p className="text-sm font-medium text-gray-800 mt-2">
                    {home.price}
                  </p>
                </div>
            
                {/* Bottom icons */}
                <div className="flex items-center justify-between text-gray-600 text-sm  pt-3 mt-3">
                  <div className="flex items-center ml-[6px] gap-1">
                    <BedDouble size={16} />
                    <span>{home.beds}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath size={16} />
                    <span>{home.baths}</span>
                  </div>
                  <div className="flex items-center mr-[6px] gap-1">
                    <Square size={16} />
                    <span>{home.area} sqft</span>
                  </div>
                </div>
              </div>
            </div>
            
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
