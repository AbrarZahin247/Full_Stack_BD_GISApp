import React, { useState } from 'react';

const Team = () => {
  // --- Data ---
  const teamMembers = [
    { 
      id: 1, 
      name: "Sarah Jenkins", 
      role: "Lead GIS Analyst", 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      bio: "Expert in spatial data modeling and Python automation." 
    },
    { 
      id: 2, 
      name: "David Ross", 
      role: "Full Stack Developer", 
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
      bio: "Specializes in React frontends and .NET backend architectures." 
    },
    { 
      id: 3, 
      name: "Amara Khan", 
      role: "Data Scientist", 
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      bio: "Focuses on predictive modeling and climate data analysis." 
    },
    // Add more members if needed
  ];

  // --- Styles ---
  const styles = {
    container: { fontFamily: "'Inter', sans-serif", width: '100%' },
    hero: {
      backgroundColor: '#1a202c',
      color: 'white',
      padding: '60px 20px',
      textAlign: 'center',
    },
    heroTitle: { fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' },
    heroText: { color: '#a0aec0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' },
    
    // Grid Section
    gridSection: {
      backgroundColor: '#f7fafc',
      padding: '60px 20px',
      minHeight: '60vh',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive magic
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    image: { width: '100%', height: '250px', objectFit: 'cover' },
    info: { padding: '20px' },
    name: { fontSize: '1.25rem', fontWeight: '700', color: '#2d3748', marginBottom: '5px' },
    role: { color: '#3182ce', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '15px' },
    bio: { color: '#718096', fontSize: '0.95rem', lineHeight: '1.5' },
  };

  return (
    <div style={styles.container}>
      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Meet Our Experts</h1>
        <p style={styles.heroText}>
          A dedicated team of engineers, analysts, and designers working together to visualize the world's data.
        </p>
      </section>

      {/* Team Grid */}
      <section style={styles.gridSection}>
        <div style={styles.gridContainer}>
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img src={member.image} alt={member.name} style={styles.image} />
              <div style={styles.info}>
                <h3 style={styles.name}>{member.name}</h3>
                <div style={styles.role}>{member.role}</div>
                <p style={styles.bio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;