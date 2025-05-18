import React from 'react';
import { Link } from 'react-router-dom';

export default function FlightResults() {
  const flights = [
    { airline: "LATAM Airlines", route: "GRU → JFK", date: "10/06/2025", price: "R$ 2.950", rating: 4.6, url: "#" },
    { airline: "American Airlines", route: "GRU → JFK", date: "10/06/2025", price: "R$ 3.120", rating: 4.4, url: "#" },
    { airline: "Delta", route: "GRU → JFK", date: "10/06/2025", price: "R$ 3.080", rating: 4.5, url: "#" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Sugestões de Voos</h1>
      {flights.map((flight, index) => (
        <div key={index} className="mb-6 border p-4">
          <h2 className="text-xl font-semibold">{flight.airline}</h2>
          <p>{flight.route} ({flight.date})</p>
          <p>{flight.price}</p>
          <p>Nota: {flight.rating}</p>
          <a href={flight.url} className="text-blue-400 underline">Ver no site</a>
        </div>
      ))}
      <Link to="/" className="text-blue-400 underline mt-4 block">⬅ Voltar ao início</Link>
    </div>
  );
}
