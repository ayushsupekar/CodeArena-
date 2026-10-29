/**
 * code.controller.js
 * Handles request validation, calls the Judge0 service, and formats the response.
 */

import { validationResult } from 'express-validator'
import { runCode, getLanguages } from '../services/judge0.service.js'
import { sendSuccess, sendError } from '../utils/response.js'

// Supported language IDs — extend as needed
const SUPPORTED_LANGUAGES = {
  71: 'Python',
  62: 'Java',
  54: 'C++',
  50: 'C',
  63: 'JavaScript',
}

/**
 * POST /api/code/run
 * Validates input, submits to Judge0, returns structured result
 */
export const handleRunCode = async (req, res, next) => {
  try {
    // express-validator errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 400, errors.array())
    }

    const { source_code, language_id, stdin = '' } = req.body

    // Extra guard: check language is supported
    if (!SUPPORTED_LANGUAGES[language_id]) {
      return sendError(
        res,
        `Unsupported language_id: ${language_id}. Supported: ${Object.keys(SUPPORTED_LANGUAGES).join(', ')}`,
        400
      )
    }

    console.log(`[RUN] language=${SUPPORTED_LANGUAGES[language_id]} (${language_id}), codeLen=${source_code.length}`)

    const result = await runCode(source_code, language_id, stdin)

    // Normalize and return only what the frontend needs
    return sendSuccess(res, {
      stdout: result.stdout || null,
      stderr: result.stderr || null,
      compile_output: result.compile_output || null,
      message: result.message || null,
      time: result.time || null,
      memory: result.memory || null,
      status: {
        id: result.status?.id,
        description: result.status?.description,
      },
    })
  } catch (err) {
    next(err) // forward to global error handler
  }
}

/**
 * GET /api/code/languages
 * Returns list of languages from Judge0, filtered to supported ones
 */
export const handleGetLanguages = async (req, res, next) => {
  try {
    const all = await getLanguages()

    // Filter to only our supported language IDs
    const filtered = all.filter(lang => SUPPORTED_LANGUAGES[lang.id])

    return sendSuccess(res, filtered)
  } catch (err) {
    next(err)
  }
}
