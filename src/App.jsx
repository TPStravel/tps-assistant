<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'

export default function App() {
  return (
    <BrowserRouter>
      <header className="bg-gray-800 text-white p-4 flex justify-center gap-8">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/results" className="hover:underline">Resultados</Link>
      </header>

      <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

=======

import React, { useState } from 'react';
import { askGPT } from './api/openai';
function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await askGPT(input);
    setResponse(res);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✈️ TPS - Assistente de Viagem</h1>
      <form onSubmit={handleSubmit}>
        <input 
          className="border p-2 w-full rounded mb-2" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ex: Quero um voo de SP para NY dia 15 de junho" 
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Perguntar</button>
      </form>
      <div className="mt-4 whitespace-pre-wrap bg-gray-100 p-2 rounded">{response}</div>
    </div>
  );
}
export default App;
>>>>>>> 732a5c93cacd0f3918afd5eeb9be05eea5551a35
