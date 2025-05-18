// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="text-white p-8">Carregando...</p>;

  return user ? children : <Navigate to="/" />;
}
