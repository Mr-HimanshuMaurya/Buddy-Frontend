import Image3 from "../../assets/pg.webp";
export default function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 mt-[120px]">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="h-4 w-4 rounded-md bg-yellow-500 inline-block"></span>
            <h2 className="text-[50px] leading-tight font-semibold">
              Top Property Experts for Premium PG Accommodation in Delhi NCR
            </h2>
          </div>
          <p className="text-sm ashubom text-gray-600 mt-3">
            Your trusted partner for comfortable, secure, and premium PG living.
          </p>
          <p className="mt-4 ashubom text-gray-700">
            Our PG offers a refined living experience designed for students, working professionals, and families seeking comfort, safety, and convenience in Delhi-NCR.
            We provide fully furnished rooms, essential amenities, and a clean environment — ensuring you feel at home from the moment you move in.

            With years of experience in delivering managed accommodation, our team focuses on transparency, hygiene, and timely support. Whether you're looking for a quiet study-friendly space or a premium room with top-class facilities, we ensure a smooth and worry-free stay.
          </p>
        </div>
        <div className="rounded-xl ashubom ashuboms overflow-hidden">
          <img
            src={Image3}
            alt="Residential Property"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
