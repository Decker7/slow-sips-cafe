const DEFAULT_MODEL = 'meta-llama/Llama-3.1-8B-Instruct:fastest';
const MAX_REQUEST_BYTES = 1_000_000;

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Only POST requests are supported.' });
  }

  const token = process.env.HF_TOKEN;
  if (!token) {
    return response.status(503).json({
      error: 'HF_TOKEN is missing from the Vercel project environment variables.',
    });
  }

  let body = request.body;
  try {
    if (typeof body === 'string') body = JSON.parse(body);
  } catch {
    return response.status(400).json({ error: 'Invalid JSON request.' });
  }

  const { messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return response.status(400).json({ error: 'Send at least one chat message.' });
  }

  if (Buffer.byteLength(JSON.stringify(messages), 'utf8') > MAX_REQUEST_BYTES) {
    return response.status(413).json({ error: 'The conversation is too large. Please start a new chat.' });
  }

  const validRoles = new Set(['system', 'user', 'assistant']);
  if (messages.some((message) => (
    !message ||
    !validRoles.has(message.role) ||
    typeof message.content !== 'string'
  ))) {
    return response.status(400).json({ error: 'Chat messages must have a supported role and text content.' });
  }

  try {
    const upstream = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.HF_MODEL || DEFAULT_MODEL,
        messages,
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const contentType = upstream.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const result = await upstream.json();
      return response.status(upstream.status).json(result);
    }

    const text = await upstream.text();
    return response.status(upstream.status).json({
      error: text || `Hugging Face returned HTTP ${upstream.status}.`,
    });
  } catch {
    return response.status(502).json({ error: 'Could not connect to Hugging Face. Please try again.' });
  }
}
