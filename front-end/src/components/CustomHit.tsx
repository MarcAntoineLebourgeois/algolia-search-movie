import { FC } from "react";
import { stringToArray } from "../helpers";
import { CustomHit as Hit } from "../types";

export const CustomHit: FC<Hit> = ({ hit }) => (
  <div>
    <button
      onClick={() =>
        fetch(`http://127.0.0.1:5000/api/v1/movies/delete/${hit.objectID}`, {
          method: "DELETE",
        })
      }
    >
      Click here to delete the movie
    </button>
    <div>
      <img src={hit.image} />
    </div>
    <div>
      <h3>ID: {hit.objectID}</h3>
      <h3>Title: {hit.title}</h3>
      <h4>Year: {hit.year}</h4>
      <div>
        <p>Genre:</p>
        {stringToArray(hit.genre).map((genre, key) => (
          <div key={key}>{genre}</div>
        ))}
      </div>
    </div>
  </div>
);
