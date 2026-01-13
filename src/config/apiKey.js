// Production API key (replace with your actual key for deployment)
// Get your key from: https://makersuite.google.com/app/apikey
const PRODUCTION_API_KEY = "AIzaSyBa1-gDGVcoN5SfephviWmAMaEhPbI99tc";

// Development API key from .env file
const DEV_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Use production key in production, development key locally, or fallback to production
const API_KEY = import.meta.env.PROD ? PRODUCTION_API_KEY : (DEV_API_KEY || PRODUCTION_API_KEY);

export default API_KEY;
