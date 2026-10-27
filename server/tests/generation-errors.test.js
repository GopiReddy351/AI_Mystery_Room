import test from 'node:test';
import assert from 'node:assert/strict';
import { generationFailure, isTransientProviderError } from '../src/services/generation-errors.js';

test('retries Gemini 503 and UNAVAILABLE responses', () => {
  assert.equal(isTransientProviderError({ status: 503, message: 'high demand' }), true);
  assert.equal(isTransientProviderError({ code: 'UNAVAILABLE' }), true);
});

test('retries rate limits and network timeouts', () => {
  assert.equal(isTransientProviderError({ status: 429 }), true);
  assert.equal(isTransientProviderError({ code: 'ETIMEDOUT' }), true);
});

test('does not retry setup or invalid request failures', () => {
  assert.equal(isTransientProviderError({ code: 'AI_NOT_CONFIGURED', status: 503 }), false);
  assert.equal(isTransientProviderError({ status: 400, message: 'invalid argument' }), false);
});

test('returns a recoverable, user-safe message for Gemini high demand', () => {
  assert.deepEqual(generationFailure({ status: 503, message: 'private provider text' }), {
    code: 'GEMINI_UNAVAILABLE',
    message: 'Gemini is temporarily unavailable. Please try generating this case again shortly.',
  });
});

test('returns a clear message for Gemini rate limits', () => {
  assert.equal(generationFailure({ status: 429 }).code, 'GEMINI_BUSY');
});
