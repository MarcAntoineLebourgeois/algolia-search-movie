import { FC } from "react";
import { useNavigate } from "react-router";
import { deleteMovie, stringToArray } from "../helpers";
import { CustomHit as Hit } from "../types";

export const CustomHit: FC<Hit> = ({ hit }) => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => deleteMovie(hit.objectID)}>
        Click here to delete the movie
      </button>
      <button
        onClick={() => navigate(`/update_movie?objectID=${hit.objectID}`)}
      >
        Click here to update the movie
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
};
