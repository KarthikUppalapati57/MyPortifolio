
import React, { useState, useEffect } from 'react';
import { MenuIcon, CloseIcon } from './IconComponents';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      event.preventDefault();

      const targetElement = document.querySelector(href);
      if (targetElement) {
        // Close menu if it's open
        if (isMenuOpen) {
          setIsMenuOpen(false);
          // Wait for the menu closing animation (300ms) to complete before scrolling
          // to ensure body scroll is restored and avoid jank.
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        } else {
          // If menu is not open (desktop view), scroll immediately.
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (isMenuOpen) {
      // Handle non-anchor links (if any) in mobile menu
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-950/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between h-20">
            <a href="#about" onClick={handleNavClick} className="text-2xl font-bold text-gray-100 tracking-wider hover:text-red-500 transition-colors">
              <span className="text-red-500">K</span>arthik <span className="text-red-500">U</span>ppalapati
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
              <ul className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={handleNavClick} className="text-gray-300 hover:text-red-500 transition-colors font-medium">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-red-500 z-[60]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-gray-950/90 backdrop-blur-lg z-40 flex items-center justify-center transition-opacity duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav>
          <ul className="flex flex-col items-center space-y-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={handleNavClick} className="text-4xl font-bold text-gray-100 hover:text-red-500 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
