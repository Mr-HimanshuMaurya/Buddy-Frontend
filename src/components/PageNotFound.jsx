import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        
        <p className="text-gray-500 mb-8">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <div className="space-y-3">
          <Link 
            to="/" 
            className="block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Go to Home
          </Link>
          
          <Link 
            to="/pg-owner/dashboard" 
            className="block w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors duration-200"
          >
            Go to Dashboard (PG Owner)
          </Link>
        </div>
      </div>
    </div>
  );
}
