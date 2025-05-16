import React from 'react';

const mockFlights = [
  {
    id: 1,
    departure: '2025-06-15T09:00:00',
    arrival: '2025-06-15T13:30:00',
    origin: 'GRU',
    destination: 'JFK',
    price: 499.99,
  },
  {
    id: 2,
    departure: '2025-06-15T14:15:00',
    arrival: '2025-06-15T18:40:00',
    origin: 'GRU',
    destination: 'JFK',
    price: 459.0,
  },
  {
    id: 3,
    departure: '2025-06-15T21:30:00',
    arrival: '2025-06-16T01:00:00',
    origin: 'GRU',
    destination: 'JFK',
    price: 520.75,
  },
];

export default function Results() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          ✈️ Resultados de Voos
        </h1>
        <p className="text-yellow-500 text-sm mb-6">
          ⚠️ Dados simulados (modo teste - API offline)
        </p>

        <div className="space-y-4">
          {mockFlights.map((flight) => (
            <div
              key={flight.id}
              className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl shadow-md border dark:border-gray-700"
            >
              <p className="font-semibold text-lg mb-1">
                {flight.origin} → {flight.destination}
              </p>
              <p className="text-sm">
                <span className="font-medium">Partida:</span>{' '}
                {flight.departure.replace('T', ' ')}
              </p>
              <p className="text-sm">
                <span className="font-medium">Chegada:</span>{' '}
                {flight.arrival.replace('T', ' ')}
              </p>
              <p className="text-sm mt-1">
                <span className="font-medium">Preço:</span> USD {flight.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
