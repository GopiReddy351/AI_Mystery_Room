# AI MYSTERY ROOM
## Master Product & Technical Specification
**Document Type:** Single Source of Truth for Spec-Driven Development  
**Primary Implementer:** OpenAI Codex  
**Status:** Implementation-ready baseline  
**Version:** 1.0.0

---

# 1. Project Overview

## 1.1 Product Vision

AI Mystery Room is an interactive, AI-powered investigation platform where users submit a short scenario, story, or mystery premise. The application transforms that input into a fictional investigation containing suspects, clues, digital evidence, contradictions, and a hidden culprit.

Users investigate the case by examining evidence such as WhatsApp-style conversations, photographs, CCTV-style recordings, witness statements, timelines, and forensic reports. They must analyze the evidence and identify the culprit before submitting their final accusation.

The experience should feel like investigating a real case through a modern digital detective interface.

## 1.2 Core Value Proposition

- **User-generated mysteries:** Every investigation starts with the user's own idea.
- **AI-generated investigations:** Gemini creates connected cases, suspects, clues, and evidence.
- **Multimedia evidence:** Investigations include text, images, and video-style recordings.
- **Deduction over guessing:** Evidence must contain meaningful clues, red herrings, and solvable contradictions.
- **Interactive storytelling:** Users uncover the truth through exploration rather than simply reading a story.
- **Replayability:** Different scenarios produce different investigations.

## 1.3 Product Goals

1. Allow users to generate an investigation from a short story prompt.
2. Produce internally consistent mysteries with a predetermined culprit.
3. Present evidence through a polished detective-room interface.
4. Allow users to inspect, compare, and bookmark clues.
5. Provide a final accusation workflow.
6. Reveal the actual solution with an evidence-based explanation.
7. Preserve investigation progress when the page is refreshed.
8. Keep Gemini API credentials secure on the backend.

## 1.4 Non-Goals for Version 1

The following are outside the initial release:

- Real criminal investigations or real-world law-enforcement use.
- Public user-generated case sharing or social networking.
- Multiplayer investigations.
- User-uploaded real CCTV footage or private conversations.
- Live surveillance or access to actual WhatsApp accounts.
- Paid subscriptions, payments, or advertising.
- Custom model training.
- Fully generated cinematic video using a separate video-generation service.

These features must not be implemented unless a future specification explicitly authorizes them.

---

# 2. Target Users and Primary Experience

## 2.1 Target Audience

- Mystery and detective-story enthusiasts.
- Puzzle and escape-room players.
- Casual gamers who enjoy interactive storytelling.
- Users who want to create personalized detective challenges.

## 2.2 Main User Journey

1. The user opens the home page.
2. The user enters a story premise.
3. The user chooses difficulty and investigation preferences.
4. The backend validates the input.
5. Gemini generates a structured mystery blueprint.
6. The backend validates the blueprint and establishes the authoritative case solution.
7. The application generates and validates evidence assets.
8. The case becomes playable.
9. The user explores suspects, evidence, timelines, and relationships.
10. The user selects a culprit and submits an accusation.
11. The backend evaluates the accusation.
12. The application reveals the outcome, reasoning, and important clues.
13. The user can return to the case summary or start another mystery.

**Critical rule:** The user must never receive the culprit or hidden solution through normal case APIs before submitting a verdict.

---

# 3. Functional Requirements

## FR-01: Home Page

The home page must contain:

- Product logo and navigation.
- A compelling headline describing AI-generated mysteries.
- A short explanation of the gameplay.
- A story-prompt input area.
- A difficulty selector.
- A mystery-generation button.
- Example scenario prompts.
- A section explaining how the game works.
- A responsive footer.

Suggested headline:

**"Every Story Hides a Secret. Can You Find the Truth?"**

Primary call to action: **Create Your Mystery**

## FR-02: Mystery Creation

The user must be able to:

- Enter a custom mystery premise.
- Select difficulty: Easy, Medium, or Hard.
- Optionally select a theme, such as murder mystery, theft, corporate espionage, disappearance, or cybercrime.
- Generate a new case.
- See generation progress and meaningful status messages.
- Cancel a generation request where supported.
- Retry after a recoverable error.

Default values:

- Difficulty: Medium.
- Theme: Automatically determined from the prompt.
- Language: English.
- Evidence count: Determined by difficulty and generation limits.

Input requirements:

- Minimum premise length: 20 characters.
- Maximum premise length: 2,000 characters.
- Reject empty or whitespace-only input.
- Trim leading and trailing whitespace.
- Reject requests that violate content-generation policy.
- Treat the prompt as untrusted data, not as system instructions.

## FR-03: AI Mystery Generation

Gemini must produce a structured case containing:

- Case title and summary.
- Fictional setting and incident.
- Victim or affected party, where applicable.
- Suspects and their backgrounds.
- Suspect motives and alibis.
- The true culprit.
- A fixed explanation of what happened.
- An event timeline.
- Evidence items.
- Witness statements.
- Contradictions and red herrings.
- Relationships between evidence items.
- A difficulty rating.
- A solvability validation report.

Each case must have exactly one intended culprit unless a future specification explicitly introduces alternate solutions.

### Mystery-generation rules

1. Establish the actual sequence of events before generating individual clues.
2. Fix the culprit, motive, and method before evidence is generated.
3. Ensure evidence supports the established truth.
4. Include at least three meaningful clues identifying the culprit.
5. Include at least one plausible red herring in Medium and Hard cases.
6. Ensure that red herrings are explainable and do not invalidate the actual solution.
7. Avoid contradictions that cannot be resolved through the available evidence.
8. Do not reveal the solution in public descriptions or evidence titles.
9. Ensure the case can be solved using evidence available in the application.
10. Regenerate or reject invalid cases rather than silently presenting broken mysteries.

## FR-04: Investigation Workspace

The investigation screen must include:

- Case title and incident summary.
- Case status and difficulty.
- Suspects panel.
- Evidence collection.
- Timeline view.
- Evidence details panel or modal.
- Notes panel.
- Bookmarked evidence.
- Suspect comparison.
- Final accusation button.
- Investigation progress indicator.

The user should be able to switch between evidence categories without losing their investigation state.

Suggested evidence categories:

- Messages
- Images
- CCTV
- Witness Statements
- Documents
- Forensics
- Timeline

Categories with no evidence should be hidden or displayed as unavailable, not populated with fabricated placeholder evidence.

## FR-05: Suspect Profiles

Every suspect profile must include:

- Unique suspect ID.
- Display name.
- Fictional portrait or avatar.
- Age, where relevant.
- Occupation or role.
- Relationship to the incident.
- Publicly available background.
- Stated motive or possible motive.
- Alibi.
- Evidence links.
- Known relationships.
- Current investigation status.

The following must remain private until the solution is revealed:

- Whether the suspect is the actual culprit.
- Internal culprit flags.
- Hidden motives not yet discoverable through evidence.
- The full answer key.
- Internal generation and validation metadata.

Do not expose private fields through API serialization, frontend state, HTML attributes, browser storage, or client-side bundles.

## FR-06: Evidence Viewer

Each evidence item must contain:

- Evidence ID.
- Evidence type.
- Title.
- Description.
- Creation or discovery timestamp.
- Associated suspects.
- Associated timeline events.
- Relevance classification.
- Asset reference, if applicable.
- Discovery status.
- Evidence relationships.

Supported initial evidence types:

| Type | Presentation |
|---|---|
| Messages | WhatsApp-inspired conversation viewer |
| Images | Image viewer with zoom |
| CCTV | Simulated camera player or storyboard |
| Documents | Document preview |
| Witness statements | Testimony card |
| Forensics | Report with findings |
| Timeline | Chronological event view |

Evidence must support the following interactions:

- Open and close.
- Read or inspect.
- Zoom images.
- Play and pause supported simulated recordings.
- Bookmark and unbookmark.
- Add private investigation notes.
- Navigate to related evidence.
- Navigate to related suspects.

Evidence relationships should help users discover connections without directly revealing the answer.

## FR-07: WhatsApp-Style Messages

Message evidence must be fictional and clearly part of the game.

Each conversation should contain:

- Conversation ID.
- Participants.
- Message IDs.
- Message text.
- Timestamps.
- Optional fictional attachment references.
- Sender alignment.
- Relevant associated clues.

The interface may resemble a messaging application but must not impersonate an actual account or claim that the messages are authentic.

## FR-08: Image Evidence

Gemini must be used for case reasoning and image-generation prompts. Gemini must not be assumed to generate finished image files through every model or API configuration.

Implement an image-provider abstraction so that a compatible image-generation service can be added or configured separately.

Requirements:

- Generate fictional visual assets where a configured provider supports it.
- Associate every asset with its case and evidence item.
- Store asset metadata in MongoDB.
- Store image files in object storage or another persistent media store.
- Save the resulting asset URL or storage key in MongoDB.
- Validate MIME type, size, and ownership before serving uploads or generated assets.
- Use generated assets only after a successful generation and validation response.
- Provide a designed fallback for failed image generation.

Do not fabricate an image URL or pretend that a text description is a generated image.

## FR-09: CCTV-Style Evidence

For Version 1, CCTV evidence can be implemented using AI-generated still frames, a sequence of storyboard images, or short generated clips when the configured provider supports them.

Each recording must include:

- Camera ID.
- Fictional location.
- Recording start and end timestamps.
- Playback duration.
- Available frames or video asset.
- Relevant observations.
- Associated timeline events.

A simulated playback interface is acceptable when real video generation is unavailable. It must clearly behave as a fictional recording and must not imply that genuine surveillance footage exists.

## FR-10: Timeline

Display significant events in chronological order.

Each event must include:

- Event ID.
- Timestamp.
- Event description.
- Associated suspects.
- Related evidence IDs.
- Whether the event is confirmed, disputed, or estimated.

Timeline information must agree with the evidence and the canonical case solution.

## FR-11: Notes and Bookmarks

Users must be able to:

- Add private notes.
- Edit and delete notes.
- Bookmark evidence.
- Remove bookmarks.
- Review saved clues.
- Compare clues across suspects.

Notes and bookmarks must persist after refreshing the page.

If anonymous sessions are used in Version 1, persist these through the backend using a secure, opaque session identifier. Do not trust client-submitted user IDs to establish ownership.

## FR-12: Final Accusation

The user must:

1. Select a suspect.
2. Optionally provide a reasoning statement.
3. Review the accusation.
4. Confirm submission.

The server must:

- Verify the case exists.
- Verify the case is playable and the user owns the session.
- Verify the suspect belongs to the case.
- Prevent duplicate or conflicting submissions.
- Evaluate the selected suspect against the canonical solution.
- Record the result.
- Return a verdict and appropriate feedback.

Recommended behavior: allow one final accusation per playthrough. A retry must create a new playthrough or explicitly restart the case.

The backend must not ask Gemini to decide who the culprit is at the time of accusation. The result must be compared against the culprit fixed during case creation.

## FR-13: Solution Reveal

After the verdict is submitted, reveal:

- Correct or incorrect result.
- Actual culprit.
- Motive.
- Reconstruction of the incident.
- Important clues.
- Explanation of misleading clues.
- Explanation of the culprit's alibi.
- Evidence-supported final timeline.
- Optional score or performance summary.

Every major explanation must reference evidence IDs that exist in the case.

## FR-14: Case History

Provide a case-history page for previously created investigations.

Display:

- Case title.
- Case creation date.
- Difficulty.
- Case status.
- Completion status.
- Verdict status.

Allow users to reopen playable cases and view completed cases. Do not expose a completed case's answer key before the relevant playthrough is completed.

## FR-15: Error and Empty States

The application must handle:

- Invalid prompts.
- Gemini API failures.
- Gemini rate limits.
- Invalid AI-generated JSON.
- Failed image generation.
- Failed media uploads.
- Network disconnections.
- Expired sessions.
- Missing assets.
- Missing evidence.
- Already-submitted accusations.
- Unauthorized requests.
- Missing cases.

All errors must have a clear user-facing explanation and an appropriate recovery action.

---

# 4. User Interface and Design System

## 4.1 Visual Direction

Build a premium, cinematic detective interface with a futuristic investigative atmosphere.

Design characteristics:

- Dark mode as the default.
- Charcoal and deep navy backgrounds.
- Subtle cyan or electric-blue accents.
- Amber accents for warnings and suspicious evidence.
- Glass-like panels used selectively.
- Fine borders and restrained glow effects.
- Clear typography and high contrast.
- Smooth, purposeful transitions.
- Detailed evidence cards.
- A visually distinctive case workspace.

Avoid excessive neon, cluttered dashboards, constant animation, and decorative effects that make evidence difficult to read.

## 4.2 Suggested Design Tokens

```css
:root {
  --color-bg: #080B12;
  --color-surface: #111827;
  --color-surface-elevated: #182235;
  --color-border: #29364B;
  --color-primary: #55C8FF;
  --color-secondary: #8B8FFF;
  --color-warning: #F5B84B;
  --color-danger: #FF626D;
  --color-success: #58D6A3;
  --color-text: #F2F5FA;
  --color-text-muted: #9AA8BB;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;

  --shadow-panel: 0 12px 40px rgba(0, 0, 0, 0.28);
}
```

Treat these as initial design tokens, not a requirement to use every color on every component.

## 4.3 Layout Requirements

Desktop investigation layout:

- Left sidebar: navigation and case information.
- Main area: evidence board, timeline, or selected content.
- Right sidebar: suspect profiles, evidence details, or notes.

The layout must adapt to smaller screens.

On mobile:

- Replace persistent sidebars with accessible drawers or tabs.
- Keep the selected evidence readable.
- Ensure controls are touch-friendly.
- Keep the final accusation flow accessible.
- Prevent horizontal overflow.

## 4.4 Accessibility

- Semantic HTML.
- Keyboard navigation.
- Visible focus indicators.
- Accessible labels for interactive controls.
- Adequate color contrast.
- Reduced-motion support.
- Captions or textual descriptions for video-style evidence.
- Meaningful alt text for evidence images.
- Loading states announced accessibly where appropriate.

## 4.5 Interface States

Every asynchronous feature must provide:

- Idle state.
- Loading state.
- Success state.
- Error state.
- Retry behavior where appropriate.

Use skeletons or restrained progress indicators for long-running AI operations. Never block the entire application unnecessarily.

---

# 5. Technology Stack

## 5.1 Frontend

- React.
- Vite.
- JavaScript with JSX.
- React Router.
- Plain CSS and CSS variables.
- Fetch API or a lightweight HTTP client.
- A lightweight state-management approach using React state and Context where sufficient.

Do not introduce Redux, Next.js, or a large component framework without explicit approval in a future specification.

Suggested libraries:

- `react-router-dom` for routing.
- `lucide-react` for icons.
- `react-markdown` only if Markdown rendering is needed, with raw HTML disabled.
- A lightweight schema-validation library if shared frontend validation is useful.

## 5.2 Backend

- Node.js.
- Express.js.
- MongoDB.
- Mongoose.
- Gemini API through the official supported Google Gen AI SDK.
- `dotenv` for local environment configuration.
- `helmet` for security headers.
- `cors` with explicit allowed origins.
- `express-rate-limit` for abuse protection.
- A supported multipart-processing library only where uploads are needed.

## 5.3 AI

Primary AI provider: Google Gemini.

The backend must:

- Make all Gemini calls.
- Validate all model responses.
- Keep the API key private.
- Use structured output or JSON response modes where supported.
- Apply server-side timeouts and bounded retries.
- Handle model and API-version changes through a central AI service.
- Use configurable model identifiers rather than hard-coding them across the codebase.

Use a compatible Gemini model selected through environment configuration. Do not assume that all Gemini models support identical text, structured-output, image, or video capabilities.

## 5.4 Media Storage

Use a media-storage abstraction.

For local development, local file storage may be used. For deployed environments, use a persistent object-storage provider.

MongoDB must store media metadata and references, not large binary media files by default.

## 5.5 Tooling

- Git and GitHub.
- ESLint.
- Prettier.
- Vitest and React Testing Library.
- Supertest for backend API testing.
- MongoDB test database or isolated test collections.
- Playwright for critical end-to-end tests.

Use supported, mutually compatible dependency versions and commit the package lockfiles.

---

# 6. System Architecture

## 6.1 High-Level Architecture

```text
                    USER
                     |
                     v
          REACT + VITE FRONTEND
                     |
               REST API / JSON
                     |
                     v
             EXPRESS BACKEND
                     |
         +-----------+-----------+
         |           |           |
         v           v           v
     MYSTERY      CASE STATE   SESSION &
     SERVICE      SERVICE      VALIDATION
         |
         v
     GEMINI AI SERVICE
         |
         v
   STRUCTURED CASE BLUEPRINT
         |
         v
   VALIDATION + SOLUTION LOCK
         |
         +--------------------+
         |                    |
         v                    v
    MONGODB             MEDIA SERVICE
                             |
                             v
                    IMAGE / VIDEO PROVIDER

```

## 6.2 Architectural Rules

1. The frontend must never call Gemini directly.
2. All case mutations must be authorized by the backend.
3. MongoDB is the persistent source of truth for cases and progress.
4. Gemini-generated output is untrusted until validated.
5. The canonical culprit must be fixed before a case becomes playable.
6. Public case responses must exclude answer-key fields.
7. Evidence generation must reference the established case blueprint.
8. Media providers must be replaceable without rewriting the case logic.
9. API errors must use a consistent response structure.
10. Long-running generation must be represented by explicit server-side job status.

## 6.3 AI Generation Pipeline

Use the following pipeline:

**Step 1 — Validate:** Validate the prompt, difficulty, theme, and generation limits.

**Step 2 — Generate blueprint:** Ask Gemini to create the setting, suspects, canonical truth, event sequence, and evidence plan.

**Step 3 — Validate blueprint:** Verify schema, IDs, culprit existence, timeline coherence, and evidence coverage.

**Step 4 — Lock the solution:** Persist the canonical answer key in a protected field. The case is not playable yet.

**Step 5 — Generate evidence:** Generate messages, documents, image prompts, CCTV storyboards, and supporting evidence from the locked blueprint.

**Step 6 — Validate evidence:** Ensure every evidence reference is valid, timestamps are coherent, and key conclusions are supported.

**Step 7 — Generate assets:** Create images or recordings through configured providers, with appropriate fallbacks.

**Step 8 — Validate solvability:** Check that the intended culprit can be deduced from available evidence and that no accidental alternative culprit is equally supported.

**Step 9 — Publish case:** Mark the case playable only when all required validation checks pass.

**Step 10 — Recover failures:** Retry transient failures safely. If the case cannot be completed within configured limits, mark generation as failed and provide a recoverable user experience.

## 6.4 Background Jobs

Case generation may exceed ordinary HTTP request durations. Use a job-oriented design.

Recommended initial approach:

- Create a case-generation job.
- Return HTTP 202 with a job ID.
- Store job status in MongoDB.
- Process the job asynchronously using a bounded worker.
- Provide a status endpoint for polling.
- Persist intermediate generation stages.
- Retry only transient errors.
- Make individual generation steps idempotent where practical.

A dedicated queue such as Redis-backed BullMQ may be introduced if needed, but Redis is not a mandatory dependency for the first release. Do not pretend a background job is durable if it exists only in memory.

Suggested job statuses:

`queued`, `validating`, `generating_blueprint`, `generating_evidence`, `generating_assets`, `validating_case`, `completed`, `failed`, `cancelled`.

---

# 7. Data Model

Use Mongoose schemas with explicit validation, timestamps, indexes, and references.

The exact schemas may evolve during implementation, but the following logical entities and privacy boundaries are mandatory.

## 7.1 Case

Collection: `cases`

```js
{
  _id: ObjectId,
  title: String,
  premise: String,
  summary: String,
  theme: String,
  difficulty: "easy" | "medium" | "hard",
  status: "generating" | "playable" | "failed" | "archived",

  createdBySessionId: ObjectId,

  suspectIds: [ObjectId],
  evidenceIds: [ObjectId],
  timelineEventIds: [ObjectId],

  generationJobId: ObjectId,
  generationVersion: String,
  schemaVersion: Number,

  solution: {
    culpritSuspectId: ObjectId,
    motive: String,
    method: String,
    reconstruction: String,
    explanation: String
  },

  createdAt: Date,
  updatedAt: Date
}
```

The `solution` field is server-only. It must never be returned in a public case DTO before the relevant playthrough is completed.

Do not store the entire private answer key in an unprotected client-readable document.

## 7.2 Suspect

Collection: `suspects`

```js
{
  _id: ObjectId,
  caseId: ObjectId,
  name: String,
  age: Number,
  occupation: String,
  background: String,
  relationshipToIncident: String,
  publicMotive: String,
  publicAlibi: String,
  portraitAssetId: ObjectId,
  createdAt: Date
}
```

Private suspect attributes may be stored separately or in restricted backend-only fields. Public suspect responses must be built using explicit allowlisted serializers.

## 7.3 Evidence

Collection: `evidence`

```js
{
  _id: ObjectId,
  caseId: ObjectId,

  type: "messages" | "image" | "cctv" |
        "document" | "testimony" | "forensics",

  title: String,
  description: String,
  discoveredAt: Date,

  associatedSuspectIds: [ObjectId],
  relatedEvidenceIds: [ObjectId],
  relatedTimelineEventIds: [ObjectId],

  relevance: "primary" | "supporting" | "red_herring",
  content: Mixed,

  assetIds: [ObjectId],
  createdAt: Date
}
```

Use type-specific content schemas where possible. Do not allow arbitrary AI-generated objects to be saved without validation.

## 7.4 Timeline Event

Collection: `timelineEvents`

```js
{
  _id: ObjectId,
  caseId: ObjectId,
  timestamp: Date,
  description: String,
  relatedSuspectIds: [ObjectId],
  relatedEvidenceIds: [ObjectId],
  certainty: "confirmed" | "disputed" | "estimated"
}
```

## 7.5 Investigation Session

Collection: `investigationSessions`

```js
{
  _id: ObjectId,
  sessionIdHash: String,
  caseId: ObjectId,

  status: "active" | "submitted" | "completed",

  discoveredEvidenceIds: [ObjectId],
  bookmarkedEvidenceIds: [ObjectId],

  notes: [
    {
      _id: ObjectId,
      content: String,
      relatedEvidenceId: ObjectId,
      updatedAt: Date
    }
  ],

  verdict: {
    suspectId: ObjectId,
    reasoning: String,
    correct: Boolean,
    submittedAt: Date
  },

  createdAt: Date,
  updatedAt: Date
}
```

Use a unique compound index for the session and case relationship if the product permits only one playthrough per session and case. If multiple playthroughs are supported, use a separate playthrough identifier and enforce the correct uniqueness constraint.

Do not persist the correct answer in the session before submission.

## 7.6 Generation Job

Collection: `generationJobs`

```js
{
  _id: ObjectId,
  caseId: ObjectId,
  sessionIdHash: String,

  status: String,
  stage: String,
  progress: Number,

  attempts: Number,
  errorCode: String,
  errorMessage: String,

  startedAt: Date,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

Do not store API keys, credentials, raw sensitive provider headers, or unfiltered internal prompts in user-readable job responses.

## 7.7 Media Asset

Collection: `mediaAssets`

```js
{
  _id: ObjectId,
  caseId: ObjectId,

  type: "image" | "video" | "audio" | "document",
  provider: String,
  storageKey: String,
  mimeType: String,
  sizeBytes: Number,

  generationStatus: "pending" | "ready" | "failed",
  altText: String,

  createdAt: Date
}
```

Asset URLs should be generated or retrieved according to the configured storage provider. Use signed URLs where private access is required.

## 7.8 Indexing Requirements

At minimum:

- Cases: index by `createdBySessionId` and `createdAt`.
- Evidence: index by `caseId` and `type`.
- Suspects: index by `caseId`.
- Timeline events: index by `caseId` and `timestamp`.
- Investigation sessions: unique/indexed session and case relationship.
- Generation jobs: index by `sessionIdHash` and `createdAt`.
- Media assets: index by `caseId`.

Use MongoDB transactions where supported and justified for critical multi-document state changes. Ensure solution locking and case publication cannot leave a partially playable case.

---

# 8. API Specification

Base path: `/api/v1`

All requests and responses use JSON unless explicitly handling media uploads.

## 8.1 Standard Response Format

Successful responses:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "CASE_NOT_FOUND",
    "message": "The requested case could not be found."
  }
}
```

Never include stack traces, secrets, internal answer keys, raw provider errors, or private database fields in public responses.

## 8.2 Session Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/sessions` | Create an anonymous session |
| GET | `/sessions/me` | Get current session information |

Use a cryptographically secure opaque session token. Store only a hash of the token where appropriate. Set session cookies as `HttpOnly`, `Secure` in production, and with an appropriate `SameSite` policy.

Protect cookie-authenticated state-changing endpoints against CSRF.

## 8.3 Case Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/cases` | Create a case-generation job |
| GET | `/cases` | List cases belonging to the session |
| GET | `/cases/:caseId` | Retrieve a public case summary |
| DELETE | `/cases/:caseId` | Delete or archive an owned case according to policy |

`POST /cases` accepts:

```json
{
  "premise": "A rare diamond disappears during a private exhibition.",
  "difficulty": "medium",
  "theme": "theft"
}
```

Expected behavior:

- Validate the payload.
- Apply rate limits.
- Create the case and job records.
- Start asynchronous generation.
- Return HTTP 202.

Example response:

```json
{
  "success": true,
  "data": {
    "caseId": "CASE_OBJECT_ID",
    "jobId": "JOB_OBJECT_ID",
    "status": "queued"
  }
}
```

The identifiers above are illustrative, not fixed values.

## 8.4 Generation Job Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/generation-jobs/:jobId` | Retrieve generation progress |
| POST | `/generation-jobs/:jobId/cancel` | Request cancellation |

Only the owning session may access or cancel a job.

## 8.5 Suspect Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/cases/:caseId/suspects` | List public suspect profiles |
| GET | `/cases/:caseId/suspects/:suspectId` | Get a public suspect profile |

Return only public suspect information.

## 8.6 Evidence Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/cases/:caseId/evidence` | List evidence |
| GET | `/cases/:caseId/evidence/:evidenceId` | Retrieve evidence details |
| POST | `/cases/:caseId/evidence/:evidenceId/discover` | Mark evidence as discovered |
| POST | `/cases/:caseId/evidence/:evidenceId/bookmark` | Bookmark evidence |
| DELETE | `/cases/:caseId/evidence/:evidenceId/bookmark` | Remove bookmark |

The list endpoint should support pagination and filtering by evidence type.

Evidence discovery must be validated against the relevant session and case.

## 8.7 Investigation Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/cases/:caseId/investigation` | Retrieve saved progress |
| PUT | `/cases/:caseId/investigation/notes/:noteId` | Update a note |
| POST | `/cases/:caseId/investigation/notes` | Create a note |
| DELETE | `/cases/:caseId/investigation/notes/:noteId` | Delete a note |
| POST | `/cases/:caseId/accusations` | Submit a final accusation |
| GET | `/cases/:caseId/solution` | Retrieve solution after eligible completion |

The server must enforce session ownership and solution-release rules on every endpoint.

## 8.8 HTTP Status Codes

Use conventional status codes:

- `200`: Successful read or mutation.
- `201`: Resource created immediately.
- `202`: Asynchronous generation accepted.
- `400`: Invalid request.
- `401`: Missing or invalid session.
- `403`: Forbidden operation.
- `404`: Resource not found.
- `409`: Conflicting state or duplicate verdict.
- `413`: Request too large.
- `422`: Semantically invalid content.
- `429`: Rate limit exceeded.
- `500`: Unexpected internal error.
- `502` or `503`: Upstream AI/media provider unavailable.

Do not return `200` for failed operations.

---

# 9. Gemini Integration Specification

## 9.1 Service Abstraction

Create a dedicated service:

`server/src/services/ai/gemini.service.js`

It should be responsible for:

- Calling the configured Gemini model.
- Supplying system instructions and validated user data.
- Requesting structured output.
- Enforcing timeouts.
- Parsing and validating responses.
- Handling provider errors.
- Applying bounded retries.
- Logging request metadata without exposing secrets.

Do not place Gemini calls inside Express route handlers or React components.

## 9.2 Prompt Architecture

Maintain separate prompt templates for:

1. Mystery blueprint generation.
2. Evidence generation.
3. Solvability and consistency validation.
4. Solution explanation.
5. Optional narrative refinement.

All prompts must share the same case IDs, suspect IDs, timeline, and canonical truth.

Do not regenerate the underlying mystery while generating evidence.

## 9.3 Mystery Blueprint Output

The blueprint should be validated against a schema similar to:

```json
{
  "title": "The Last Gallery Visit",
  "summary": "A valuable artwork disappears during a private event.",
  "incident": {
    "type": "theft",
    "location": "A fictional art gallery",
    "timestamp": "2026-10-01T20:30:00Z"
  },
  "suspects": [
    {
      "id": "suspect_1",
      "name": "Alex Morgan",
      "role": "Gallery assistant",
      "background": "A fictional character",
      "motive": "An apparent financial motive",
      "alibi": "A statement that can be checked"
    }
  ],
  "canonicalTruth": {
    "culpritSuspectId": "suspect_1",
    "motive": "A defined motive",
    "method": "A defined fictional method",
    "reconstruction": "The actual sequence of events"
  },
  "timeline": [],
  "evidencePlan": [],
  "solutionClues": [],
  "redHerrings": []
}
```

This is an illustrative schema example. Production output must contain all required suspects, events, and evidence definitions.

## 9.4 Evidence Generation Rules

Every evidence item must be generated from the approved blueprint.

For each item, Gemini should identify:

- The fact the evidence establishes.
- Which suspects it relates to.
- Which timeline events it supports.
- Whether it supports or challenges an alibi.
- Whether it is a red herring.
- What a careful player could reasonably infer.

AI output must never be trusted to determine its own correctness.

## 9.5 Solvability Validation

Implement deterministic checks wherever possible:

- Every referenced suspect exists.
- Every evidence reference exists.
- Timeline IDs are unique.
- Required fields are present.
- The culprit belongs to the case.
- Timestamps use valid formats.
- Every intended solution clue exists.
- Evidence references support the canonical reconstruction.
- Required evidence categories have been generated or explicitly marked unavailable.

Use a second AI validation pass as an additional quality check, not as the sole validator.

If validation fails, regenerate only the invalid stage where safe; otherwise restart the generation pipeline with bounded retries.

## 9.6 Gemini Failure Handling

Handle:

- Rate limits.
- Invalid JSON.
- Content-policy refusals.
- Timeout.
- Empty output.
- Unexpected response structure.
- Provider unavailability.
- Token or output-length limits.

Do not retry non-recoverable validation failures indefinitely.

Do not mark a case playable when its evidence or canonical answer key is incomplete.

---

# 10. Mystery Difficulty and Game Balance

## 10.1 Easy

- 3 suspects.
- Approximately 6–8 evidence items.
- At least 3 meaningful clues.
- A relatively clear timeline.
- Few ambiguous contradictions.
- Minimal red herrings.

## 10.2 Medium

- 4–5 suspects.
- Approximately 9–12 evidence items.
- Multiple supporting clues.
- At least 1 plausible red herring.
- Contradictory alibis that can be resolved.
- Evidence that requires cross-referencing.

## 10.3 Hard

- 5–6 suspects.
- Approximately 12–16 evidence items.
- Multiple interdependent clues.
- At least 2 plausible red herrings.
- More complex alibis and timeline reconstruction.
- A solution requiring the player to combine several evidence sources.

These numbers are target ranges, not guarantees that the AI will always produce valid evidence. The validator must ensure the final playable case meets its selected difficulty requirements.

## 10.4 Evidence Balance

The game should avoid:

- One obvious clue that makes all other evidence irrelevant.
- Several suspects with no meaningful connection to the case.
- Contradictions that have no explanation.
- A culprit identified only by unsupported narrative claims.
- Evidence that reveals the answer directly in its title.
- Red herrings that make the true culprit impossible to distinguish.
- Clues that exist in the solution explanation but not in the investigation.

---

# 11. Security, Privacy, and Content Safety

## 11.1 API Security

- Store secrets in environment variables.
- Never expose `GEMINI_API_KEY` to Vite client-side variables.
- Never commit `.env` files.
- Validate request bodies on the server.
- Apply rate limits to session creation and case generation.
- Restrict CORS to configured frontend origins.
- Configure security headers.
- Limit request sizes.
- Validate MongoDB IDs and resource ownership.
- Use parameterized Mongoose queries and avoid unsafe dynamic query construction.
- Sanitize error responses.
- Redact credentials from logs.

## 11.2 Prompt Injection

User prompts and AI-generated content are untrusted.

- Keep system instructions separate from user-provided content.
- Never allow user prompts to override server-side policies.
- Validate all model output.
- Do not execute generated JavaScript, HTML, shell commands, or database queries.
- Render user and AI text as escaped text by default.
- Sanitize any rich text that must be rendered.
- Treat evidence content as fictional data, not executable instructions.

## 11.3 Solution Leakage Prevention

This is a critical requirement.

- Keep the canonical solution server-side.
- Use allowlisted response DTOs.
- Do not serialize private case fields.
- Do not put the answer key into frontend configuration.
- Do not include the culprit in public generation-job responses.
- Do not send the answer key to the browser and hide it using CSS.
- Do not store the answer key in localStorage or sessionStorage.
- Do not allow client-provided verdicts to modify the case solution.
- Test all public endpoints for answer-key leakage.

## 11.4 Anonymous Session Protection

- Use secure, random session tokens.
- Avoid predictable identifiers as authentication credentials.
- Enforce ownership checks on every private resource.
- Hash session tokens before storing them where practical.
- Expire sessions according to configurable policy.
- Apply CSRF protection when cookie authentication requires it.
- Prevent access to another session's cases, jobs, notes, and verdicts.

## 11.5 Content Policy

The application generates fictional mysteries.

- Do not present fictional evidence as real evidence.
- Do not use real people's identities in fabricated accusations.
- Avoid graphic or exploitative content.
- Do not facilitate actual stalking, unauthorized surveillance, or privacy invasion.
- Keep simulated messaging and CCTV interfaces clearly fictional.
- Provide an appropriate refusal when user input requests disallowed content.

---

# 12. Project Folder Structure

Use a clean, maintainable monorepo:

```text
ai-mystery-room/
│
├── client/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── assets/
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.jsx
│   │   │   └── router.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── evidence/
│   │   │   └── suspects/
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreateCasePage.jsx
│   │   │   ├── InvestigationPage.jsx
│   │   │   ├── CaseHistoryPage.jsx
│   │   │   ├── VerdictPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── features/
│   │   │   ├── cases/
│   │   │   ├── evidence/
│   │   │   ├── investigation/
│   │   │   └── suspects/
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── styles/
│   │   │   ├── tokens.css
│   │   │   ├── global.css
│   │   │   └── components.css
│   │   │
│   │   └── main.jsx
│   │
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   ├── cases/
│   │   │   ├── evidence/
│   │   │   ├── generation/
│   │   │   └── media/
│   │   │
│   │   ├── jobs/
│   │   ├── middleware/
│   │   ├── validators/
│   │   ├── serializers/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   ├── .env.example
│   └── package.json
│
├── specs/
│   ├── SPEC.md
│   ├── API.md
│   ├── DATA_MODEL.md
│   ├── AI_GENERATION.md
│   └── ACCEPTANCE_TESTS.md
│
├── .gitignore
├── package.json
├── README.md
└── package-lock.json
```

Codex may adapt the exact file structure when implementation requires it, but must preserve the separation between frontend, backend, AI integration, business logic, persistence, and tests.

---

# 13. Environment Configuration

## Backend `.env.example`

```dotenv
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/ai_mystery_room

CLIENT_ORIGIN=http://localhost:5173

GEMINI_API_KEY=
GEMINI_MODEL=

SESSION_SECRET=
SESSION_TTL_DAYS=7

MEDIA_STORAGE_PROVIDER=local
MEDIA_STORAGE_PATH=./uploads

MAX_PROMPT_LENGTH=2000
GENERATION_TIMEOUT_MS=120000
MAX_GENERATION_RETRIES=2
```

## Frontend `.env.example`

```dotenv
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Rules:

- `.env.example` contains placeholders only.
- `.env` must be excluded from version control.
- Validate required environment variables during backend startup.
- Fail clearly when essential configuration is missing.
- Never expose backend secrets through `VITE_*` variables.
- Keep model IDs, provider options, retry limits, and timeouts configurable.
- A local storage path is for development only unless persistent deployment storage is explicitly configured.

---

# 14. Implementation Phases for Codex

Codex must implement the project in small, verifiable stages rather than generating the entire application in one uncontrolled operation.

## Phase 1 — Foundation

- Create the monorepo.
- Configure React, Vite, Express, and MongoDB.
- Establish routing.
- Create the design system.
- Configure environment validation.
- Add a health-check endpoint.
- Add linting, formatting, and test commands.

**Exit criterion:** The frontend and backend start successfully, MongoDB connectivity works, and the health check passes.

## Phase 2 — Frontend Experience

- Build the home page.
- Build the mystery creation form.
- Build the investigation workspace.
- Build suspect profiles.
- Build the evidence viewer.
- Build the timeline.
- Build notes and bookmarks.
- Build the verdict and solution pages.
- Add loading, error, empty, and responsive states.

Initially use clearly labeled development fixtures to validate the interface. Do not present fixtures as real AI-generated cases.

**Exit criterion:** The complete user journey can be explored using development data.

## Phase 3 — Backend and Persistence

- Implement Mongoose models.
- Implement session handling.
- Implement case and evidence endpoints.
- Implement ownership checks.
- Implement investigation progress.
- Implement notes and bookmarks.
- Implement accusation submission.
- Implement response serializers.
- Add backend tests.

**Exit criterion:** The application persists investigation state and correctly enforces access control.

## Phase 4 — Gemini Integration

- Implement the AI service abstraction.
- Create the blueprint prompt.
- Add structured output parsing.
- Add schema validation.
- Establish the canonical solution.
- Generate evidence from the locked blueprint.
- Add consistency and solvability checks.
- Add generation job tracking.
- Add retries and failure recovery.

**Exit criterion:** A valid prompt produces a playable, internally consistent case with a fixed answer key.

## Phase 5 — Multimedia

- Integrate the image provider.
- Implement media storage.
- Build image evidence viewers.
- Build messaging evidence.
- Build simulated CCTV playback.
- Add media validation and fallbacks.

**Exit criterion:** Supported evidence types render correctly, and missing assets do not break an investigation.

## Phase 6 — Testing and Hardening

- Run unit tests.
- Run API integration tests.
- Run end-to-end tests.
- Test solution secrecy.
- Test session isolation.
- Test failure recovery.
- Test responsive layouts.
- Verify environment and deployment configuration.

**Exit criterion:** All release-blocking tests pass, and the documented startup process works from a clean checkout.

## Phase 7 — Documentation and Handover

- Complete the README.
- Document environment setup.
- Document API endpoints.
- Document model configuration.
- Document media-provider configuration.
- Document test and build commands.
- Document known limitations.
- Confirm that a fresh developer can run the project.

**Exit criterion:** The application can be installed, configured, tested, and run using the repository documentation.

---

# 15. Testing Specification

## 15.1 Unit Tests

Test:

- Prompt validation.
- Difficulty validation.
- AI output schema validation.
- Suspect reference validation.
- Timeline consistency.
- Evidence relationships.
- Solution locking.
- Verdict evaluation.
- Response serializers.
- Session-token utilities.
- Authorization helpers.

## 15.2 Integration Tests

Test:

- Session creation.
- Case creation.
- Generation-job status.
- Case retrieval.
- Evidence retrieval.
- Bookmark persistence.
- Notes persistence.
- Accusation submission.
- Solution reveal.
- Session ownership enforcement.
- MongoDB persistence.
- AI provider failures.

Mock the AI provider for deterministic tests. Do not require paid Gemini calls for every test run.

## 15.3 End-to-End Tests

A complete test must verify that:

1. A user opens the application.
2. A user creates a mystery.
3. The application displays generation progress.
4. A playable case appears after successful generation.
5. The user opens a suspect profile.
6. The user inspects evidence.
7. The user bookmarks a clue and adds a note.
8. The user refreshes the browser.
9. The investigation state remains available.
10. The user submits an accusation.
11. The application evaluates the verdict.
12. The solution is revealed only after the permitted state transition.

## 15.4 Security Tests

Verify that:

- A user cannot retrieve another session's cases.
- A user cannot access another session's generation jobs.
- An invalid suspect ID cannot be submitted.
- A verdict cannot be changed after submission.
- The culprit is absent from public case responses.
- The culprit is absent from generation-job responses.
- The answer key does not appear in browser storage.
- Malformed AI output is rejected.
- Invalid media references are rejected.
- Rate limiting works.
- API errors do not reveal internal stack traces.

---

# 16. Acceptance Criteria

The application is ready for its first release only when all mandatory criteria below are satisfied.

| ID | Acceptance criterion |
|---|---|
| AC-01 | A user can submit a valid mystery premise. |
| AC-02 | Invalid prompts are rejected with useful feedback. |
| AC-03 | Gemini produces a structured case blueprint. |
| AC-04 | The canonical culprit is established before evidence generation completes. |
| AC-05 | The application validates all required suspects and evidence references. |
| AC-06 | A case becomes playable only after mandatory generation checks pass. |
| AC-07 | The case includes difficulty-appropriate suspects and evidence. |
| AC-08 | Evidence is linked to relevant suspects and timeline events. |
| AC-09 | Message, image, document, testimony, and simulated CCTV evidence render correctly when present. |
| AC-10 | Users can navigate the investigation without losing their progress. |
| AC-11 | Notes and bookmarks persist across refreshes. |
| AC-12 | The user can submit a valid accusation. |
| AC-13 | The backend evaluates the accusation against the fixed culprit. |
| AC-14 | The solution remains hidden until the permitted reveal state. |
| AC-15 | The solution explanation references real evidence IDs from the case. |
| AC-16 | API keys and private answer-key fields are never exposed to the frontend. |
| AC-17 | Session ownership and API authorization are enforced. |
| AC-18 | Failed AI generation does not create a falsely playable case. |
| AC-19 | The interface works on desktop and mobile. |
| AC-20 | Tests, environment examples, and startup documentation are included. |

---

# 17. Definition of Done

A feature is complete only when:

- It satisfies its functional requirements.
- It follows the approved architecture.
- Input and output validation are implemented.
- Loading, error, and empty states are handled.
- Authorization and privacy requirements are respected.
- Relevant tests are written and pass.
- No secrets or private solution fields leak to the client.
- The UI follows the design system.
- The relevant specification is updated if implementation decisions change.

A feature is not complete merely because its page renders or its button is clickable.

---

# 18. Codex Execution Rules

The following instructions are mandatory for all Codex implementation work.

1. Read `specs/SPEC.md` before making changes.
2. Treat this specification as the authoritative product and architecture reference.
3. Inspect the existing repository before creating, deleting, or replacing files.
4. If the repository already contains code, preserve working functionality unless a change is required by the specification.
5. Implement in phases and maintain a working application after each phase.
6. Do not replace real backend functionality with hard-coded frontend results.
7. Do not claim an AI operation succeeded unless the provider response and validation confirm success.
8. Do not expose the canonical culprit or answer key before an authorized reveal.
9. Do not silently introduce a new framework, database, or external service.
10. Keep configuration in environment variables and central configuration modules.
11. Write tests for critical business logic and security boundaries.
12. Run relevant tests and builds after each significant change.
13. Fix regressions before moving to the next phase.
14. Use maintainable components and avoid unnecessary duplication.
15. Keep the application responsive and accessible.
16. Document any implementation limitation that cannot yet be resolved.
17. Do not mark a feature complete when its acceptance criteria are unmet.
18. If a requirement is ambiguous, prefer the simplest secure implementation consistent with this specification. Record significant assumptions in the specification rather than inventing unrelated product features.
19. Do not add authentication providers, payment systems, analytics trackers, or other unrequested integrations.
20. At the end of each phase, report what was implemented, tests run, tests passed or failed, and remaining blockers.

## Specification Change Protocol

If an implementation decision requires changing a product requirement or architecture:

1. Identify the requirement affected.
2. Explain why the change is necessary.
3. Update the relevant specification file.
4. Keep implementation and specification aligned.
5. Add or update tests for the revised behavior.

Do not let the codebase silently diverge from the documented requirements.

---

# 19. Release Requirements

Before declaring Version 1 complete, verify the following:

- [ ] A clean installation succeeds.
- [ ] Environment variables are documented.
- [ ] MongoDB connects successfully.
- [ ] Gemini credentials are configured securely.
- [ ] A mystery can be generated end to end.
- [ ] Generated cases pass validation.
- [ ] Media assets use valid storage references.
- [ ] Investigation progress persists.
- [ ] Accusations are evaluated server-side.
- [ ] The answer key remains private until the correct state transition.
- [ ] All critical tests pass.
- [ ] Production builds complete successfully.
- [ ] Responsive layouts have been checked.
- [ ] README and specification files match the implementation.
- [ ] Known limitations are documented.

---

# 20. Final Product Principle

**AI creates the mystery. Evidence supports the truth. The user solves the case. The backend protects the answer.**

AI Mystery Room must be more than a prompt box connected to a chatbot. It must be a complete, persistent, interactive investigation experience in which each generated case is coherent, visually engaging, testable, and genuinely solvable.

This specification governs the initial Version 1 implementation. Future features must extend it deliberately rather than bypassing its architecture, data integrity, security, or acceptance criteria.
