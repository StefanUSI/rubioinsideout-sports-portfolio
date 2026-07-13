/**
 * YouTube video catalogue — single source of truth for every embedded clip.
 *
 * Consumed by:
 *  - VideoSection (home page "Latest Captures" gallery with sport filters)
 *  - SportVideos  (per-sport video grid on each sport subpage)
 *
 * `sport` must match a label from SPORT_REGISTRY (or "Handstand"/"Flowarts")
 * so the filter buttons and per-sport grids stay in sync.
 */
export interface Video {
  id: string;
  title: string;
  sport: string;
}

export const VIDEOS: Video[] = [
  // Inline Skating
  { id: "FZjy_3PxkG4", title: "Exploring Doha on Skates - Qatar", sport: "Inline Skating" },
  { id: "pbY7nDUW_6w", title: "Exploring Singapur on Skates - Singapur", sport: "Inline Skating" },
  { id: "gItu7QfnggU", title: "Exploring Melaka on Skates - Malaysia", sport: "Inline Skating" },
  { id: "v_oiOJZHDNQ", title: "Exploring Kuala Lumpur on Skates - Malaysia", sport: "Inline Skating" },
  { id: "dxvLQr2vyeg", title: "Exploring Bordeaux on Skates", sport: "Inline Skating" },
  { id: "aakhFoCIGvg", title: "Skating along Southwest Coast of France - From Hossegor to St. Jean-de-Luz", sport: "Inline Skating" },
  { id: "DRMCF_S1HmU", title: "Exploring Bergamo on Skates | 4K", sport: "Inline Skating" },
  { id: "ULfHTEnkjrs", title: "Exploring Paris on Skates | 4K", sport: "Inline Skating" },
  { id: "wG2Ac6vs40I", title: "This is Zürich's Skating Community - Monday Night Skating May 2024", sport: "Inline Skating" },
  { id: "JbfrcYkXkMY", title: "Skating in Lima with The Rasta", sport: "Inline Skating" },
  { id: "vIdG4OqSfKY", title: "Parking Lot Flow Skating | 4K", sport: "Inline Skating" },
  { id: "jbyKtB_6jOo", title: "City Skating - Exploring Munich on Skates | 4K", sport: "Inline Skating" },

  // Ice Skating
  { id: "6XpUlI72w8c", title: "5min of Stops - Freestyle Ice Skating 2022 - Season 3", sport: "Ice Skating" },

  // Highlining
  { id: "AuSZ-_3crRs", title: "My First Time Highlining - Calmly Immersed 60m above the Ground", sport: "Highlining" },
  { id: "W7AYx-GyIGw", title: "First Steps", sport: "Highlining" },

  // Pumpfoiling
  { id: "kcrhEAEuPI4", title: "Pumpfoiling underneath Firework", sport: "Pumpfoiling" },
  { id: "cvwtXT_iPO8", title: "Pumpfoiling underneath Firework", sport: "Pumpfoiling" },
  { id: "wG3IQ8iJhVk", title: "Pumpfoiling underneath Firework", sport: "Pumpfoiling" },

  // Freediving
  { id: "SZ0duemTp7U", title: "Freediving to 30m Depth, Free Immersion (FIM) - Nusa Penida, Indonesia", sport: "Freediving" },
  { id: "tyJjEx03AiU", title: "Freediving to 25m Depth & Manta Rays, Constant Weight (CWT) - Nusa Penida, Indonesia", sport: "Freediving" },

  // Surfskating
  { id: "ilzIMJUqgRI", title: "Brand-new Pumptrack in Angresse, France", sport: "Surfskating" },
  { id: "cvgANnx2lMc", title: "Surfskating at Night | 4K", sport: "Surfskating" },
  { id: "5XE8c0CHq-E", title: "I fell in Love with Surfskating | 4K", sport: "Surfskating" },
  { id: "Yy8EwtJVPYE", title: "Surfing on Asphalt - Skateboarding on the Pumptrack Niederrohrdorf | 4K", sport: "Surfskating" },

  // Snowboarding
  { id: "SI6WyZFoEZM", title: "Style Upgrade", sport: "Snowboarding" },
  { id: "Y843FCZmdEY", title: "Carving Steeps", sport: "Snowboarding" },

  // Skiing
  { id: "ruAExoSBvoo", title: "Quick Edge Changes", sport: "Skiing" },
  { id: "YxhJuKlPy2Y", title: "Switch Skiing the Cat Track | 4K", sport: "Skiing" },
  { id: "r19eVKH3gv0", title: "Switch Skiing in the Swiss Alps 2024 | 4K", sport: "Skiing" },
  { id: "QusD2udTo8k", title: "Carving in the Swiss Alps 2023 - Skiing Season 3", sport: "Skiing" },

  // Mountaineering
  { id: "jnwwgVXkw80", title: "Huayna Potosi (6088m) - Mountaineering in Bolivia above the Clouds", sport: "Mountaineering" },
  { id: "2ARznPKK0SU", title: "Illimani (6438m) - Mountaineering on Bolivia's 2nd Highest Peak", sport: "Mountaineering" },

  // Calisthenics
  { id: "45-WATrN-mo", title: "1 to 5 reps of elevated Handstand Push Ups", sport: "Calisthenics" },
  { id: "aybGFeGpfOw", title: "Tiger Bend Progression", sport: "Calisthenics" },
  { id: "pYUWNhtTO60", title: "Slow NON FALSE GRIP Muscle Up (Summer 2017)", sport: "Calisthenics" },
  { id: "2IkEYdyL_mE", title: "5 Handstand Push Ups (wide grip)", sport: "Calisthenics" },
  { id: "wAU6k-t-PEI", title: "Bottle Slow Muscle Up - Bottle Muscle Up Challenge (Straight Bar)", sport: "Calisthenics" },
  { id: "NzveuJT8mFQ", title: "60sec Handstand Hold", sport: "Calisthenics" },
  { id: "vdZtj3PXWWY", title: "Raw", sport: "Calisthenics" },
  { id: "IeA6L1tiOoE", title: "V-Sit (on pbars & on floor)", sport: "Calisthenics" },
  { id: "_OzXkJszPKk", title: "Tucked Back Lever Pull Ups (Close Grip)", sport: "Calisthenics" },
  { id: "-nJTs8TybyE", title: "Front Support Hold - Variations - on Wall Bars / Stall Bar / Swedish Bars", sport: "Calisthenics" },
  { id: "-5u1cvtZOKQ", title: "Back Support Hold - Variations - on Wall Bars / Stall Bar / Swedish Bars", sport: "Calisthenics" },
  { id: "-mIeRL8LiJY", title: "40kg x 5 Weighted Ring Dips & 10kg Ring Muscle Up", sport: "Calisthenics" },
  { id: "kseipQw2Thw", title: "Shoulder Flag", sport: "Calisthenics" },
  { id: "Vd0AnRsmyX0", title: "Full Back Lever", sport: "Calisthenics" },
  { id: "rxhV44mu_JQ", title: "Ring Muscle Up (Slow & L-Sit Attempt)", sport: "Calisthenics" },
  { id: "BOJWvaHvUyE", title: "12 Clean Muscle Ups - Muscle Up Training III", sport: "Calisthenics" },
  { id: "qnCNv-ibzSQ", title: "Weighted Pull Ups +40kg @66kg", sport: "Calisthenics" },
  { id: "ww2zvqFJllU", title: "50 Push Up Challenge", sport: "Calisthenics" },

  // Weightlifting
  { id: "RpoC38e2j10", title: "Bench 100kg x 5 & 110kg x 1 @72.5kg BW", sport: "Weightlifting" },
  { id: "gpSwlQ0MeuU", title: "160kg Deadlift @72kg - Underground Deadlift Edition", sport: "Weightlifting" },

  // Flowarts
  { id: "z40nGpmJbpM", title: "Juggling & Slacklining & Sunsetting", sport: "Flowarts" },
];
