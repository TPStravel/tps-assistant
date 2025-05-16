// src/pages/Hotels.jsx
import React, { useState } from 'react';

const mockHotels = [
  {
    nome: 'Hotel Central Palace',
    preco: 'R$ 820',
    avaliacao: 4.5,
    link: 'https://viajar.com/hotel-central'
  },
  {
    nome: 'Luxury Plaza Hotel',
    preco: 'R$ 1.250',
    avaliacao: 4.8,
    link: 'https://viajar.com/luxury-plaza'
  },
  {
    nome: 'Sunset Beach Resort',
    preco: 'R$ 590',
    avaliacao: 4.3,
    link: 'https://viajar.com/sunset-beach'
  },
  {
    nome: 'Eco Green Hotel',
    preco: 'R$ 460',
    avaliacao: 4.1,
    link: 'https://viajar.com/eco-green'
  },
  {
    nome: 'Business Inn Paulista',
    preco: 'R$ 780',
    avaliacao: 4.6,
    link: 'https://viajar.com/business-inn'
  },
  {
    nome: 'Pousada das Flores',
    preco: 'R$ 350',
    avaliacao: 4.0,
    link: 'https://viajar.com/pousada-flores'
  }
];

export default function Hotels() {
  const [resultados, setResultados] = useState([]);
  const [cidade, setCidade] = useState('');
  const [entrada, setEntrada] = useState('');
  const [saida, setSaida] = useState('');

  const buscarHoteis = () => {
    setResultados(mockHotels);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔍 Buscar Hotéis</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Cidade de destino"
          className="border p-2 rounded"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={saida}
          onChange={(e) => setSaida(e.target.value)}
        />
        <button
          onClick={buscarHoteis}
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Buscar Hotéis
        </button>
      </div>

      {resultados.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {resultados.map((hotel, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{hotel.nome}</h2>
              <p className="text-sm text-gray-600">⭐ {hotel.avaliacao} · {hotel.preco}</p>
              <a
                href={hotel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                Reservar ↗
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
