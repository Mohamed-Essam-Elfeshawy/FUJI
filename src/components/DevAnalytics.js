import React from 'react';

// Development Analytics Component - Shows placeholders instead of actual tracking
const DevAnalytics = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!isDevelopment) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(20, 111, 182, 0.9)',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      maxWidth: '300px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        🔧 Development Mode
      </div>
      <div style={{ opacity: 0.9 }}>
        Analytics disabled in development
      </div>
      <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.7 }}>
        Add analytics IDs to .env for production
      </div>
    </div>
  );
};

export default DevAnalytics;
