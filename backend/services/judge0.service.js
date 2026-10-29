/**
 * judge0.service.js
 * All communication with the local Judge0 Docker instance happens here.
 * Never import this directly in routes — use the controller.
 */

import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const JUDGE0_URL = process.env.JUDGE0_URL || 'http://localhost:2358'
const TIMEOUT = parseInt(process.env.JUDGE0_TIMEOUT || '10000')

// Axios instance pre-configured for Judge0
const judge0 = axios.create({
  baseURL: JUDGE0_URL,
  timeout: TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Submit code to Judge0 and wait for result synchronously (wait=true)
 * @param {string} sourceCode
 * @param {number} languageId
 * @param {string} stdin
 * @returns {Promise<object>} Judge0 submission result
 */
export const runCode = async (sourceCode, languageId, stdin = '') => {
  const response = await judge0.post(
    '/submissions',
    { source_code: sourceCode, language_id: languageId, stdin },
    { params: { base64_encoded: false, wait: true } }
  )
  return response.data
}

/**
 * Fetch all supported languages from Judge0
 * @returns {Promise<Array>} list of language objects
 */
export const getLanguages = async () => {
  const response = await judge0.get('/languages')
  return response.data
}
