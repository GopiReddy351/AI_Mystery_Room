export function isTransientProviderError(error) {
  if (!error || error.code === 'AI_NOT_CONFIGURED') return false;
  const status = Number(error.status ?? error.statusCode);
  if (status === 429 || (status >= 500 && status <= 599)) return true;
  const code = String(error.code || error.status || '').toUpperCase();
  if (['UNAVAILABLE', 'RESOURCE_EXHAUSTED', 'ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'EAI_AGAIN', 'ABORT_ERR'].includes(code)) return true;
  return /high demand|try again later|temporarily unavailable|timed? ?out|socket hang up|fetch failed/i.test(String(error.message || ''));
}

export function generationFailure(error) {
  if (error?.code === 'AI_NOT_CONFIGURED') {
    return { code: error.code, message: error.message };
  }
  const status = Number(error?.status ?? error?.statusCode);
  if (status === 429 || String(error?.code || '').toUpperCase() === 'RESOURCE_EXHAUSTED') {
    return { code: 'GEMINI_BUSY', message: 'Gemini is experiencing high demand. Please try generating this case again shortly.' };
  }
  if (isTransientProviderError(error)) {
    return { code: 'GEMINI_UNAVAILABLE', message: 'Gemini is temporarily unavailable. Please try generating this case again shortly.' };
  }
  return { code: error?.code || 'GENERATION_FAILED', message: 'We could not validate this case. Please try generating another one.' };
}
