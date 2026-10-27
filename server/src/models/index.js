import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const SuspectSchema = new Schema({
  id: { type: String, required: true }, name: { type: String, required: true }, age: Number,
  occupation: String, background: String, relationshipToIncident: String,
  publicMotive: String, publicAlibi: String,
}, { _id: false });
const EvidenceSchema = new Schema({
  id: { type: String, required: true }, type: { type: String, enum: ['messages', 'image', 'cctv', 'document', 'testimony', 'forensics', 'timeline'], required: true },
  title: { type: String, required: true }, description: { type: String, required: true }, discoveredAt: Date,
  associatedSuspects: [String], relatedEvidenceIds: [String], relatedTimelineEventIds: [String], relevance: String, content: Schema.Types.Mixed,
}, { _id: false });
const TimelineSchema = new Schema({ id: String, timestamp: Date, description: String, relatedSuspectIds: [String], relatedEvidenceIds: [String], certainty: String }, { _id: false });
const CaseSchema = new Schema({
  title: { type: String, required: true }, premise: { type: String, required: true }, summary: { type: String, required: true }, theme: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true }, status: { type: String, enum: ['generating', 'playable', 'failed', 'archived'], default: 'generating' },
  ownerHash: { type: String, required: true, index: true }, suspects: [SuspectSchema], evidence: [EvidenceSchema], timeline: [TimelineSchema],
  solution: { culpritSuspectId: String, motive: String, method: String, reconstruction: String, explanation: String },
  generationJobId: String, createdAt: { type: Date, default: Date.now }, updatedAt: { type: Date, default: Date.now },
});
CaseSchema.index({ ownerHash: 1, createdAt: -1 });
const SessionSchema = new Schema({ tokenHash: { type: String, required: true, unique: true, index: true }, expiresAt: { type: Date, required: true, index: { expires: 0 } } });
const JobSchema = new Schema({
  caseId: { type: Schema.Types.ObjectId, required: true, index: true }, ownerHash: { type: String, required: true, index: true }, status: { type: String, default: 'queued' }, stage: { type: String, default: 'Queued' }, progress: { type: Number, default: 0 }, errorCode: String, errorMessage: String,
  createdAt: { type: Date, default: Date.now }, updatedAt: { type: Date, default: Date.now },
});
JobSchema.index({ ownerHash: 1, createdAt: -1 });
const InvestigationSchema = new Schema({
  caseId: { type: Schema.Types.ObjectId, required: true, index: true }, ownerHash: { type: String, required: true }, status: { type: String, default: 'active' },
  discoveredEvidenceIds: [String], bookmarkedEvidenceIds: [String], notes: [{ content: String, relatedEvidenceId: String, updatedAt: { type: Date, default: Date.now } }],
  verdict: { suspectId: String, reasoning: String, correct: Boolean, submittedAt: Date },
}, { timestamps: true });
InvestigationSchema.index({ caseId: 1, ownerHash: 1 }, { unique: true });
export const Case = model('Case', CaseSchema);
export const Session = model('Session', SessionSchema);
export const GenerationJob = model('GenerationJob', JobSchema);
export const Investigation = model('Investigation', InvestigationSchema);
