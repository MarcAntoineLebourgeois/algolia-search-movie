import { Movie } from "../types";
import { backEndHost } from "../data";

export const getMovie = (movieId: Movie["objectID"]): Promise<Movie> =>
  fetch(`${backEndHost}api/v1/movies/${movieId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
