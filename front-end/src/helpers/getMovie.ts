import { Movie } from "../types";
import { backEndHost } from "../data";

export const addMovie = (movie: Movie) =>
  fetch(`${backEndHost}api/v1/movies/add`, {
    method: "POST",
    body: JSON.stringify(movie),
  });
