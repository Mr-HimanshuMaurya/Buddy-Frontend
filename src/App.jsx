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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import EnquiryForm from "./components/ui/enquiry.jsx";
import { useEffect } from "react";
import PgDashboard from "./components/PgOwner/PgDashboard.jsx";
import CreateProperty from "./components/PgOwner/CreateProperty.jsx";
import PgOwnerProtectedRoute from "./components/PgOwner/PgOwnerProtectedRoute.jsx";
import PgOwnerAuth from "./components/PgOwner/PgOwnerAuth.jsx";
import PropertyDetails from "./components/properties/PropertyDetails.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import AdminDashboard from "./components/Admin.jsx/AdminDashboard.jsx"

function App() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const isPropertyDetailsRoute =
    segments[0] === "properties" &&
    segments.length === 2 &&
    !["commercial", "residential", "roi"].includes(segments[1]);
  const hideChrome =
    location.pathname === "/login" ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/pg-owner/") ||
    isPropertyDetailsRoute;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      {!hideChrome && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/commercial" element={<Commercial />} />
        <Route path="/properties/residential" element={<Residencial />} />
        <Route path="/properties/roi" element={<ROI />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/enquiry" element={<EnquiryForm />} />
        <Route path="/pg-owner/dashboard" element={<PgDashboard/>}/>
        <Route path="/pg-owner-login" element={<PgOwnerAuth />} />
        <Route path="/pg-owner/create-property" element={<CreateProperty />} />
        <Route path="/pg-owner/properties/:id" element={<PropertyDetails />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />


        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!hideChrome && (
          <Footer />
      )}
    </>
  );
}

export default App;
