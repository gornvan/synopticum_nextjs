const centerText = 'center' as 'center';

export const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      textAlign: centerText, // Explicitly cast the value
      backgroundColor: '#f4f4f9',
      padding: '20px',
    },
    navBar: {
      backgroundColor: '#007BFF',
      padding: '10px 0',
    },
    navList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      margin: '0 15px',
      fontSize: '16px',
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
      flexWrap: 'wrap' as 'wrap',
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
      backgroundColor: "#007BFF",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };