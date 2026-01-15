// API key configuration
// Get your key from: https://makersuite.google.com/app/apikey
// For production deployment, we embed the key for demo purposes

// Check if we're in production (GitHub Pages)
const isProduction = import.meta.env.PROD || window.location.hostname.includes('github.io');

// Production API key for demo (limited usage)
const PRODUCTION_API_KEY = "AIzaSyBIDSVMa90nKeHrrpuCJmZ3yp2G_aoF9js";

// Use production key in production, environment key in development
const API_KEY = isProduction ? PRODUCTION_API_KEY : import.meta.env.VITE_GEMINI_API_KEY;

export default API_KEY;
