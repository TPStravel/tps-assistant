import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 px-4 py-2 text-sm bg-gray-800 text-white rounded shadow hover:bg-gray-700 dark:bg-yellow-300 dark:text-black"
    >
      {dark ? "☀️ Claro" : "🌙 Escuro"}
    </button>
  );
}
