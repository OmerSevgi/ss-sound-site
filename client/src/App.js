import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminNewEventPage from './pages/AdminNewEventPage';
import AdminEditEventPage from './pages/AdminEditEventPage';
import AdminGalleryPage from './pages/AdminGalleryPage';
import AdminContentPage from './pages/AdminContentPage';
import AdminContactMessagesPage from './pages/AdminContactMessagesPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          {showSplash ? (
            <SplashScreen onComplete={handleSplashComplete} />
          ) : (
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/etkinlikler" element={<EventsPage />} />
                  <Route path="/etkinlikler/:id" element={<EventDetailPage />} />
                  <Route path="/admin" element={<AdminLoginPage />} />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/admin/events/new" 
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminNewEventPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/admin/events/edit/:id" 
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminEditEventPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/admin/gallery" 
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminGalleryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/admin/content" 
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminContentPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/admin/messages" 
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminContactMessagesPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Layout>
            </BrowserRouter>
          )}
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
