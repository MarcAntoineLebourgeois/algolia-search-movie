import { FC } from "react";
import {
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
} from "react-instantsearch-dom";
import { Link } from "react-router-dom";
import { useSearchClient } from "../hooks";
import { CustomHit } from "./CustomHit";

export const SearchPage: FC = () => (
  <>
    <h1>Algolia Search Movie</h1>
    <Link to="/update_movie">
      <button>Go to update movie page</button>
    </Link>
    <InstantSearch
      searchClient={useSearchClient()}
      indexName="Algolia_search_movie"
    >
      <SearchBox />
      <Hits hitComponent={CustomHit} />
      <Pagination />
    </InstantSearch>
  </>
);
