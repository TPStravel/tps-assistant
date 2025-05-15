import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'

export default function App() {
  return (
    <BrowserRouter>
      <header className="bg-gray-800 text-white p-4 flex justify-center gap-8">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/results" className="hover:underline">Resultados</Link>
      </header>

      <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

