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
  ratingMy: number| null;
  date: Date | null;
  plot: string;
  description: string;
}

export type FilmFormData = {
  id?: string | null;
  img: string | null;
  title: string | null;
  year: string | null;
  duration: string | null;
  tags: string | null;
  ratingOverall: string | null;
  director: string | null;
  tagline: string | null;
  imdb: string | null;
  poster: string | null;
  status: string | null;
  ratingMy: string | null;
  date: string | null;
  plot: string | null;
  description: string | null;
};