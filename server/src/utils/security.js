import crypto from 'node:crypto';
import { env } from '../config/env.js';

export const hashToken = token => crypto.createHmac('sha256', env.sessionSecret).update(token).digest('hex');
export const randomToken = () => crypto.randomBytes(32).toString('base64url');
export const safeEqual = (a, b) => { const x = Buffer.from(a); const y = Buffer.from(b); return x.length === y.length && crypto.timingSafeEqual(x, y); };
