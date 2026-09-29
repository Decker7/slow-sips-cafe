# Slow Sips Cafe

A React and Vite website for Slow Sips Cafe, with a Hugging Face powered chat assistant.

## Run locally

1. Create a Hugging Face access token with permission to make calls to Inference Providers. In your Hugging Face account, make sure at least one Inference Provider is enabled and available to your account.
2. Copy `.env.example` to `.env.local` and set `HF_TOKEN` to your token. Keep the token in `HF_TOKEN`; do not rename it to a `VITE_` variable, because Vite exposes `VITE_` variables to browser code.
3. Install dependencies with `npm install`.
4. Start the site with `npm run dev`.

The assistant uses `meta-llama/Llama-3.1-8B-Instruct:fastest` by default. You can set `HF_MODEL` in `.env.local` to another chat model available through one of your enabled Hugging Face Inference Providers. Restart Vite after changing environment variables.

The Hugging Face token is read on the server and is never sent to the browser. Local development uses the `/api/chat` middleware in `vite.config.js`; Vercel uses the serverless function in `api/chat.js`. For Vercel, add `HF_TOKEN` under **Project Settings → Environment Variables** for the Production environment (and Preview if you use preview deployments), then redeploy. Add `HF_MODEL` only if you want to override the default model. Do not use a `VITE_` prefix for either secret/configuration variable.

## Troubleshooting

- If the chat reports that `HF_TOKEN` is missing, check `.env.local` and restart `npm run dev`.
- If Hugging Face says no provider supports the model, enable an Inference Provider that serves the model or set `HF_MODEL` to a model served by a provider enabled on your account.
- If Hugging Face reports an authorization or billing error, verify the token's Inference Providers permission and that your account has access/credits for the selected provider.
