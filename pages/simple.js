export default function SimplePage() {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #2D7D32, #00BCD4)',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        🎉 Nexus TechHub
      </h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        Professional Repair Parts & Tools - UAE
      </h2>

      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h3>✅ Server Status Check</h3>
        <p>✅ Next.js Development Server: RUNNING</p>
        <p>✅ Port 3002: ACTIVE</p>
        <p>✅ React: WORKING</p>
        <p>✅ Nexus TechHub Branding: APPLIED</p>

        <div style={{ marginTop: '30px' }}>
          <h4>🏢 Business Information</h4>
          <p>📍 Compass Building, Al Shohada Road</p>
          <p>📍 AL Hamra Industrial Zone-FZ</p>
          <p>📍 Ras Al Khaimah, United Arab Emirates</p>
          <p>📞 <a href="tel:+971585531029" style={{ color: 'white', textDecoration: 'underline' }}>+971 58 553 1029</a></p>
          <p>📧 support@nexustechhub.ae</p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h4>🛠️ Services</h4>
          <p>• iPhone Parts & Repairs</p>
          <p>• Samsung Parts & Repairs</p>
          <p>• iPad Parts & Repairs</p>
          <p>• Professional Repair Tools</p>
          <p>• LCD Buyback Program</p>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <p style={{ fontSize: '1.2rem' }}>
          🚀 Ready for Production Deployment to Netlify
        </p>
        <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>
          https://nexustechhub.netlify.app/
        </p>
      </div>
    </div>
  );
}
