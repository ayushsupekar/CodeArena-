/**
 * compilerApi.js
 * Centralized Axios service — frontend ONLY calls this, never Judge0 directly.
 */

import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Run code via Express backend → Judge0
 * @param {string} sourceCode
 * @param {number} languageId
 * @param {string} stdin
 */
export const runCode = async (sourceCode, languageId, stdin = '') => {
  const res = await api.post('/api/code/run', {
    source_code: sourceCode,
    language_id: languageId,
    stdin,
  })
  return res.data.data
}

/**
 * Fetch supported languages from backend
 */
export const fetchLanguages = async () => {
  const res = await api.get('/api/code/languages')
  return res.data.data
}
