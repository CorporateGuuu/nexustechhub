import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

// WebVitals component/hook
const WebVitals = () => {
  useEffect(() => {
    // Report web vitals
    onCLS(console.log);
    // onFID removed as not exported in this version
    onFCP(console.log);
    onLCP(console.log);
    onTTFB(console.log);
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitals;
