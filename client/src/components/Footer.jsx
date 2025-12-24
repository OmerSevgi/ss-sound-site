import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const Footer = () => {
  const { content, loading } = useContent();
  const currentYear = new Date().getFullYear();

  // Ensure content is loaded before rendering social links
  if (loading) {
    return (
      <footer className="bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark p-6 mt-12 transition-colors duration-300">
        <div className="container mx-auto flex flex-col items-center">
          <p className="text-sm text-gray-500">Yükleniyor...</p>
        </div>
      </footer>
    );
  }

  const getFullUrl = (url) => {
    if (!url || url === '#') return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const socialLinks = [
    { icon: <FaFacebook />, href: getFullUrl(content.facebookUrl) },
    { icon: <FaInstagram />, href: getFullUrl(content.instagramUrl) },
  ];

  return (
    <footer className="bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark p-6 mt-12 transition-colors duration-300">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>
        {content.phoneNumber && (
          <p className="text-sm text-gray-500 mb-2">
            Telefon: <a href={`tel:${content.phoneNumber}`} className="hover:underline">{content.phoneNumber}</a>
          </p>
        )}
        <p className="text-sm text-gray-500">&copy; {currentYear} S&S SOUND. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
