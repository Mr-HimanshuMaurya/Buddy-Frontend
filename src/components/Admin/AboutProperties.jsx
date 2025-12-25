import React, { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { motion } from 'framer-motion'
import { Building2, MapPin, DollarSign, Home, Eye, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react'

export default function AboutProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 5
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"

  useEffect(() => {
    fetchProperties(currentPage)
  }, [currentPage])

  const fetchProperties = async (page = 1) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/properties?page=${page}&limit=${limit}`)
      const data = await response.json()
      if (response.ok) {
        const fetchedProperties = data.data?.properties || data.data || []
        setProperties(fetchedProperties)
        setTotalPages(data.data?.totalPages || 1)
        setTotal(data.data?.total || 0)
      }
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }

  // Reset to page 1 when search term changes
  useEffect(() => {
    if (searchTerm) {
      // When searching, fetch all and filter client-side for simplicity
      // Or you could implement server-side search with pagination
      setCurrentPage(1)
    }
  }, [searchTerm])

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = 
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address?.locality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.propertyType?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return
    
    try {
      const response = await fetch(`${apiUrl}/properties/${id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        // Refresh the current page or go to previous page if current page becomes empty
        if (properties.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1)
        } else {
          fetchProperties(currentPage)
        }
        alert("Property deleted successfully")
      } else {
        const data = await response.json()
        alert(data.message || "Failed to delete property")
      }
    } catch (error) {
      console.error("Error deleting property:", error)
      alert("Network error")
    }
  }

  return (
    <AdminLayout pageTitle="About Properties">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">All Properties</h2>
              <p className="text-gray-500 mt-1">Total: {total} properties</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Properties Table */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-center text-gray-500 mt-4">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No properties found</h3>
            <p className="text-gray-500">No properties match your search criteria.</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {property.images?.[0]?.url ? (
                        <img 
                          src={property.images[0].url} 
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Home className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-gray-900 line-clamp-2 mb-1">
                        {property.title || "Untitled Property"}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {property.bedrooms || 0} Beds • {property.bathrooms || 0} Baths
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {property.propertyType || "N/A"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Delete Property"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-medium truncate">{property.address?.city || "N/A"}</div>
                        {property.address?.locality && (
                          <div className="text-xs text-gray-500 truncate">{property.address.locality}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-gray-900">
                        ₹{property.price?.amount?.toLocaleString('en-IN') || "0"}
                        <span className="text-xs font-normal text-gray-500">/{property.price?.period || "month"}</span>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        property.status === 'Available' 
                          ? 'bg-green-100 text-green-800'
                          : property.status === 'Booked'
                          ? 'bg-blue-100 text-blue-800'
                          : property.status === 'Maintenance'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status || "N/A"}
                      </span>
                    </div>
                    {property.owner && (
                      <div className="text-xs text-gray-500">
                        Owner: {property.owner?.firstname && property.owner?.lastname 
                          ? `${property.owner.firstname} ${property.owner.lastname}`
                          : property.owner?.email || "N/A"}
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
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Property</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProperties.map((property, index) => (
                      <motion.tr
                        key={property._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              {property.images?.[0]?.url ? (
                                <img 
                                  src={property.images[0].url} 
                                  alt={property.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Home className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-gray-900 line-clamp-1">
                                {property.title || "Untitled Property"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {property.bedrooms || 0} Beds • {property.bathrooms || 0} Baths
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="font-medium truncate">{property.address?.city || "N/A"}</div>
                              <div className="text-xs text-gray-500 truncate">{property.address?.locality || ""}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {property.propertyType || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                            ₹{property.price?.amount?.toLocaleString('en-IN') || "0"}
                            <span className="text-xs font-normal text-gray-500">/{property.price?.period || "month"}</span>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            property.status === 'Available' 
                              ? 'bg-green-100 text-green-800'
                              : property.status === 'Booked'
                              ? 'bg-blue-100 text-blue-800'
                              : property.status === 'Maintenance'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {property.status || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <div className="text-sm text-gray-600 truncate max-w-[120px]">
                            {property.owner?.firstname && property.owner?.lastname 
                              ? `${property.owner.firstname} ${property.owner.lastname}`
                              : property.owner?.email || "N/A"
                            }
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <button
                            onClick={() => handleDelete(property._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Property"
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
        {!loading && filteredProperties.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, total)} of {total} properties
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
                    // Show first page, last page, current page, and pages around current
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