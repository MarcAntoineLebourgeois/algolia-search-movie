import { Hit } from "react-instantsearch-core";

export type CustomHit = {
  hit: Hit & {
    title: string;
    image: string;
  };
};
