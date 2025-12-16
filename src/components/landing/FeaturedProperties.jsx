import Image4 from "../../assets/Image20.jpg"
export default function FeaturedProperties() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 mt-[120px]">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 ">
          <span className="h-4 w-4 rounded-md bg-yellow-500 inline-block"></span>
          <h2 className="text-[40px] font-semibold">Redefining Luxury Living in Noida</h2>
        </div>
        <p className="text-[20px ] text-gray-500 mt-2">
          Exclusive Listings Handpicked by Our Expert Real Estate Agents
        </p>  
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-[40px] items-center mt-10">
        <div className="aspect-video ashubom ashuboms rounded-xl overflow-hidden">
        <img
      src={Image4}
      alt="Residential Property"
      className="rounded-lg shadow-lg"
    />
        </div>
        <div className="flex flex-col justify-center">
        <h3 className="text-2xl font-semibold">
  Our Rooms is a trusted room rental platform dedicated to redefining the accommodation experience in Faridabad. We assist students, professionals, working couples, NRIs, and relocating families by offering personalized room rental services in the prime locations of Faridabad, through an exclusive collection of premium accommodations — including private rooms, shared rooms, PG accommodations, furnished apartments, studio flats, and co-living spaces.

  Founded with a mission to simplify room hunting, we've spent years excelling in the competitive Faridabad rental market, earning a stellar reputation as trusted advisors known for delivering quality solutions to a diverse clientele. Our foundation is built on communication, dedication, and transparency, values that have helped us become one of the most respected room rental platforms in Faridabad.

  With our deep understanding of the local market and commitment to excellence, we've helped over 500+ residents find their ideal homes and comfortable living spaces in Faridabad. We are confident we can help you discover yours too — whether for your career transition, relocation, or finding the perfect accommodation that fits your lifestyle and budget.
</h3>

         
         
        </div>
      </div>
    </section>
  );
}
