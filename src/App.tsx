import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  
  const handleGenerate = async () => {
    // Note: In a real deployed app, use a secure backend or require user to input API key.
    // For demo purposes with this deployer, you will need to add your API Key in the repo secrets
    // or input it in the UI if the code handles it.
    if (!process.env.API_KEY) {
      setResponse("Error: API_KEY not found in environment.");
      return;
    }
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      setResponse(result.text);
    } catch (e) {
      setResponse(e.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Gemini App</h1>
      <textarea
        className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded p-4 mb-4 focus:outline-none focus:border-blue-500"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
      />
      <button
        onClick={handleGenerate}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition-colors"
      >
        Generate
      </button>
      {response && (
        <div className="mt-8 p-6 bg-gray-800 rounded max-w-2xl w-full whitespace-pre-wrap border border-gray-700">
          {response}
        </div>
      )}
    </div>
  );
}