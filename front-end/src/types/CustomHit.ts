import { Hit } from "react-instantsearch-core";

export type CustomHit = {
  hit: Hit & {
    title: string;
    alternative_titles: string;
    year: number;
    image: string;
    color: string;
    score: number;
    rating: number;
    actors: string;
    actor_facets: string;
    genre: string;
  };
};
