import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function huggingFaceChat() {
  let token = ''
  let model = 'meta-llama/Llama-3.1-8B-Instruct:fastest'

  return {
    name: 'slow-sips-hugging-face-chat',
    config(_, { mode }) {
      const env = loadEnv(mode, process.cwd(), '')
      token = env.HF_TOKEN
      model = env.HF_MODEL || model
    },
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Allow', 'POST')
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Only POST requests are supported.' }))
          return
        }

        if (!token) {
          res.statusCode = 503
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'HF_TOKEN is missing. Add your Hugging Face token to .env.local and restart the dev server.' }))
          return
        }

        let body = ''
        let tooLarge = false
        req.on('data', (chunk) => {
          if (body.length + chunk.length > 1_000_000) {
            tooLarge = true
            res.statusCode = 413
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'The conversation is too large. Please start a new chat.' }))
            return
          }

          if (!tooLarge) body += chunk
        })

        req.on('end', async () => {
          if (tooLarge) return

          try {
            const { messages } = JSON.parse(body)
            if (!Array.isArray(messages) || messages.length === 0) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Send at least one chat message.' }))
              return
            }

            const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model,
                messages,
                max_tokens: 150,
                temperature: 0.7,
              }),
            })

            const responseBody = await response.text()
            res.statusCode = response.status
            res.setHeader('Content-Type', 'application/json')
            res.end(responseBody)
          } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: error instanceof SyntaxError ? 'Invalid chat request.' : 'Could not connect to Hugging Face. Check your connection and try again.' }))
          }
        })

        req.on('error', (error) => next(error))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    huggingFaceChat(),
  ],
})
