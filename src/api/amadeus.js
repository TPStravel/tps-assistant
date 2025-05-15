import axios from 'axios';

const clientId = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const clientSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

let token = '';

async function getToken() {
  if (token) return token;
  const res = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  }));
  token = res.data.access_token;
  return token;
}

export async function searchFlights(origin, destination, date) {
  const accessToken = await getToken();
  const res = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: 1,
      max: 5,
    },
  });
  return res.data.data;
}
