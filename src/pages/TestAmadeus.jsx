import React, { useEffect } from 'react';

export default function TestAmadeus() {
  useEffect(() => {
    const fetchToken = async () => {
      const clientId = import.meta.env.VITE_AMADEUS_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

      const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret
        })
      });

      const data = await response.json();
      console.log('🔑 Amadeus Access Token:', data);
    };

    fetchToken();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🧪 Testando conexão com Amadeus...</h1>
      <p>Abra o console (F12) para ver o resultado.</p>
    </div>
  );
}
