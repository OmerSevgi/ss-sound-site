import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  return (
    <header className="bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark p-4 shadow-lg transition-colors duration-300">
      <nav className="container mx-auto flex justify-between items-center group">
        <Link to="/" className="text-2xl font-bold text-gradient-animated transition-transform duration-300 group-hover:scale-105">S&S SOUND</Link>
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">Ana Sayfa</Link></li>
            <li><Link to="/etkinlikler" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">Etkinlikler</Link></li>
            {/* Ileride eklenecek diger linkler */}
          </ul>
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
