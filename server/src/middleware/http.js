import { Session } from '../models/index.js';
export function asyncRoute(fn) { return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next); }
export function success(res, data, status = 200, meta = {}) { return res.status(status).json({ success: true, data, meta }); }
export function fail(res, status, code, message) { return res.status(status).json({ success: false, error: { code, message } }); }
export async function requireSession(req, res, next) { if (!req.ownerHash) return fail(res, 401, 'SESSION_REQUIRED', 'Start a session before opening a case.'); try { const session = await Session.findOne({ tokenHash: req.ownerHash, expiresAt: { $gt: new Date() } }); if (!session) return fail(res, 401, 'SESSION_EXPIRED', 'Your session has expired. Start a new session.'); next(); } catch (err) { next(err); } }
export function errors(err, req, res, next) {
  if (res.headersSent) return next(err);
  console.error('[api]', err.message);
  const status = err.status || 500;
  return fail(res, status, err.code || 'INTERNAL_ERROR', status === 500 ? 'The request could not be completed. Please try again.' : err.message);
}
