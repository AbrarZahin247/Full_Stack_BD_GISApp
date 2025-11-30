import React from 'react';

const Contact = () => {
  const styles = {
    container: { fontFamily: "'Inter', sans-serif", width: '100%', backgroundColor: '#f7fafc', minHeight: '100vh' },
    
    // Header
    header: {
      backgroundColor: '#1a202c',
      color: 'white',
      padding: '50px 20px',
      textAlign: 'center',
    },
    headerTitle: { fontSize: '2.5rem', fontWeight: '800' },

    // Split Layout
    contentWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: '1000px',
      margin: '-30px auto 50px', // Pulls it up into the header slightly
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    
    // Left Side (Info)
    infoSide: {
      flex: '1 1 300px',
      backgroundColor: '#2c5282', // Darker Blue
      color: 'white',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    infoTitle: { fontSize: '1.5rem', marginBottom: '20px' },
    infoItem: { marginBottom: '15px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' },

    // Right Side (Form)
    formSide: {
      flex: '2 1 400px',
      padding: '40px',
    },
    label: { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      fontSize: '1rem',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      fontSize: '1rem',
      minHeight: '120px',
    },
    button: {
      backgroundColor: '#3182ce',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Get In Touch</h1>
        <p style={{color: '#a0aec0'}}>We'd love to hear about your project.</p>
      </div>

      <div style={styles.contentWrapper}>
        
        {/* Left Side: Contact Info */}
        <div style={styles.infoSide}>
          <h2 style={styles.infoTitle}>Contact Information</h2>
          <div style={styles.infoItem}>
            <span>📍</span> 123 GIS Avenue, Dhaka
          </div>
          <div style={styles.infoItem}>
            <span>📧</span> contact@geoapp.com
          </div>
          <div style={styles.infoItem}>
            <span>📞</span> +880 1712 345 678
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={styles.formSide}>
          <form onSubmit={(e) => e.preventDefault()}>
            <label style={styles.label}>Full Name</label>
            <input type="text" placeholder="John Doe" style={styles.input} />

            <label style={styles.label}>Email Address</label>
            <input type="email" placeholder="john@example.com" style={styles.input} />

            <label style={styles.label}>Message</label>
            <textarea placeholder="Tell us about your mapping needs..." style={styles.textarea}></textarea>

            <button type="submit" style={styles.button}>Send Message</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;