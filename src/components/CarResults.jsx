import React, { useEffect } from "react";
import { saveToHistory } from "../utils/history";

const cars = [
  {
    model: "Fiat Mobi",
    price: 95,
    location: "Recife Airport",
    rating: 8.3,
    link: "https://www.localiza.com",
  },
  {
    model: "Chevrolet Onix",
    price: 110,
    location: "Boa Viagem",
    rating: 8.9,
    link: "https://www.localiza.com",
  },
  {
    model: "Hyundai HB20",
    price: 105,
    location: "Recife Center",
    rating: 8.5,
    link: "https://www.localiza.com",
  },
];

export default function CarResults() {
  useEffect(() => {
    const now = new Date();
    saveToHistory({
      tipo: "carro",
      data: now.toLocaleString(), // para exibição
      dataHoraBusca: now.toISOString(), // para controle
      total: cars.length,
      mensagem: `Foram simulados ${cars.length} carros em Recife.`,
      resultados: cars,
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">🚗 Carros Disponíveis em Recife</h1>
      <div className="space-y-4">
        {cars.map((car, index) => (
          <div key={index} className="border border-gray-700 rounded p-4">
            <h2 className="text-xl font-semibold">{car.model}</h2>
            <p>📍 {car.location}</p>
            <p>💰 R$ {car.price}/dia</p>
            <p>⭐ {car.rating}</p>
            <a
              href={car.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              Ver na Localiza
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
