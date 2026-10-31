# CAYA Clinic (Next.js 15, App Router)
npm install && npm run dev   # http://localhost:3000
Swap blurry mockup crops in public/images (hero, skin, hair, aesthetic, clinic .jpg) for real photos.

## Chatbot (Groq)
1. Copy `.env.example` to `.env.local` and set `GROQ_API_KEY` (https://console.groq.com/keys).
2. Model: `qwen/qwen3.8-27b` (change with `GROQ_MODEL`).
3. Key stays server-side in `app/api/chat/route.ts`. On Vercel add the same vars in Project Settings → Environment Variables.
