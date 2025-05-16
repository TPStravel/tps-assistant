import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const navigate = useNavigate()
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')

  const handleSearch = () => {
    if (!origin || !destination || !date) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    const search = { origin, destination, date }

    const existing = JSON.parse(localStorage.getItem('searchHistory')) || []
    const updated = [search, ...existing].slice(0, 5)
    localStorage.setItem('searchHistory', JSON.stringify(updated))

    navigate('/results')
  }

  return (
    <div className="p-10 text-center space-y-6">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        🧳 Planeje sua viagem
      </motion.h1>

      <div className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Origem (ex: GRU)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="text"
          placeholder="Destino (ex: JFK)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow w-full"
        >
          Buscar ✈️
        </button>
      </div>
    </div>
  )
}
