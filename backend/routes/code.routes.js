/**
 * code.routes.js
 * Defines POST /api/code/run and GET /api/code/languages
 */

import { Router } from 'express'
import { body } from 'express-validator'
import { handleRunCode, handleGetLanguages } from '../controllers/code.controller.js'

const router = Router()

// Validation rules for run endpoint
const runValidation = [
  body('source_code')
    .notEmpty().withMessage('source_code is required')
    .isString().withMessage('source_code must be a string')
    .isLength({ max: 65536 }).withMessage('source_code too large (max 64KB)'),

  body('language_id')
    .notEmpty().withMessage('language_id is required')
    .isInt({ min: 1 }).withMessage('language_id must be a positive integer')
    .toInt(),

  body('stdin')
    .optional()
    .isString().withMessage('stdin must be a string')
    .isLength({ max: 65536 }).withMessage('stdin too large'),
]

// POST /api/code/run
router.post('/run', runValidation, handleRunCode)

// GET /api/code/languages
router.get('/languages', handleGetLanguages)

export default router
