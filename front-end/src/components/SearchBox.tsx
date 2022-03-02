/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { SearchBoxProvided } from "react-instantsearch-core";

export const SearchBox: FC<SearchBoxProvided> = ({
  currentRefinement,
  isSearchStalled,
  refine,
}) => (
  <form noValidate action="" role="search">
    <input
      type="search"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
      css={css`
        width: 350px;
      `}
    />
    <button onClick={() => refine("")}>Reset query</button>
    {isSearchStalled ? "My search is stalled" : ""}
  </form>
);
