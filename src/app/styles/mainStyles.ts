const centerText = 'center' as const;

export const mainStyles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: centerText, // Explicitly cast the value
      backgroundColor: '#f4f4f9',
      padding: '20px',
    },
    navBar: {
      display: 'flex',
      justifyContent: 'space-between', // Distribute items across the navigation bar
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333', // Dark background for the navbar
      color: '#fff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    navList: {
      display: 'flex',
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      display: 'inline-block',
      textAlign: centerText,
    },
    header: {
      marginTop: '30px',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#333',
    },
    intro: {
      fontSize: '18px',
      color: '#555',
      marginTop: '15px',
    },
    greeting: {
      fontSize: '22px',
      color: '#007BFF',
      marginTop: '20px',
    },
    features: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '40px',
      flexWrap: 'wrap' as const,
    },
    featureBox: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      width: '30%',
      margin: '10px 0',
      textAlign: centerText,
    },
    button: {
      backgroundColor: '#007BFF',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    icon: {
      marginRight: '8px',
      fontSize: '18px',
    },
  };