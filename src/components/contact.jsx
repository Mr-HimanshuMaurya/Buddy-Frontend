import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Video1 from "../assets/about2.mp4";

export default function Contact() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    city: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.number.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      setIsSubmitting(false);
      return;
    }
      

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Form submitted successfully!');
        formRef.current.reset();
        setFormData({
          name: '',
          email: '',
          number: '',
          city: '',
          message: ''
        });
      } else {
        toast.error(data.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="pt-16 overflow-x-hidden">
      {" "}
      {/* Offset for fixed header */}
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={Video1} // 👈 yaha apna video import wala variable
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay */}
        <div className="absolute ashubom ashuboms inset-0 bg-black/60" />
        {/* Accent gradient */}
        <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-linear-to-br from-yellow-400/30 to-yellow-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-linear-to-tr from-white/10 to-yellow-300/10 blur-3xl" />

        {/* Text */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-5xl sm:text-6xl font-bold mb-3 drop-shadow-lg">
            Contact <span className="text-yellow-400">Our Team</span>
          </h1>
          <div className="w-20 border-b-4 border-yellow-400" />
        </div>

        {/* Right-side small nav */}
        <div className="absolute right-10 top-10 hidden md:flex space-x-6 text-white font-medium p-10">
          <a href="/" className="hover:text-yellow-400 transition">
            Home
          </a>
          <a href="/contact" className="hover:text-yellow-400 transition">
            Contact Us
          </a>
        </div>
      </section>
      {/* ===== CONTACT SECTION ===== */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 mt-[60px] gap-12 items-stretch">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-2xl" />
        </div>

        {/* Left: Image */}
        <div className="relative ashubom ashuboms rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 ml-[10px]">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={Video1}
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Floating info card */}

          {/* <div className="absolute bottom-4 left-4 right-4 backdrop-blur-xl bg-white/70 md:bg-white/60 rounded-xl p-4 md:p-5 shadow-lg border border-white/40">
            <p className="text-gray-800 font-semibold mb-2">
              We’re just a message away
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white">
                
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.25a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-.659 1.591l-.772.772a.75.75 0 0 0-.154.838 12.04 12.04 0 0 0 6.245 6.245.75.75 0 0 0 .838-.154l.772-.772a2.25 2.25 0 0 1 1.591-.659h1.5A2.25 2.25 0 0 1 21.75 18v2.25A2.25 2.25 0 0 1 19.5 22.5c-9.665 0-17.5-7.835-17.5-17.5Z" />
                  </svg>
                </span>
                <span>+91 8130426298</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white">
                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.659-.75 6.87 5.153a2.25 2.25 0 0 0 2.742 0l6.87-5.153" />
                  </svg>
                </span>
                <span>info@amiralandholdings.com</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Right: Form / Info */}
        <div className="flex w-full justify-center items-center min-h-[70vh] bg-[#f8f9fa]">
          <div className="bg-white shadow-lg rounded-xl py-8 md:py-12 px-4 md:px-12 max-w-2xl w-full mx-auto ml-[5px] mr-[10px]">
            <h2 className="text-[28px] ashubom mt-[20px] md:text-[32px] font-extrabold text-black mb-5 pl-2 tracking-normal">
              Contact-Us
            </h2>
            <form
              ref={formRef}
              className="grid grid-cols-1 gap-6"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="rounded-[10px] shadow-md ashubom px-6 py-[21px] text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:shadow-lg bg-white"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="rounded-[10px] shadow-md ashubom px-6 py-[21px] text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:shadow-lg bg-white"
                required
              />
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={(e) => {
                  // Allow only digits
                  const value = e.target.value.replace(/\D/g, "");
                  // Limit to 10 digits
                  if (value.length <= 10) {
                    setFormData({ ...formData, number: value });
                  }
                }}
                placeholder="Enter Your Number"
                maxLength="10"
                className="rounded-[10px] shadow-md ashubom px-6 py-[21px] text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:shadow-lg bg-white"
                required
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter Your City"
                className="rounded-[10px] shadow-md ashubom px-6 py-[21px] text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:shadow-lg bg-white"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your queries here..."
                rows={5}
                className="rounded-[10px] shadow-md ashubom px-6 py-[21px] text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:shadow-lg bg-white resize-none"
                required
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[120px] h-[40px] cursor-pointer rounded-[15px] bg-linear-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        theme="light"
      />
    </div>
  );
}
