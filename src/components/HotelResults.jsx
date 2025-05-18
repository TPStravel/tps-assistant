// src/components/HotelResults.jsx

import React, { useEffect } from "react";
import { saveToHistory } from "../utils/history";

const hotels = [
  {
    name: "The Manhattan Stay",
    location: "Midtown, NYC",
    price: 210,
    rating: 8.5,
    link: "https://www.booking.com",
  },
  {
    name: "Central Park Lodge",
    location: "Upper West Side, NYC",
    price: 185,
    rating: 9.1,
    link: "https://www.booking.com",
  },
  {
    name: "Times Square Inn",
    location: "Times Square, NYC",
    price: 230,
    rating: 8.0,
    link: "https://www.booking.com",
  },
  {
    name: "SoHo Boutique Hotel",
    location: "SoHo, NYC",
    price: 195,
    rating: 8.9,
    link: "https://www.booking.com",
  },
  {
    name: "Harlem Comfort Suites",
    location: "Harlem, NYC",
    price: 165,
    rating: 7.8,
    link: "https://www.booking.com",
  },
];

export default function HotelResults() {
  useEffect(() => {
    const nowISO = new Date().toISOString();

    saveToHistory({
      tipo: "hotel",
      data: new Date().toLocaleString(), // Para exibição no card
      total: hotels.length,
      mensagem: `Foram simulados ${hotels.length} hotéis.`,
      dataHoraBusca: nowISO, // Para o campo “Data/Hora da simulação”
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Resultados de Hotéis</h1>
      <div className="space-y-4">
        {hotels.map((hotel, index) => (
          <div key={index} className="border p-4">
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p>{hotel.location}</p>
            <p>💰 ${hotel.price}/night</p>
            <p>⭐ {hotel.rating}</p>
            <a
              href={hotel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              Ver no Booking
            </a>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <a href="/" className="text-blue-400 underline">
          ← Voltar ao início
        </a>
      </div>
    </div>
  );
}
