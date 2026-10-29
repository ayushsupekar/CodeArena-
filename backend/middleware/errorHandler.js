/**
 * Global error handler middleware
 * Catches anything thrown inside route handlers
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path} —`, err.message)

  // Axios errors from Judge0 communication
  if (err.isAxiosError) {
    if (err.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        error: 'Judge0 service is unavailable. Make sure Docker is running.',
      })
    }
    if (err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        error: 'Judge0 request timed out.',
      })
    }
    return res.status(502).json({
      success: false,
      error: 'Failed to communicate with Judge0.',
      details: err.response?.data || err.message,
    })
  }

  // Validation errors
  if (err.type === 'validation') {
    return res.status(400).json({ success: false, error: err.message })
  }

  // Generic fallback
  return res.status(500).json({
    success: false,
    error: 'Internal server error.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
}
