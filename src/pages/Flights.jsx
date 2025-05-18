// src/pages/Flights.jsx
import React, { useEffect, useState } from 'react';
import { saveToHistory } from '../utils/history';

export default function Flights() {
  const [voos, setVoos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarTokenEVoos = async () => {
      try {
        const clientId = import.meta.env.VITE_AMADEUS_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

        // 1. Obter o token
        const tokenResp = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
          })
        });

        const tokenData = await tokenResp.json();
        if (!tokenData.access_token) throw new Error('Token inválido');

        // 2. Buscar voos reais
        const vooResp = await fetch(
          'https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=GRU&destinationLocationCode=JFK&departureDate=2025-06-15&adults=1&max=5',
          {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            }
          }
        );

        const vooData = await vooResp.json();
        if (vooData?.data) {
          setVoos(vooData.data);

          // Salvar no histórico local
          saveToHistory({
            tipo: 'Voo',
            origem: 'GRU',
            destino: 'JFK',
            data: '2025-06-15',
            resultados: vooData.data,
            dataHoraBusca: new Date().toISOString()
          });
        } else {
          throw new Error('Erro ao buscar voos');
        }
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarTokenEVoos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">✈️ Voos GRU → JFK (15/06/2025)</h1>

      {carregando && <p>🔄 Carregando...</p>}
      {erro && <p className="text-red-400">❌ {erro}</p>}

      <div className="space-y-4">
        {voos.map((voo, index) => {
          const itinerario = voo.itineraries[0];
          const preco = voo.price.total;
          const partida = itinerario.segments[0].departure.at;
          const chegada = itinerario.segments[itinerario.segments.length - 1].arrival.at;
          const cia = itinerario.segments[0].carrierCode;

          return (
            <div key={index} className="border border-gray-700 rounded-xl p-4 shadow hover:shadow-lg">
              <p><strong>Companhia:</strong> {cia}</p>
              <p><strong>Partida:</strong> {partida}</p>
              <p><strong>Chegada:</strong> {chegada}</p>
              <p><strong>Preço total:</strong> US$ {preco}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
