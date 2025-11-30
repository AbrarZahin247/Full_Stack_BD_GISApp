import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [hoverIndex, setHoverIndex] = useState(null);

  // --- Styles ---
  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1a202c', // Dark theme to match Home
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderBottom: '1px solid #2d3748',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: '800',
      textDecoration: 'none',
      color: '#63b3ed', // Light Blue accent
      letterSpacing: '-0.5px',
    },
    linkContainer: {
      display: 'flex',
      gap: '30px',
    },
    link: (isActive, isHovered) => ({
      textDecoration: 'none',
      color: isActive ? '#63b3ed' : (isHovered ? '#ffffff' : '#a0aec0'),
      fontSize: '16px',
      fontWeight: '500',
      transition: 'color 0.3s ease',
      position: 'relative',
      padding: '5px 0',
    }),
    // The little line that appears under links
    activeIndicator: (isActive, isHovered) => ({
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: isActive || isHovered ? '100%' : '0%',
      height: '2px',
      backgroundColor: '#63b3ed',
      transition: 'width 0.3s ease',
    }),
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
    { name: 'Map Viewer', path: '/map' },
  ];

  return (
    <nav style={styles.nav}>
      {/* Brand / Logo */}
      <Link to="/" style={styles.logo}>
        GeoApp<span style={{color: 'white'}}>.</span>
      </Link>

      {/* Navigation Links */}
      <div style={styles.linkContainer}>
        {navLinks.map((link, index) => {
          const isActive = location.pathname === link.path;
          const isHovered = hoverIndex === index;

          return (
            <Link
              key={index}
              to={link.path}
              style={styles.link(isActive, isHovered)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {link.name}
              {/* Animated underline */}
              <span style={styles.activeIndicator(isActive, isHovered)} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;