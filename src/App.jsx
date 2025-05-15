
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
