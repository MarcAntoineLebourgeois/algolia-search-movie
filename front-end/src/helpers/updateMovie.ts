import { Movie } from "../types";
import { backEndHost } from "../data";
import { getHeaders } from "./getHeaders";

export const updateMovie = (movie: Movie): Promise<Response> =>
  fetch(`${backEndHost}api/v1/movies/update`, {
    method: "PUT",
    mode: "cors",
    headers: getHeaders(),
    body: JSON.stringify(movie),
  });
