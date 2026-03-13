import type { Movie } from "./Movie";

export type OmdbResponse = {
  Search: Movie[];
  Response: "True" | "False";
  Error?: string;
};
