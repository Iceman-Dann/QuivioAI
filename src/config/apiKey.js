// API key configuration
// Get your key from: https://makersuite.google.com/app/apikey

// Check if we're in production (GitHub Pages)
const isProduction = import.meta.env.PROD || window.location.hostname.includes('github.io');

// For demo: Store API key in sessionStorage for the session
let DEMO_API_KEY = null;

// Export function to get API key with demo fallback
export function getApiKey() {
  // Use environment variable if available
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  
  // For demo: Check sessionStorage
  if (isProduction) {
    if (!DEMO_API_KEY) {
      DEMO_API_KEY = sessionStorage.getItem('quivio_demo_api_key');
    }
    return DEMO_API_KEY;
  }
  
  return null;
}

// Function to set demo API key
export function setDemoApiKey(key) {
  DEMO_API_KEY = key;
  if (isProduction) {
    sessionStorage.setItem('quivio_demo_api_key', key);
  }
}

export default import.meta.env.VITE_GEMINI_API_KEY || null;
