/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { FC } from "react";
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
} from "react-instantsearch-dom";
import { Link } from "react-router-dom";
import { getSearchClient } from "../helpers";
import { CustomHit } from "../components";

export const SearchPage: FC = () => (
  <>
    <Typography
      variant="h3"
      css={css`
        margin-bottom: 10px;
      `}
    >
      Algolia Search Movie
    </Typography>
    <Link to="/add_movie" style={{ textDecoration: "none" }}>
      <Button
        variant={"contained"}
        css={css`
          margin-bottom: 10px;
        `}
      >
        Add a movie
      </Button>
    </Link>
    <InstantSearch
      searchClient={getSearchClient()}
      indexName="Algolia_search_movie"
    >
      <SearchBox
        autoFocus
        css={css`
          font-family: Roboto;
        `}
      />
      <Hits hitComponent={CustomHit} />
      <Pagination />
      <Configure hitsPerPage={4} />
    </InstantSearch>
  </>
);
