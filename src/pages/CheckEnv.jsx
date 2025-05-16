import React from 'react';

export default function CheckEnv() {
  const clientId = import.meta.env.VITE_AMADEUS_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🔍 Verificação de .env.local</h1>
      <p><strong>VITE_AMADEUS_CLIENT_ID:</strong> {clientId || '❌ NÃO CARREGADO'}</p>
      <p><strong>VITE_AMADEUS_CLIENT_SECRET:</strong> {clientSecret || '❌ NÃO CARREGADO'}</p>
    </div>
  );
}
