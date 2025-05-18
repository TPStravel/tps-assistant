import React, { useEffect } from "react";
import { saveToHistory } from "../utils/history";

const insurances = [
  {
    provider: "TravelSecure",
    coverage: "Cobertura médica até R$ 150.000",
    price: 180,
    link: "https://www.seguroviagem.com",
  },
  {
    provider: "MundoSeguro",
    coverage: "Cobertura completa + bagagem",
    price: 220,
    link: "https://www.seguroviagem.com",
  },
  {
    provider: "Viagem Protegida",
    coverage: "Assistência médica e jurídica",
    price: 195,
    link: "https://www.seguroviagem.com",
  },
];

export default function InsuranceResults() {
  useEffect(() => {
    const now = new Date();
    saveToHistory({
      tipo: "seguro",
      data: now.toLocaleString(),
      dataHoraBusca: now.toISOString(),
      total: insurances.length,
      mensagem: `Foram simuladas ${insurances.length} opções de seguro.`,
      resultados: insurances,
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">🛡️ Seguros de Viagem Disponíveis</h1>
      <div className="space-y-4">
        {insurances.map((item, index) => (
          <div key={index} className="border border-gray-700 rounded p-4">
            <h2 className="text-xl font-semibold">{item.provider}</h2>
            <p>{item.coverage}</p>
            <p>💰 R$ {item.price}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              Ver detalhes
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
