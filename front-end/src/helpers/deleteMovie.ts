import { backEndHost } from "../data";

export const deleteMovie = (objectID: string): Promise<Response> =>
  fetch(`${backEndHost}api/v1/movies/delete/${objectID}`, {
    method: "DELETE",
  });
