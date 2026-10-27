const allowedEvidence = ['messages', 'image', 'cctv', 'document', 'testimony', 'forensics'];

export function validateBlueprint(b, difficulty) {
  if (!b || typeof b !== 'object') throw new Error('AI returned an invalid case structure.');
  if (!b.title || !b.summary || !Array.isArray(b.suspects) || !Array.isArray(b.evidence) || !Array.isArray(b.timeline) || !b.solution) throw new Error('AI case is missing required sections.');
  const suspectIds = new Set(b.suspects.map(s => s.id)); const evidenceIds = new Set(b.evidence.map(e => e.id)); const timelineIds = new Set(b.timeline.map(t => t.id));
  if (suspectIds.size !== b.suspects.length || evidenceIds.size !== b.evidence.length || timelineIds.size !== b.timeline.length) throw new Error('AI case contains duplicate reference IDs.');
  if (!suspectIds.has(b.solution.culpritSuspectId)) throw new Error('AI case references a missing culprit.');
  if (b.suspects.length < 3 || b.evidence.length < 5) throw new Error('AI case has too little playable content.');
  const requirements = { easy: { suspects: 3, evidence: 6 }, medium: { suspects: 4, evidence: 8 }, hard: { suspects: 5, evidence: 10 } }[difficulty];
  if (requirements && b.suspects.length !== requirements.suspects) throw new Error(`AI case must contain exactly ${requirements.suspects} suspects for ${difficulty} difficulty.`);
  if (requirements && b.evidence.length < requirements.evidence) throw new Error(`AI case needs at least ${requirements.evidence} evidence items for ${difficulty} difficulty.`);
  for (const s of b.suspects) if (!s.id || !s.name || !s.occupation || !s.background) throw new Error('AI case contains a malformed suspect.');
  for (const e of b.evidence) {
    if (!e.id || !e.title || !e.description || !allowedEvidence.includes(e.type)) throw new Error('AI case contains malformed evidence.');
    if ((e.associatedSuspects || []).some(id => !suspectIds.has(id))) throw new Error('Evidence references an unknown suspect.');
    if ((e.relatedEvidenceIds || []).some(id => !evidenceIds.has(id))) throw new Error('Evidence references an unknown clue.');
    if ((e.relatedTimelineEventIds || []).some(id => !timelineIds.has(id))) throw new Error('Evidence references an unknown timeline event.');
  }
  for (const t of b.timeline) if ((t.relatedSuspectIds || []).some(id => !suspectIds.has(id)) || (t.relatedEvidenceIds || []).some(id => !evidenceIds.has(id))) throw new Error('Timeline references an unknown case item.');
  const clues = b.evidence.filter(e => e.relevance === 'primary' && (e.associatedSuspects || []).includes(b.solution.culpritSuspectId));
  if (clues.length < 3) throw new Error('Case does not contain at least three primary clues linked to its culprit.');
  if ((difficulty === 'medium' || difficulty === 'hard') && !b.evidence.some(e => e.relevance === 'red_herring')) throw new Error('Medium and hard cases must include an explainable red herring.');
  return b;
}
