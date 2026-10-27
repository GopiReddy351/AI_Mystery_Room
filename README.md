# AI Mystery Room

AI Mystery Room turns a story premise into a fictional detective case. Investigate its suspects, evidence, and timeline, then submit one accusation to reveal the solution.

## Requirements

- Node.js 20 or newer
- MongoDB 7 or a compatible MongoDB service
- A Google Gemini API key for case generation

## Run locally

1. Copy `server/.env.example` to `server/.env` and set `GEMINI_API_KEY`. Set a long random `SESSION_SECRET` before exposing the server beyond local development.
2. Start MongoDB at the configured `MONGODB_URI`.
3. Install workspace dependencies with `npm install`.
4. Start the frontend and backend with `npm run dev`.
5. Open <http://localhost:5173>.

The API listens on port 5000 by default. The backend fails at startup when MongoDB is unreachable. Case generation reports a setup error if no Gemini key is configured; it never presents a fabricated case as a successful AI result.

## Commands

- `npm run dev` — run Vite and the API in watch mode.
- `npm run build` — create the production frontend build in `client/dist`.
- `npm run start` — start the API (MongoDB must be available).
- `npm --workspace server test` — run deterministic case validation tests.

## Architecture

- `client/`: React, Vite, React Router, accessible responsive interface.
- `server/`: Express API, Mongoose persistence, anonymous session ownership, Gemini generation, and answer-key protection.
- `spec.md`: product and technical specification.

The backend stores a hash of the opaque session cookie and checks ownership on case and job requests. The culprit is stored only in the server-side case document; public case, suspect, evidence, and job responses use allowlisted fields. The solution endpoint requires a submitted verdict.

## Current scope

The first implementation includes the case creation and generation flow, investigation workspace, evidence browsing, suspect profiles, timeline, notes, bookmarks, accusation, and solution reveal. Evidence images and CCTV are currently presented as fictional evidence cards/storyboard-style visuals; a separate image/video provider and persistent media service are not configured. Anonymous sessions use a secure HTTP-only cookie in production. Configure HTTPS and production storage before deployment.
