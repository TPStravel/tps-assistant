import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Componente de animação "Respondendo..."
function TypingAnimation() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return <p className="italic text-gray-500 dark:text-gray-300">🔄 Respondendo{dots}</p>;
}

// Cards simulados
function CardHotel({ name, location, price }) {
  return (
    <div className="bg-white dark:bg-gray-800 border rounded shadow p-4">
      <h3 className="font-bold text-lg mb-1">{name}</h3>
      <p className="text-sm">{location}</p>
      <p className="mt-2 text-blue-600 dark:text-blue-400 font-semibold">{price}</p>
    </div>
  );
}

function CardCar({ model, type, price }) {
  return (
    <div className="bg-white dark:bg-gray-800 border rounded shadow p-4">
      <h3 className="font-bold text-lg mb-1">{model}</h3>
      <p className="text-sm">{type}</p>
      <p className="mt-2 text-green-600 dark:text-green-400 font-semibold">{price}</p>
    </div>
  );
}

export default function Results() {
  const location = useLocation();
  const userInput = location.state?.input || "";
  const [loading, setLoading] = useState(false);

  const [showHotels, setShowHotels] = useState(false);
  const [showCars, setShowCars] = useState(false);

  useEffect(() => {
    if (userInput) {
      setLoading(true);

      setTimeout(() => {
        if (userInput.toLowerCase().includes("hotel")) {
          setShowHotels(true);
        } else if (userInput.toLowerCase().includes("carro") || userInput.toLowerCase().includes("alugar")) {
          setShowCars(true);
        }

        setLoading(false);
      }, 1500);
    }
  }, [userInput]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Resultado do TPS</h1>

      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow p-6 rounded text-left mb-8">
        {loading ? (
          <TypingAnimation />
        ) : showHotels ? (
          <div className="grid gap-4">
            <CardHotel name="Hotel TPS Lux" location="Paris, França" price="R$ 820 / noite" />
            <CardHotel name="Hotel TPS Business" location="Paris, França" price="R$ 510 / noite" />
            <CardHotel name="Hotel TPS Econômico" location="Paris, França" price="R$ 330 / noite" />
          </div>
        ) : showCars ? (
          <div className="grid gap-4">
            <CardCar model="Sedan Compacto TPS" type="Automático • 4 portas" price="R$ 120 / dia" />
            <CardCar model="SUV Familiar TPS" type="SUV • 7 lugares" price="R$ 230 / dia" />
            <CardCar model="Econômico TPS" type="Manual • 2 portas" price="R$ 90 / dia" />
          </div>
        ) : (
          <p>✅ Sua solicitação foi processada. Nenhuma simulação foi aplicada.</p>
        )}
      </div>
    </div>
  );
}
