// src/components/LoginPage.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modo, setModo] = useState("login");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  if (user) return <Navigate to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      if (modo === "login") {
        await signInWithEmailAndPassword(auth, email, senha);
      } else {
        await createUserWithEmailAndPassword(auth, email, senha);
      }
      navigate("/home");
    } catch (error) {
      setErro("❌ " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">
        {modo === "login" ? "🔐 Entrar" : "🆕 Criar Conta"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
        >
          {modo === "login" ? "Entrar" : "Registrar"}
        </button>
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
      </form>

      <button
        onClick={() => setModo(modo === "login" ? "registro" : "login")}
        className="mt-4 text-sm text-blue-400 hover:underline"
      >
        {modo === "login"
          ? "Não tem conta? Registre-se"
          : "Já tem conta? Faça login"}
      </button>
    </div>
  );
}
