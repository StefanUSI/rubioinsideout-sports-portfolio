/**
 * Centralised skill ratings for every sport subpage.
 * Edit values here — every subpage reads from this single source.
 *
 * Each value is on a 1-5 scale (rendered as a 5-segment bar)
 * except Freediving which uses a 0-100 scale.
 */

export interface SportSkills {
  strength: number;
  endurance: number;
  technique: number;
  mentalGame: number;
}

const sportSkills: Record<string, SportSkills> = {
  calisthenics:   { strength: 5, endurance: 2, technique: 3, mentalGame: 3 },
  flowarts:       { strength: 1, endurance: 3, technique: 5, mentalGame: 4 },
  freediving:     { strength: 1, endurance: 5, technique: 5, mentalGame: 5 },
  highlining:     { strength: 3, endurance: 3, technique: 4, mentalGame: 5 },
  iceskating:     { strength: 2, endurance: 3, technique: 5, mentalGame: 2 },
  inlineskating:  { strength: 2, endurance: 5, technique: 4, mentalGame: 3 },
  mountaineering: { strength: 1, endurance: 5, technique: 3, mentalGame: 5 },
  pumpfoiling:    { strength: 1, endurance: 5, technique: 5, mentalGame: 3 },
  skiing:         { strength: 3, endurance: 5, technique: 5, mentalGame: 2 },
  snowboarding:   { strength: 3, endurance: 5, technique: 5, mentalGame: 4 },
  surfskating:    { strength: 1, endurance: 5, technique: 3, mentalGame: 3 },
  viaferrata:     { strength: 3, endurance: 3, technique: 2, mentalGame: 3 },
  weightlifting:  { strength: 5, endurance: 1, technique: 3, mentalGame: 3 },
};

export default sportSkills;
