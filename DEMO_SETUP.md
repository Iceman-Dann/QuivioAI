# Nexora Hackathon 2026 - Demo Setup

## 🚀 Quick Setup for Judges

### 1. Create a Restricted Gemini API Key
For demo purposes, create a restricted API key at https://makersuite.google.com/app/apikey:

**Restrictions to set:**
- **APIs enabled**: Only "Generative Language API"
- **Application restrictions**: 
  - HTTP referrers: Add your GitHub Pages URL
  - Example: `*.github.io/*`, `yourusername.github.io/NexoraHackathon/*`
- **Usage restrictions**: Set daily quota limits (optional but recommended)

### 2. Add API Key to GitHub Secrets
1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `GEMINI_API_KEY`
4. Value: Your restricted Gemini API key

### 3. Enable GitHub Pages
1. Go to repository → Settings → Pages
2. Source: "GitHub Actions"
3. Save settings

### 4. Deploy
Push to main branch or enable automatic deployment. The workflow will:
- Build both projects with the secure API key
- Deploy to GitHub Pages
- Provide demo URLs

## 🔗 Demo URLs (after deployment)
- **QuizGen AI**: `https://yourusername.github.io/NexoraHackathon/QuizGen_AI/`
- **Quivio AI**: `https://yourusername.github.io/NexoraHackathon/QuivioAI-Fresh/`

## 🛡️ Security Features
- API keys are injected during build time only
- No keys are exposed in source code
- Restricted API keys with referrer checking
- Automatic deployment via GitHub Actions

## 📱 Demo Features
Both demos include:
- AI-powered quiz generation
- Document upload support
- Multiple question formats
- Real-time AI responses
- Responsive design

## ⚠️ Important Notes
- The API key is **only** available during build time
- Generated bundles contain the key but are protected by referrer restrictions
- Monitor API usage in Google Cloud Console
- Rotate keys periodically for security
