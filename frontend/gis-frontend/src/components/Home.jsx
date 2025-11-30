import { Link } from 'react-router-dom';
const Home = () => {
  // --- Styles ---
  const styles = {
    container: {
      fontFamily: "'Inter', sans-serif",
      width: '100%',
    },
    // Dark Hero Section
    heroSection: {
      backgroundColor: '#1a202c', // Dark blue-gray
      color: '#ffffff',
      padding: '80px 20px',
      display: 'flex',
      flexWrap: 'wrap', // Allows stacking on mobile
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '60vh',
    },
    heroContent: {
      flex: '1 1 400px', // Takes up space, minimum 400px width
      maxWidth: '600px',
      marginBottom: '40px',
      paddingRight: '30px',
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '20px',
    },
    heroText: {
      fontSize: '1.2rem',
      color: '#a0aec0', // Lighter gray text
      marginBottom: '30px',
    },
    heroButton: {
      display: 'inline-block',
      padding: '12px 32px',
      backgroundColor: '#3182ce', // Nice blue button
      color: 'white',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'background-color 0.2s',
    },
    heroImageContainer: {
      flex: '1 1 400px',
      display: 'flex',
      justifyContent: 'center',
    },
    heroImage: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    
    // Light Feature Section
    lightSection: {
      backgroundColor: '#f7fafc', // Very light gray background
      color: '#2d3748', // Dark gray text
      padding: '80px 20px',
      textAlign: 'center',
    },
    lightContainer: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    lightTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '20px',
    },
    lightText: {
      fontSize: '1.2rem',
      lineHeight: '1.6',
      color: '#4a5568',
      marginBottom: '30px',
    },
    secondaryButton: {
      display: 'inline-block',
      padding: '12px 32px',
      backgroundColor: 'transparent',
      border: '2px solid #3182ce',
      color: '#3182ce',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.2s',
    }
  };

  return (
    <div style={styles.container}>
      
      {/* --- Section 1: Dark Hero Theme --- */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Unlock Spatial Insights.
          </h1>
          <p style={styles.heroText}>
            Explore, visualize, and analyze geographical data with precision. 
            Our platform brings clarity to complex spatial information, starting with Bangladesh.
          </p>
          <Link 
            to="/map" 
            style={styles.heroButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5282'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3182ce'}
          >
            Get Started
          </Link>
        </div>
        
        <div style={styles.heroImageContainer}>
          {/* I've used a placeholder image from Unsplash related to maps/tech. 
            Replace the `src` below with your own image if you have one.
          */}
          



          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop" 
            alt="Abstract glowing map network" 
            style={styles.heroImage} 
          />
        </div>
      </section>


      {/* --- Section 2: Light Feature Theme --- */}
      <section style={styles.lightSection}>
        <div style={styles.lightContainer}>
          <h2 style={styles.lightTitle}>
            Bangladesh Administrative Boundaries
          </h2>
          <p style={styles.lightText}>
            Our interactive Map Viewer is loaded with precise administrative data for Bangladesh. 
            Seamlessly navigate through divisions, analyze regions, and gain a deeper 
            understanding of the administrative landscape.
          </p>
          <Link 
            to="/map" 
            style={styles.secondaryButton}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#3182ce';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#3182ce';
            }}
          >
            Go to Map Viewer
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;