/**
 * server.js — Express entry point
 * Starts the API server that proxies requests to Judge0
 */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import codeRoutes from './routes/code.routes.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json({ limit: '1mb' }))

// ── Routes ────────────────────────────────────────────────────
app.use('/api/code', codeRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', judge0: process.env.JUDGE0_URL })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.method} ${req.path} not found` })
})

// ── Global error handler (must be last) ──────────────────────
app.use(errorHandler)

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ CodeArena backend running on http://localhost:${PORT}`)
  console.log(`🔗 Judge0 URL: ${process.env.JUDGE0_URL}`)
  console.log(`🌐 Accepting requests from: ${CLIENT_URL}`)
})
