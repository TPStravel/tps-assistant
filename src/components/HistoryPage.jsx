import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import { loadHistory, clearHistory } from "../utils/history";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [filterType, setFilterType] = useState("Todos");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [authorized, setAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const PASSWORD = "1234";

  useEffect(() => {
    async function fetchHistory() {
      const local = loadHistory() || [];
      const firebaseSnap = await getDocs(collection(db, "historicoTPS"));
      const firebaseData = firebaseSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const merged = [...local, ...firebaseData];
      const unique = Array.from(
        new Map(merged.map((item) => [`${item.mensagem}-${item.salvoEm}`, item])).values()
      );
      setHistory(unique);
    }

    fetchHistory();
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  const handleFilterChange = (e) => setFilterType(e.target.value);
  const handleSearchChange = (e) => setSearchKeyword(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(filteredHistory, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historico_tps.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableData = filteredHistory.map((item) => [
      item.tipo || "-",
      item.total || "-",
      item.mensagem?.slice(0, 40) || "-",
      new Date(item.salvoEm || item.data?.seconds * 1000).toLocaleString(),
    ]);

    doc.text("Histórico TPS", 14, 15);
    doc.autoTable({
      startY: 20,
      head: [["Tipo", "Total", "Mensagem", "Data"]],
      body: tableData,
    });

    doc.save("historico_tps.pdf");
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(
      filteredHistory.map((item) => ({
        tipo: item.tipo,
        total: item.total,
        mensagem: item.mensagem,
        data: new Date(item.salvoEm || item.data?.seconds * 1000).toLocaleString(),
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historico_tps.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredHistory = history
    .filter((item) => {
      const tipoOK =
        filterType === "Todos" || item.tipo?.toLowerCase() === filterType.toLowerCase();
      const keywordOK = JSON.stringify(item).toLowerCase().includes(searchKeyword.toLowerCase());
      return tipoOK && keywordOK;
    })
    .sort((a, b) => {
      const dateA = new Date(a.salvoEm || a.data?.seconds * 1000);
      const dateB = new Date(b.salvoEm || b.data?.seconds * 1000);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleLogin = () => {
    if (passwordInput === PASSWORD) setAuthorized(true);
    else alert("Senha incorreta.");
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded shadow-md w-80">
          <h2 className="text-xl font-bold mb-4">🔐 Acesso Restrito</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full px-3 py-2 rounded text-black mb-4"
            placeholder="Digite a senha..."
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">📜 Histórico de Simulações</h1>
        <button
          onClick={handleClear}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Limpar Histórico Local
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6 space-y-4 md:space-y-0">
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="text-black px-3 py-1 rounded"
        >
          <option>Todos</option>
          <option>Hotel</option>
          <option>Voo</option>
          <option>Carro</option>
          <option>Seguro</option>
        </select>

        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Buscar por palavra-chave"
          className="text-black px-3 py-1 rounded"
        />

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="text-black px-3 py-1 rounded"
        >
          <option value="desc">Mais recente</option>
          <option value="asc">Mais antigo</option>
        </select>

        <button
          onClick={handleExportJSON}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Exportar JSON
        </button>

        <button
          onClick={handleExportPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Gerar PDF
        </button>

        <button
          onClick={handleExportCSV}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Exportar CSV
        </button>
      </div>

      {filteredHistory.length === 0 ? (
        <p className="text-gray-400">Nenhum histórico encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {filteredHistory.map((item, index) => (
            <li key={index} className="border-b border-gray-700 pb-2">
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(item, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
