function Button() {
  return(
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <button style={{
        backgroundColor: '#4CAF50', /* Green */
        border: 'none',
        color: 'white',
        padding: '20px 40px', // Increased padding to make the button bigger
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '20px', // Increased font size to make the button bigger
        margin: '4px 2px',
        cursor: 'pointer'
      }}>
            Congrat
        </button>
    </div>
 );
}

export default Button;