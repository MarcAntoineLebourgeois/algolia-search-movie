import { Movie } from "../types";
import { backEndHost } from "../data";
import { getHeaders } from "./getHeaders";

export const addMovie = (movie: Movie) =>
  fetch(`${backEndHost}api/v1/movies/add`, {
    method: "POST",
    mode: "cors",
    headers: getHeaders(),
    body: JSON.stringify(movie),
  });
