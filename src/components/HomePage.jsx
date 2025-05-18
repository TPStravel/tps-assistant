import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo ao <span className="text-blue-400">TPS Assistant</span></h1>
      <div className="space-y-4 text-lg">
        <Link to="/hotels" className="text-blue-300 hover:underline">🏨 Ver hotéis simulados</Link><br />
        <Link to="/flights" className="text-blue-300 hover:underline">✈️ Ver voos simulados</Link><br />
        <Link to="/cars" className="text-blue-300 hover:underline">🚗 Ver carros disponíveis</Link><br />
        <Link to="/insurance" className="text-blue-300 hover:underline">🛡️ Ver seguros de viagem</Link><br />
        <Link to="/history" className="text-blue-300 hover:underline">📜 Ver histórico de simulações</Link>
      </div>
    </div>
  );
}
