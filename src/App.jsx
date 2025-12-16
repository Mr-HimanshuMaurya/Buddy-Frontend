import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import About from "./components/About.jsx";
import Properties from "./components/Properties.jsx";
import Commercial from "./components/properties/Commercial.jsx";
import Residencial from "./components/properties/Residencial.jsx";
import ROI from "./components/properties/ROI.jsx";
import Contact from "./components/contact.jsx";
import Login from "./components/Login.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import EnquiryForm from "./components/ui/enquiry.jsx";
import { useEffect } from "react";
import PgDasboard from "./components/pgOwners/PgDasboard.jsx";
import PgRoute from "./routes/PgRoute.jsx"

function App() {
  const location = useLocation();
  const hideChrome =
    location.pathname === "/login" ||
    location.pathname.startsWith("/admin") ||
    location.pathname === "/pgDasboard";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
    <PgRoute/>
      {!hideChrome && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/commercial" element={<Commercial />} />
        <Route path="/properties/residential" element={<Residencial />} />
        <Route path="/properties/roi" element={<ROI />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pgDasboard" element={<PgDasboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/enquiry" element={<EnquiryForm />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!hideChrome && (
        <div className="mt-[50px]">
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
