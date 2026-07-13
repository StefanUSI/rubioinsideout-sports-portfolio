export interface LocalVideo {
  id: string; // unique slug (without extension)
  title: string;
  description: string;
  sport: string;
  source: string; // public URL path to the .mp4
  poster: string; // preview image for video player
  uploadDate: string; // ISO 8601
  duration: string; // ISO 8601 duration
}

export const LOCAL_VIDEOS: LocalVideo[] = [
  {
    id: "1snowboard",
    title: "Snowboarding Run: 1 Snowboard",
    description: "Epic snowboard run with technical carving and powder lines.",
    sport: "Snowboarding",
    source: "/videos/hero/snowboarding/hero_snowboarding.mp4",
    poster: "/images/hero/snowboarding/hero_snowboard.jpg",
    uploadDate: "2024-01-01T00:00:00Z",
    duration: "PT1M30S",
  },
  {
    id: "home_snowboarding",
    title: "Home Hero Snowboarding Loop",
    description: "Looping snowboarding hero clip used in the home page carousel.",
    sport: "Snowboarding",
    source: "/videos/hero/home/home_snowboarding.mp4",
    poster: "/images/hero/snowboarding/hero_snowboard.jpg",
    uploadDate: "2024-01-01T00:00:00Z",
    duration: "PT0M15S",
  },
  // Add additional hero videos here as needed for indexing.
];

export function getLocalVideoById(id: string) {
  const normalized = id.replace(/\.mp4$/i, "");
  return LOCAL_VIDEOS.find((video) => video.id === normalized);
}
