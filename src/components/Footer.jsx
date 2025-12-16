import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-black mt-10 text-white">
      <div className="mx-auto max-w-7xl px-4 py-[52px]">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            {/* Logo and tagline */}
            <div className="flex items-center justify-start -ml-4">
              <img
                src={logo}
                alt="Amira Greens"
                className="block h-12 w-40 object-contain"
              />

              <div className="text-sm text-white/80 max-w-sm ml-4">
                The Ultimate Hub for Buying and Selling Luxury Residences and
                World-Class Commercial Properties.
              </div>
            </div>

            {/* AMIRA letters centered */}
            <div className="flex items-center justify-center gap-3 mt-[-30px] ml-[150px]">
              {["A", "M", "I", "R", "A"].map((s) => (
                <span
                  key={s}
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-lg"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm ashubom text-white/60">CALL</div>
            <div className="mt-2 ashubom text-white">+91 8130426298</div>
        
            <div className="mt-6 ashubom text-sm text-white/60">WRITE</div>
            <div className="mt-2 space-y-1">
              {/* <a href="mailto:info@royalerealtorsindia.com" className="text-white/90 hover:text-white text-sm">www.amiralandholdings.com</a> */}
              <div className="text-white/90 ashubom text-sm">
                info@amiralandholdings.com
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm ashubom text-white/60">VISIT</div>
            <div className="mt-2 ashubom text-white/90 text-sm max-w-xs">
              Nawal Tower, Sector 116, Machchgar, Mohna Road, Near IMT,
              Faridabad, Haryana
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/70">
          © AMIRA GREENS {new Date().getFullYear()}. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
