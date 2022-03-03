import { FC } from "react";
import { CustomHit as Hit } from "../types";

export const CustomHit: FC<Hit> = ({ hit }) => (
  <div className="hit">
    <div className="hit-image">
      <img src={hit.image} />
    </div>
    <div className="hit-content">
      <div className="hit-name">{hit.title}</div>
    </div>
  </div>
);
