import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ResultsPage from "./components/ResultsPage";
import HistoryPage from "./components/HistoryPage";
import HotelResults from "./components/HotelResults";
import FlightResults from "./components/FlightResults";
import CarResults from "./components/CarResults";
import InsuranceResults from "./components/InsuranceResults";
import NavBar from "./components/NavBar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-white p-8">Carregando...</div>;

  return (
    <Router>
      {user && <NavBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/results" element={user ? <ResultsPage /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/login" />} />
        <Route path="/hotels" element={user ? <HotelResults /> : <Navigate to="/login" />} />
        <Route path="/flights" element={user ? <FlightResults /> : <Navigate to="/login" />} />
        <Route path="/cars" element={user ? <CarResults /> : <Navigate to="/login" />} />
        <Route path="/insurance" element={user ? <InsuranceResults /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}
