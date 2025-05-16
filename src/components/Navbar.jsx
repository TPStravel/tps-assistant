// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-4 py-2 shadow">
      <ul className="flex gap-6 justify-center">
        <li>
          <Link to="/hotels" className="hover:underline">
            🏨 Hotéis
          </Link>
        </li>
        <li>
          <Link to="/cars" className="hover:underline">
            🚗 Aluguel de Carros
          </Link>
        </li>
        <li>
          <Link to="/insurance" className="hover:underline">
            🛡️ Seguro Viagem
          </Link>
        </li>
      </ul>
    </nav>
  );
}
