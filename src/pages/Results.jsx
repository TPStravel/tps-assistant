import { useEffect, useState } from 'react'

export default function Results() {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [usingMock, setUsingMock] = useState(false)

  useEffect(() => {
    const fetchFlights = async () => {
      const history = JSON.parse(localStorage.getItem('searchHistory')) || []
      const lastSearch = history[0]

      if (!lastSearch) {
        setError('Nenhuma busca encontrada. Volte e preencha o formulário.')
        setLoading(false)
        return
      }

      const { origin, destination, date } = lastSearch

      try {
        const tokenRes = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: import.meta.env.VITE_AMADEUS_CLIENT_ID,
            client_secret: import.meta.env.VITE_AMADEUS_CLIENT_SECRET,
          }),
        })

        const tokenData = await tokenRes.json()
        const token = tokenData.access_token
        if (!token) throw new Error('Erro ao obter token.')

        const flightRes = await fetch(
          `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&max=5`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const flightData = await flightRes.json()
        if (flightData.errors || !flightData.data || flightData.data.length === 0) {
          throw new Error('API inválida')
        }

        setFlights(flightData.data)
      } catch (err) {
        console.warn('⚠️ Usando dados mock: ', err.message)

        // Fallback com dados simulados
        const mock = [
          {
            id: 'mock1',
            itineraries: [
              {
                segments: [
                  {
                    departure: { iataCode: origin, at: `${date}T09:00:00` },
                    arrival: { iataCode: destination, at: `${date}T13:30:00` },
                  },
                ],
              },
            ],
            price: { total: '499.99' },
          },
          {
            id: 'mock2',
            itineraries: [
              {
                segments: [
                  {
                    departure: { iataCode: origin, at: `${date}T14:15:00` },
                    arrival: { iataCode: destination, at: `${date}T18:40:00` },
                  },
                ],
              },
            ],
            price: { total: '459.00' },
          },
          {
            id: 'mock3',
            itineraries: [
              {
                segments: [
                  {
                    departure: { iataCode: origin, at: `${date}T21:30:00` },
                    arrival: { iataCode: destination, at: `${date}T01:00:00` },
                  },
                ],
              },
            ],
            price: { total: '520.75' },
          },
        ]

        setUsingMock(true)
        setFlights(mock)
      }

      setLoading(false)
    }

    fetchFlights()
  }, [])

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">✈️ Resultados de Voos</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {usingMock && (
            <p className="text-yellow-500 font-medium mb-4">
              ⚠️ Dados simulados (modo teste - API offline)
            </p>
          )}
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-6 max-w-xl mx-auto">
              {flights.map((flight, index) => {
                const segments = flight.itineraries[0].segments
                const first = segments[0]
                const last = segments[segments.length - 1]
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded shadow text-left">
                    <p><strong>Saída:</strong> {first.departure.iataCode} → {last.arrival.iataCode}</p>
                    <p><strong>Partida:</strong> {first.departure.at}</p>
                    <p><strong>Chegada:</strong> {last.arrival.at}</p>
                    <p><strong>Preço:</strong> USD {flight.price.total}</p>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
