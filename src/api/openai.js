
import axios from 'axios';

export async function askGPT(prompt) {
  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Você é um assistente de viagem. Responda com opções claras e diretas.' },
        { role: 'user', content: prompt }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        'Content-Type': 'application/json',
      }
    });
    return res.data.choices[0].message.content;
  } catch (err) {
    return "Erro ao consultar GPT: " + err.message;
  }
}
