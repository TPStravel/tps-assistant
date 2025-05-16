import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      navigate("/results", { state: { input } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao TPS Assistant!</h1>
      <p className="mb-6 text-lg">Digite seu pedido abaixo:</p>

      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          placeholder="Ex: Quero hotel em Paris"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
