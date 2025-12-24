import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-white text-center p-10">Yükleniyor...</div>; // Yükleme ekranı
  }

  if (!user) {
    // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
    return <Navigate to="/admin" replace />;
  }

  // AdminOnly ise ve kullanıcı admin değilse ana sayfaya yönlendir
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
