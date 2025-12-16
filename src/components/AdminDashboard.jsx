/* src/components/AdminDashboard.jsx */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";

import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable"; // <-- Correct import

export default function AdminDashboard() {
  // Remove <any[]>, <boolean> – just use initial value
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  /* ------------------- Auth & fetch ------------------- */
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth || auth !== "true") {
      navigate("/login");
      return;
    }
    fetchContacts();
  }, [navigate]);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiUrl}/details`);
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
        toast.success(`Loaded ${data.length} contacts`);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to fetch");
      }
    } catch (e) {
      console.error(e);
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast.success("Logged out!");
    setTimeout(() => navigate("/"), 1000);
  };

  /* ------------------- PDF DOWNLOAD ------------------- */
  const downloadPDF = () => {
    if (!contacts.length) {
      toast.warn("No data to export");
      return;
    }

    try {
      const doc = new jsPDF({ orientation: "landscape" });

      doc.setFontSize(18);
      doc.text("Contact Submissions Report", 14, 15);

      const head = [["Name", "Email", "Number", "City", "Message"]];
      const body = contacts.map((c) => [
        c.name || "-",
        c.email || "-",
        c.number || "-",
        c.city || "-",
        c.message && c.message.length > 80
          ? c.message.slice(0, 80) + "…"
          : c.message || "-",
      ]);

      // Correct way: autoTable(doc, { ... })
      autoTable(doc, {
        head,
        body,
        startY: 25,
        theme: "grid",
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        columnStyles: { 4: { cellWidth: 70 } },
      });

      // Page numbers
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      }

      doc.save(
        `contact-submissions-${new Date().toISOString().slice(0, 10)}.pdf`
      );
      toast.success("PDF downloaded!");
    } catch (err) {
      console.error("PDF error:", err);
      toast.error("Failed to create PDF");
    }
  };

  /* ------------------- Today's count ------------------- */
  const todayCount = contacts.filter((c) => {
    if (!c) return false;

    let contactDate;

    // If createdAt exists, use it
    if (c.createdAt) {
      contactDate = new Date(c.createdAt);
    }
    // Otherwise, extract timestamp from MongoDB ObjectId
    else if (c._id) {
      // MongoDB ObjectId contains timestamp in first 4 bytes
      // Extract timestamp from ObjectId string
      try {
        const timestamp = parseInt(c._id.toString().substring(0, 8), 16) * 1000;
        contactDate = new Date(timestamp);
      } catch {
        return false;
      }
    } else {
      return false;
    }

    const today = new Date();
    const isToday =
      contactDate.getDate() === today.getDate() &&
      contactDate.getMonth() === today.getMonth() &&
      contactDate.getFullYear() === today.getFullYear();

    return isToday;
  }).length;

  /* ------------------- Render ------------------- */
  return (
    
    <div className="h-screen bg-gray-100 font-inter">
      
      
      <main className="h-full flex flex-col overflow-auto">
        <div className="p-8 mt-[20px] overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10 px-6">
            <img src={logo} alt="Logo" className="h-12 w-30" />

            <div className="flex items-center gap-4">
              <button
                onClick={fetchContacts}
                disabled={isLoading}
                className="w-[120px] h-[40px] rounded-[15px] bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className={`w-5 h-5 mr-2 ${isLoading ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {isLoading ? "Refreshing..." : "Refresh"}
              </button>

              <button
                onClick={downloadPDF}
                disabled={isLoading || contacts.length === 0}
                className="w-[140px] h-[40px] rounded-[15px] bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m-9 9h12a1 1 0 001-1V7a1 1 0 00-1-1H5a1 1 0 00-1 1v12a1 1 0 001 1z"
                  />
                </svg>
                Download PDF
              </button>

              <button
                onClick={handleLogout}
                className="w-[120px] h-[40px] rounded-[15px] bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 mt-[20px] gap-6 mb-16">
            {/* Total Contacts */}
            <div className="bg-gradient-to-tr ml-[10px] from-[#00C6FF] via-[#0072FF] to-[#0047FF] text-white shadow-2xl rounded-2xl p-6 text-center h-44 flex flex-col justify-center items-center transform transition-all hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(0,114,255,0.6)]">
              <h3 className="text-lg font-semibold mb-3 drop-shadow-md">
                Total Contacts
              </h3>
              <p className="text-5xl font-extrabold drop-shadow-lg">
                {contacts.length}
              </p>
            </div>

            {/* Today's Submissions */}
            <div className="bg-gradient-to-tr from-[#00FF87] via-[#60EFFF] to-[#0099FF] text-white shadow-2xl rounded-2xl p-6 text-center h-44 flex flex-col justify-center items-center transform transition-all hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(0,200,200,0.6)]">
              <h3 className="text-lg font-semibold mb-3 drop-shadow-md">
                Today's Submissions
              </h3>
              <p className="text-5xl font-extrabold drop-shadow-lg">
                {todayCount}
              </p>
            </div>

            {/* Total Users */}
            <div className="bg-gradient-to-tr mr-[10px] from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77] text-white shadow-2xl rounded-2xl p-6 text-center h-44 flex flex-col justify-center items-center transform transition-all hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(255,107,107,0.6)]">
              <h3 className="text-lg font-semibold mb-3 drop-shadow-md">
                Total Users
              </h3>
              <p className="text-5xl font-extrabold drop-shadow-lg">1</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl mt-[20px] shadow-lg p-6 h-[calc(100vh-500px)] min-h-[500px] flex flex-col">
            <h3 className="text-[30px] mt-[10px] text-center mb-6 font-semibold text-gray-800">
              Contact Details
            </h3>

            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-500">Loading contacts...</p>
                </div>
              </div>
            ) : contacts.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                No contact submissions yet.
              </div>
            ) : (
              <div className="overflow-x-auto ml-[10px] mr-[10px] flex-1 rounded-xl border border-gray-300">
                <table className="min-w-full text-sm text-gray-800 border-collapse">
                  <thead>
                    <tr className="bg-[#1E88E5] text-white text-left">
                      <th className="py-4 px-5 font-semibold border border-gray-300 text-base">
                        Name
                      </th>
                      <th className="py-4 px-5 font-semibold border border-gray-300 text-base">
                        Email
                      </th>
                      <th className="py-4 px-5 font-semibold border border-gray-300 text-base">
                        Number
                      </th>
                      <th className="py-4 px-5 font-semibold border border-gray-300 text-base">
                        City
                      </th>
                      <th className="py-4 px-5 font-semibold border border-gray-300 text-base">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c, i) => (
                      <tr
                        key={c._id || i}
                        className={`${
                          i % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } hover:bg-yellow-50 transition-all`}
                      >
                        <td className="py-4 px-5 border border-gray-300 text-[15px] font-medium">
                          {c.name || "-"}
                        </td>
                        <td className="py-4 px-5 border border-gray-300 text-[15px]">
                          {c.email || "-"}
                        </td>
                        <td className="py-4 px-5 border border-gray-300 text-[15px]">
                          {c.number || "-"}
                        </td>
                        <td className="py-4 px-5 border border-gray-300 text-[15px]">
                          {c.city || "-"}
                        </td>
                        <td className="py-4 px-5 border border-gray-300 text-[15px]">
                          {c.message || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        theme="light"
      />
    </div>
  );
}
