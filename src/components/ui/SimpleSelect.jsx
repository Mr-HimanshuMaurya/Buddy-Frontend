import { useEffect, useRef, useState } from "react";

export default function SimpleSelect({ options, placeholder = "Select", onChange, className = "" }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  function handleSelect(option) {
    setValue(option);
    onChange && onChange(option);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        className="h-12 w-60 rounded-sm border border-white/40 bg-white/20 backdrop-blur-sm text-white px-4 text-sm shadow-sm focus:ring-2 focus:ring-yellow-500/60 focus:outline-none flex items-center justify-between"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{value ?? placeholder}</span>
        <svg className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-60 rounded-sm border border-white/40 bg-white/20 backdrop-blur-sm text-white shadow-lg">
          <ul className="max-h-56 overflow-auto py-1">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-white/30"
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


