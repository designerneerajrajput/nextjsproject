'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // ✅ For active menu

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Thinking', href: '#thinking' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="custom-navbar">
        <div className="container">
          <div className="nav-content">
            {/* Logo */}
            <Link href="/" className="navbar-brand">
              <span className="logo-text">PLUMBING</span>
            </Link>

            {/* Desktop Menu */}
            <div className="nav-menu desktop-menu" >
              <div className= {`navwrap ${scrolled ? 'scrolled' : ''}`}>
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`nav-link ${activeIndex === index ? 'active' : ''}`} // ✅ Add active class
                    onClick={() => setActiveIndex(index)} // ✅ Update active menu
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`mobile-nav-link ${activeIndex === index ? 'active' : ''}`}
              onClick={() => {
                setActiveIndex(index);
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
