import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../assets/Image2.jpeg";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    city: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Allow only digits in number field
    if (name === "number") {
      const digitsOnly = value.replace(/\D/g, ""); // Remove non-digits
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate number field before submitting
    if (formData.number.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number!");
      return;
    }
    

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      toast.success("Enquiry submitted successfully!");
      setFormData({ name: "", number: "", city: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex flex-col ashubom ashuboms items-center justify-center w-full min-h-[100vh] bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div
        className="bg-white/20 backdrop-blur-md border border-white/30
          shadow-2xl rounded-2xl py-8 md:py-12 px-4 md:px-12 
          max-w-2xl w-full mx-auto ml-4 md:ml-12"
      >
        <form ref={formRef} className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <h1 className="text-[40px] font-extrabold  bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 mb-10 text-center drop-shadow-lg">
            Enquiry-form
          </h1>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="rounded-[10px] shadow-md ashubom px-8 py-[22px] text-base text-gray-800 placeholder-gray-600 focus:outline-none focus:shadow-lg bg-white/80 backdrop-blur-sm"
            required
          />

          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Enter Your 10-Digit Number"
            maxLength={10}
            className="rounded-[10px] shadow-md ashubom px-8 py-[22px] text-base text-gray-800 placeholder-gray-600 focus:outline-none focus:shadow-lg bg-white/80 backdrop-blur-sm"
            required
          />

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter Your City"
            className="rounded-[10px] shadow-md ashubom px-8 py-[22px] text-base text-gray-800 placeholder-gray-600 focus:outline-none focus:shadow-lg bg-white/80 backdrop-blur-sm"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your queries here..."
            rows={5}
            className="rounded-[10px] shadow-md ashubom px-8 py-[22px] text-base text-gray-800 placeholder-gray-600 focus:outline-none focus:shadow-lg bg-white/80 backdrop-blur-sm resize-none"
            required
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[140px] h-[45px] cursor-pointer mb-[20px] rounded-[15px] bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
