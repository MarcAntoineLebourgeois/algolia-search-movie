import { Hit } from "react-instantsearch-core";
import { Movie } from "./Movie";

export type CustomHit = {
  hit: Hit & Movie;
};
