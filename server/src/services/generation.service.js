import { Case, GenerationJob } from '../models/index.js';
import { env } from '../config/env.js';
import { generateMystery, validateBlueprint } from './ai/gemini.service.js';
import { generationFailure, isTransientProviderError } from './generation-errors.js';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const retryDelay = attempt => Math.min(8000, 1000 * (2 ** attempt)) + Math.floor(Math.random() * 250);
export async function processGeneration(jobId, caseId) {
  let lastError;
  const maxAttempts = env.maxGenerationRetries + 1;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const currentJob = await GenerationJob.findById(jobId);
      if (!currentJob || currentJob.status === 'cancelled') return;
      await GenerationJob.findByIdAndUpdate(jobId, { status: 'generating_blueprint', stage: 'Writing the case blueprint', progress: 15, updatedAt: new Date() });
      const record = await Case.findById(caseId);
      if (!record) throw new Error('Case record was not found.');
      const blueprint = validateBlueprint(await generateMystery({ premise: record.premise, difficulty: record.difficulty, theme: record.theme }), record.difficulty);
      await GenerationJob.findByIdAndUpdate(jobId, { status: 'validating_case', stage: 'Checking evidence and references', progress: 85, updatedAt: new Date() });
      const latestJob = await GenerationJob.findById(jobId);
      if (!latestJob || latestJob.status === 'cancelled') return;
      const solution = { ...blueprint.solution };
      record.title = blueprint.title; record.summary = blueprint.summary; record.theme = blueprint.theme || record.theme || 'mystery'; record.suspects = blueprint.suspects; record.evidence = blueprint.evidence; record.timeline = blueprint.timeline; record.solution = solution; record.status = 'playable'; record.updatedAt = new Date();
      await record.save();
      await GenerationJob.findByIdAndUpdate(jobId, { status: 'completed', stage: 'Case ready', progress: 100, updatedAt: new Date() });
      return;
    } catch (error) {
      lastError = error;
      if (!isTransientProviderError(error) || attempt === maxAttempts - 1) break;
      const waitMs = retryDelay(attempt);
      await GenerationJob.findByIdAndUpdate(jobId, { stage: `Gemini is busy; retrying in ${Math.ceil(waitMs / 1000)} seconds`, updatedAt: new Date() });
      await delay(waitMs);
    }
  }
  const finalJob = await GenerationJob.findById(jobId);
  if (!finalJob || finalJob.status === 'cancelled') return;
  const failure = generationFailure(lastError);
  await Case.findByIdAndUpdate(caseId, { status: 'failed', updatedAt: new Date() });
  await GenerationJob.findByIdAndUpdate(jobId, { status: 'failed', stage: 'Generation failed', progress: 100, errorCode: failure.code, errorMessage: failure.message, updatedAt: new Date() });
}
