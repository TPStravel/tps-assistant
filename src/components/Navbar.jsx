// src/components/NavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => navigate("/login"));
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/home" className="hover:underline">🏠 Início</Link>
        <Link to="/results" className="hover:underline">🔍 Resultados</Link>
        <Link to="/history" className="hover:underline">📜 Histórico</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
        Sair
      </button>
    </nav>
  );
}
