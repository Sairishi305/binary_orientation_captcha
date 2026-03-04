import { useState, useEffect } from 'react';

function App() {
  const [angle, setAngle] = useState(0);
  const [captcha, setCaptcha] = useState('');
  const [message, setMessage] = useState('');

  // Generate single-bit CAPTCHA ('0' or '1')
  const generateCaptcha = () => (Math.random() < 0.5 ? '0' : '1');

  useEffect(() => {
    setCaptcha(generateCaptcha());

    const getAngle = () => screen.orientation?.angle || window.orientation || 0;
    setAngle(getAngle());

    const handleChange = () => setAngle(getAngle());
    screen.orientation?.addEventListener('change', handleChange);
    window.addEventListener('orientationchange', handleChange);

    return () => {
      screen.orientation?.removeEventListener('change', handleChange);
      window.removeEventListener('orientationchange', handleChange);
    };
  }, []);

  const printValue = angle === 0 ? '1' : angle === 90 ? '0' : 'Other';

  const handleLogin = () => {
    if (captcha === printValue) {
      setMessage('✅ Yes, you are a Human. Login Successful!');
    } else {
      setMessage('❌ Login Failed! Refresh CAPTCHA and try again.');
      setCaptcha(generateCaptcha());
    }
  };

  // New modern CSS styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(135deg, #4a90e2, #9013fe)',
    color: '#fff',
    padding: '20px',
  };

  const cardStyle = {
    background: 'rgba(0,0,0,0.6)',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
    width: '320px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '1.8rem',
    marginBottom: '20px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  };

  const captchaStyle = {
    fontSize: '2rem',
    letterSpacing: '12px',
    padding: '15px',
    marginBottom: '15px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '12px',
    userSelect: 'none',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '10px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    background: '#0af',
    color: '#000',
    transition: 'all 0.3s ease',
  };

  const infoStyle = {
    marginTop: '15px',
    fontSize: '1.2rem',
    padding: '10px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
    fontWeight: 'bold',
  };

  const messageStyle = {
    marginTop: '20px',
    fontSize: '1.2rem',
    color: message.includes('❌') ? '#ff4d4d' : '#00ff99',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Mobile Orientation Login</h1>

        <div style={captchaStyle}>{captcha}</div>
        <button style={buttonStyle} onClick={() => setCaptcha(generateCaptcha())}>
          Refresh CAPTCHA
        </button>

        <div style={infoStyle}>Orientation Bit: {printValue}</div>

        <button style={buttonStyle} onClick={handleLogin}>
          Login
        </button> <br /> <br />
        <p>tilt your moblie to landscape for 0 </p>
        <p>tilt rerverse to 0 for 1 </p>

        {message && <div style={messageStyle}>{message}</div>}
      </div>
    </div>
  );
}

export default App;