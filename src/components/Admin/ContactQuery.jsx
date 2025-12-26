import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Clock, Mail, MapPin, MessageSquare, Phone, Search, Trash2, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {motion} from 'framer-motion'

export default function ContactQuery() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [typeFilter, setTypeFilter] = useState('')
  const limit = 5
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"

  useEffect(() => {
    fetchContacts(currentPage)
  }, [currentPage, typeFilter])

  const fetchContacts = async (page = 1) => {
    setLoading(true)
    try {
      let url = `${apiUrl}/contact/details?page=${page}&limit=${limit}`
      if (typeFilter) {
        url += `&type=${typeFilter}`
      }
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        const fetchedContacts = data.data?.contacts || data.data || []
        setContacts(fetchedContacts)
        setTotalPages(data.data?.totalPages || 1)
        setTotal(data.data?.total || 0)
      } else {
        toast.error(data.message || "Failed to fetch contacts")
      }
    } catch (error) {
      console.error("Error fetching contacts:", error)
      toast.error("Network error")
    } finally {
      setLoading(false)
    }
  }

  // Reset to page 1 when search term changes
  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1)
    }
  }, [searchTerm])

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = 
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleDelete = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this contact query?")) return
    
    try {
      const response = await fetch(`${apiUrl}/contact/details/${contactId}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        // Refresh the current page or go to previous page if current page becomes empty
        if (contacts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1)
        } else {
          fetchContacts(currentPage)
        }
        toast.success("Contact query deleted successfully")
      } else {
        const data = await response.json()
        toast.error(data.message || "Failed to delete contact query")
      }
    } catch (error) {
      console.error("Error deleting contact:", error)
      toast.error("Network error")
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'contact':
        return 'bg-blue-100 text-blue-800'
      case 'enquiry':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout pageTitle="Contact Queries">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">All Contact Queries</h2>
              <p className="text-gray-500 mt-1">Total: {total} contacts</p>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              

              {/* Search Bar */}
              <div className="relative flex-1 sm:flex-none sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-center text-gray-500 mt-4">Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No contacts found</h3>
            <p className="text-gray-500">No contacts match your search criteria.</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {filteredContacts.map((contact, index) => (
                <motion.div
                  key={contact._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                      {contact.name?.[0]?.toUpperCase() || 'C'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-gray-900 mb-1">
                        {contact.name || "Unknown"}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(contact.type)}`}>
                          {contact.type || 'contact'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Delete Contact"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="font-medium truncate">{contact.email || "N/A"}</span>
                    </div>
                    {contact.number && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-gray-400 flex-shrink-0" />
                        <span>{contact.number}</span>
                      </div>
                    )}
                    {contact.city && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                        <span>{contact.city}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                      <span>{formatDate(contact.createdAt)}</span>
                    </div>
                    {contact.message && (
                      <div className="mt-2 p-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                        {contact.message}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContacts.map((contact, index) => (
                      <motion.tr
                        key={contact._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold text-base lg:text-lg shadow-lg flex-shrink-0">
                              {contact.name?.[0]?.toUpperCase() || 'C'}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-gray-900">
                                {contact.name || "Unknown"}
                              </div>
                              {contact.city && (
                                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                  <MapPin size={12} />
                                  {contact.city}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail size={14} className="text-gray-400 flex-shrink-0" />
                              <span className="font-medium truncate max-w-[200px]">{contact.email || "N/A"}</span>
                            </div>
                            {contact.number && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone size={14} className="text-gray-400 flex-shrink-0" />
                                <span>{contact.number}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(contact.type)}`}>
                            {contact.type || 'contact'}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <div className="text-sm text-gray-600 max-w-[300px] line-clamp-2">
                            {contact.message || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={14} className="text-gray-400 flex-shrink-0" />
                            <span>{formatDate(contact.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <button
                            onClick={() => handleDelete(contact._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Contact"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Pagination */}
        {!loading && filteredContacts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, total)} of {total} contacts
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                </button>
                <div className="flex items-center gap-1 overflow-x-auto">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                            currentPage === pageNum
                              ? 'bg-indigo-600 text-white'
                              : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return <span key={pageNum} className="px-1 sm:px-2 text-gray-400 text-xs sm:text-sm">...</span>
                    }
                    return null
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
