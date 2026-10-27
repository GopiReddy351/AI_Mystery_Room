import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBlueprint } from '../src/services/ai/blueprint.validator.js';
import { publicCase } from '../src/serializers/public.js';

const validBlueprint = () => ({
  title: 'The Midnight Ledger', summary: 'A fictional ledger disappears from a private archive.', theme: 'theft',
  suspects: ['a', 'b', 'c'].map((id, i) => ({ id: `suspect_${id}`, name: `Suspect ${i + 1}`, occupation: 'Archivist', background: 'A fictional character.' })),
  solution: { culpritSuspectId: 'suspect_a', motive: 'A fictional motive', method: 'A fictional method', reconstruction: 'A fictional reconstruction' },
  evidence: [1, 2, 3, 4, 5].map(n => ({ id: `evidence_${n}`, type: 'document', title: `Record ${n}`, description: 'A fictional record.', associatedSuspects: n <= 3 ? ['suspect_a'] : ['suspect_b'], relatedEvidenceIds: [], relatedTimelineEventIds: [], relevance: n <= 3 ? 'primary' : 'supporting' })),
  timeline: [{ id: 'event_1', timestamp: '2026-10-01T20:00:00Z', description: 'An event occurs.', relatedSuspectIds: ['suspect_a'], relatedEvidenceIds: ['evidence_1'], certainty: 'confirmed' }],
});

test('accepts a complete case with one existing culprit and three linked primary clues', () => {
  const blueprint = validBlueprint();
  assert.equal(validateBlueprint(blueprint), blueprint);
});

test('rejects a culprit ID that does not identify a suspect', () => {
  const blueprint = validBlueprint(); blueprint.solution.culpritSuspectId = 'missing';
  assert.throws(() => validateBlueprint(blueprint), /missing culprit/);
});

test('rejects evidence that references an unknown suspect', () => {
  const blueprint = validBlueprint(); blueprint.evidence[0].associatedSuspects = ['missing'];
  assert.throws(() => validateBlueprint(blueprint), /unknown suspect/);
});

test('rejects cases without three primary clues tied to the culprit', () => {
  const blueprint = validBlueprint(); blueprint.evidence[2].associatedSuspects = ['suspect_b'];
  assert.throws(() => validateBlueprint(blueprint), /three primary clues/);
});

test('enforces difficulty-specific suspect counts', () => {
  assert.throws(() => validateBlueprint(validBlueprint(), 'medium'), /exactly 4 suspects/);
});

test('public case serialization never includes the answer key', () => {
  const record = { _id: 'case-id', title: 'A Mystery', summary: 'Public summary', theme: 'theft', difficulty: 'medium', status: 'playable', createdAt: new Date(), suspects: [{ id: 'a' }], evidence: [{ id: 'e' }], timeline: [], solution: { culpritSuspectId: 'a', motive: 'private' } };
  const dto = publicCase(record);
  assert.equal(Object.hasOwn(dto, 'solution'), false);
  assert.equal(JSON.stringify(dto).includes('culpritSuspectId'), false);
});
