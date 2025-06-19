export type Film = {
  id: string;
  img: string;
  title: string;
  year: number;
  duration: string;
  tags: string[];
  ratingOverall: string;
  director: string;
  tagline: string;
  imdb: string;
  poster: string;
  status: "Plan to Watch" | "Dropped" | "On-Hold" | "Completed" | "Watching";
  ratingMy: 1 | 2 | 3 | 4 | 5 | null;
  date: Date | null;
  plot: string;
  description: string;
}