import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({
    heroTitle: '',
    heroSubtitle: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get('/content');
        if (response.data) {
          setContent(response.data);
        }
      } catch (error) {
        console.error("Site içeriği yüklenemedi:", error);
        // Fallback to default values if fetch fails
        setContent({
          heroTitle: 'Hayallerinizdeki Etkinlikler',
          heroSubtitle: 'Düğün, konser, festival ve tüm özel anlarınızda profesyonel dokunuşlar.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  return useContext(ContentContext);
};
