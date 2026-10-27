import dotenv from 'dotenv';
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai_mystery_room',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
  sessionSecret: process.env.SESSION_SECRET || 'development-only-change-this-secret',
  sessionTtlDays: Number(process.env.SESSION_TTL_DAYS || 7),
  maxPromptLength: Number(process.env.MAX_PROMPT_LENGTH || 2000),
  generationTimeoutMs: Number(process.env.GENERATION_TIMEOUT_MS || 120000),
  maxGenerationRetries: Math.max(0, Math.min(5, Number.parseInt(process.env.MAX_GENERATION_RETRIES || '2', 10) || 0)),
};
