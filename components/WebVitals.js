import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// WebVitals component/hook
const WebVitals = () => {
  useEffect(() => {
    // Report web vitals
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitals;
