export type MovieFilter = 'popular' | 'favorites';

export interface Movie {
  favorite?: boolean;
  popularity: number;
  id: number;
  video: boolean;
  vote_count: number;
  vote_average: number;
  imdb_id: string;
  title: string;
  release_date: number;
  original_language: string;
  original_title: string;
  genres: Array<any>;
  backdrop_path: string;
  adult: boolean;
  overview: string;
  poster_path: string;
  production_companies: Array<any>;
  revenue: number;
}

