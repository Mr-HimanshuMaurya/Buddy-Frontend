import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Phone, Mail, MapPin, Send, User, Building2, Globe, Sparkles, ArrowRight } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import Video1 from "../assets/about2.mp4";

// --- Components ---

function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

const InputField = ({ icon: Icon, type, name, value, onChange, placeholder }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all duration-300"
      placeholder={placeholder}
      required
    />
  </div>
);

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
        toast.success(data.message || 'Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          number: '',
          city: '',
          message: ''
        });
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
      desc: "Mon-Fri from 8am to 5pm."
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "support@buddy.com",
      link: "mailto:support@buddy.com",
      desc: "Speak to our friendly team."
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Bangalore, India",
      link: "#",
      desc: "Visit our office HQ."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
      
      {/* Background Video Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden">
         <video
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            src={Video1}
            autoPlay
            loop
            muted
            playsInline
         />
         <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-[2px]" />
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/40 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6 shadow-sm"
          >
            <Sparkles size={14} className="fill-indigo-600" /> <span>We'd love to hear from you</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6"
          >
            Let's start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">
              Conversation
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you have a question about properties, pricing, or anything else, our team is ready to answer all your questions.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <SpotlightCard className="rounded-2xl p-6 hover:border-indigo-200 transition-colors">
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-sm mb-3">{item.desc}</p>
                      <a href={item.link} className="text-slate-900 font-semibold hover:text-indigo-600 transition-colors flex items-center gap-2 group/link">
                        {item.value} <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}


          </div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl border border-slate-200 bg-white/70 backdrop-blur-xl p-8 md:p-10 shadow-2xl shadow-slate-200/50">
              {/* Decorative gradient line */}
              <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h2>
                <p className="text-slate-500 text-sm">We usually respond within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <InputField icon={User} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
                  <InputField icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                   <InputField icon={Phone} type="text" name="number" 
                      value={formData.number} 
                      onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (val.length <= 10) setFormData({ ...formData, number: val });
                      }} 
                      placeholder="Phone Number" 
                   />
                   <InputField icon={Building2} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                </div>

                <div className="relative group">
                  <div className="absolute top-4 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all duration-300 resize-none"
                    placeholder="Tell us about your requirements..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
