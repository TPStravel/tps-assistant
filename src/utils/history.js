// src/utils/history.js

import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const STORAGE_KEY = "tps_history";

export function saveToHistory(data) {
  const now = new Date();

  const item = {
    ...data,
    salvoEm: now.toISOString(),
    dataHoraBusca: now.toISOString(),
  };

  // LocalStorage
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const updated = [item, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  // Firestore
  addDoc(collection(db, "historicoTPS"), {
    tipo: item.tipo || "desconhecido",
    data: serverTimestamp(),
    total: Number(item.total || 0),
    mensagem: item.mensagem || "",
    dataHoraBusca: item.dataHoraBusca,
    salvoEm: item.salvoEm,
  })
    .then(() => console.log("✅ Histórico salvo no Firestore"))
    .catch((error) => console.error("❌ Firebase erro:", error));
}

export function loadHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
