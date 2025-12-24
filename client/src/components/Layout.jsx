import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
