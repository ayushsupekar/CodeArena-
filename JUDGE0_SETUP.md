# Judge0 Integration Setup

## Quick Setup Steps

1. **Get RapidAPI Key**
   - Go to [RapidAPI Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce)
   - Subscribe to the free plan
   - Copy your API key

2. **Add to Environment**
   ```bash
   # Add to .env.local
   RAPIDAPI_KEY=your-rapidapi-key-here
   ```

3. **Test Integration**
   - Your `/api/execute` route is already configured
   - Submit code through the compiler interface
   - Results will show real execution from Judge0

## Language IDs
- JavaScript: 63
- Python: 71  
- Java: 62
- C++: 54
- C: 50
- Go: 60
- Rust: 73

## API Endpoints Used
- Submit: `POST /submissions`
- Get Result: `GET /submissions/{token}`

Your CodeArena compiler is now ready to execute real code!