// src/pages/Insurance.jsx
import React, { useState } from 'react';

const mockPlans = [
  {
    nome: 'Plano Básico',
    preco: 'R$ 79',
    cobertura: 'Cobertura médica até R$ 30.000',
    link: 'https://viajar.com/seguro-basico'
  },
  {
    nome: 'Plano Intermediário',
    preco: 'R$ 129',
    cobertura: 'Cobertura médica até R$ 100.000 + extravio de bagagem',
    link: 'https://viajar.com/seguro-intermediario'
  },
  {
    nome: 'Plano Premium',
    preco: 'R$ 199',
    cobertura: 'Cobertura completa até R$ 500.000 + cancelamento de viagem',
    link: 'https://viajar.com/seguro-premium'
  }
];

export default function Insurance() {
  const [resultados, setResultados] = useState([]);
  const [destino, setDestino] = useState('');
  const [ida, setIda] = useState('');
  const [volta, setVolta] = useState('');
  const [idade, setIdade] = useState('');

  const buscarSeguros = () => {
    setResultados(mockPlans);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛡️ Seguro Viagem</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="País de destino"
          className="border p-2 rounded"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={ida}
          onChange={(e) => setIda(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={volta}
          onChange={(e) => setVolta(e.target.value)}
        />
        <input
          type="number"
          placeholder="Idade do viajante"
          className="border p-2 rounded"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <button
          onClick={buscarSeguros}
          className="bg-purple-600 text-white rounded p-2 hover:bg-purple-700"
        >
          Buscar Planos
        </button>
      </div>

      {resultados.length > 0 && (
        <div className="grid gap-4">
          {resultados.map((plano, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{plano.nome}</h2>
              <p className="text-sm text-gray-600">💸 {plano.preco}</p>
              <p className="text-sm mb-2">📋 {plano.cobertura}</p>
              <a
                href={plano.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-purple-600 hover:underline"
              >
                Contratar Plano ↗
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
