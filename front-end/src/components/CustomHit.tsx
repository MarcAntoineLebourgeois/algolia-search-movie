import { FC } from "react";
import { stringToArray } from "../helpers";
import { CustomHit as Hit } from "../types";

export const CustomHit: FC<Hit> = ({ hit }) => (
  <div>
    <div>
      <img src={hit.image} />
    </div>
    <div>
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
