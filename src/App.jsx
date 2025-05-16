<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Results from './Results';

function App() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </>
  );
}


export default App;
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Results from './pages/Results';
import Hotels from './pages/Hotels';
import Cars from './pages/Cars';
import Insurance from './pages/Insurance';
import TestAmadeus from './pages/TestAmadeus';
import Flights from './pages/Flights';
import CheckEnv from './pages/CheckEnv';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Results />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/test-amadeus" element={<TestAmadeus />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/check-env" element={<CheckEnv />} />
          <Route path="*" element={<h1 className="text-center text-xl">Página não encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}
>>>>>>> recuperar-ajustes
