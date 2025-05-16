// src/pages/Cars.jsx
import React, { useState } from 'react';

const mockCars = [
  {
    modelo: 'Fiat Argo 1.0',
    preco: 'R$ 110/dia',
    tipo: 'Econômico',
    link: 'https://viajar.com/aluguel-argo'
  },
  {
    modelo: 'Chevrolet Onix Plus',
    preco: 'R$ 130/dia',
    tipo: 'Sedan',
    link: 'https://viajar.com/aluguel-onix'
  },
  {
    modelo: 'Renault Duster',
    preco: 'R$ 180/dia',
    tipo: 'SUV',
    link: 'https://viajar.com/aluguel-duster'
  },
  {
    modelo: 'Volkswagen T-Cross',
    preco: 'R$ 210/dia',
    tipo: 'SUV',
    link: 'https://viajar.com/aluguel-tcross'
  },
  {
    modelo: 'Toyota Corolla',
    preco: 'R$ 240/dia',
    tipo: 'Executivo',
    link: 'https://viajar.com/aluguel-corolla'
  },
  {
    modelo: 'Hyundai HB20',
    preco: 'R$ 120/dia',
    tipo: 'Compacto',
    link: 'https://viajar.com/aluguel-hb20'
  }
];

export default function Cars() {
  const [resultados, setResultados] = useState([]);
  const [cidade, setCidade] = useState('');
  const [retirada, setRetirada] = useState('');
  const [devolucao, setDevolucao] = useState('');

  const buscarCarros = () => {
    setResultados(mockCars);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🚗 Aluguel de Carros</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Cidade de retirada"
          className="border p-2 rounded"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={retirada}
          onChange={(e) => setRetirada(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={devolucao}
          onChange={(e) => setDevolucao(e.target.value)}
        />
        <button
          onClick={buscarCarros}
          className="bg-green-600 text-white rounded p-2 hover:bg-green-700"
        >
          Buscar Carros
        </button>
      </div>

      {resultados.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {resultados.map((carro, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{carro.modelo}</h2>
              <p className="text-sm text-gray-600">🚘 {carro.tipo} · {carro.preco}</p>
              <a
                href={carro.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-green-600 hover:underline"
              >
                Alugar ↗
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
