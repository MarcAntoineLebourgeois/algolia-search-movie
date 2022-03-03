import { FC } from "react";
import { stringToArray } from "../helpers";
import { CustomHit as Hit } from "../types";

export const CustomHit: FC<Hit> = ({ hit }) => (
  <div>
    <div>
      <img src={hit.image} />
    </div>
    <div>
      <div>{hit.title}</div>
      <div>
        {stringToArray(hit.actors).map((actor, key) => (
          <div key={key}>{actor}</div>
        ))}
      </div>
    </div>
  </div>
);
