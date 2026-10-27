import mongoose from 'mongoose';
import app from './app.js';
import { env } from './config/env.js';
import { GenerationJob } from './models/index.js';
import { processGeneration } from './services/generation.service.js';

try {
  await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 });
  console.log('[database] MongoDB connected');
  const pending = await GenerationJob.find({ status: { $in: ['queued', 'validating', 'generating_blueprint', 'generating_evidence', 'generating_assets', 'validating_case'] } }).select('_id caseId');
  for (const job of pending) setImmediate(() => processGeneration(job._id, job.caseId).catch(err => console.error('[generation recovery]', err.message)));
  if (pending.length) console.log(`[generation] Resuming ${pending.length} pending job(s)`);
  app.listen(env.port, () => console.log(`[server] AI Mystery Room API listening on ${env.port}`));
} catch (error) {
  console.error(`[startup] MongoDB connection failed: ${error.message}`);
  process.exit(1);
}
