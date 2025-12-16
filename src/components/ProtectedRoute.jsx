import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  return isAuthenticated === 'true' ? children : <Navigate to="/login" replace />;
}

