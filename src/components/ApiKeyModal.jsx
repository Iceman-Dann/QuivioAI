import { useState } from 'react';
import { Key, AlertCircle } from 'lucide-react';
import { setDemoApiKey } from '../config/apiKey.js';

export default function ApiKeyModal({ onClose, onKeySet }) {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }
    
    if (!apiKey.startsWith('AIza')) {
      setError('Invalid API key format. Keys should start with "AIza"');
      return;
    }
    
    // Set the API key
    setDemoApiKey(apiKey.trim());
    onKeySet();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">API Key Required</h2>
        </div>
        
        <p className="text-gray-600 mb-4">
          To use QuivioAI, you need a Google Gemini API key. Get your free key from:
        </p>
        
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4">
          <p className="text-sm text-blue-700">
            <strong>Demo Key Available:</strong> Use the provided key for testing
          </p>
        </div>
        
        <a 
          href="https://makersuite.google.com/app/apikey" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-50 text-blue-600 p-3 rounded-lg mb-4 hover:bg-blue-100 transition-colors"
        >
          🚀 Get Free API Key from Google AI Studio
        </a>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setError('');
              }}
              placeholder="AIzaSyALx-VO0rfah_NVEv0t-lsxnu7B61nJ6Bw"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Set API Key
            </button>
          </div>
        </form>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          Your API key is stored locally and never sent to our servers
        </p>
      </div>
    </div>
  );
}
