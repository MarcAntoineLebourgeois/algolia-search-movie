/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { Highlight } from "react-instantsearch-dom";
import { useNavigate } from "react-router";
import { deleteMovie } from "../helpers";
import { CustomHit as Hit } from "../types";

export const CustomHit: FC<Hit> = ({ hit }) => {
  const navigate = useNavigate();
  const image = new Image();
  image.src = hit.image;

  return (
    <Paper
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px;
        width: 100%;
        max-width: 500px;
      `}
    >
      {image.complete && <img src={hit.image} alt={hit.title} />}
      <div>
        <Typography variant="caption">objectID: {hit.objectID}</Typography>
        <Typography variant="h6">
          Title: <Highlight attribute="title" hit={hit} />
        </Typography>
        <Typography variant="body1">Year: {hit.year}</Typography>
        {hit.genre !== "" && (
          <Typography variant="body1">
            Genre: {hit.genre.replaceAll("'", "")}
          </Typography>
        )}
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <Button onClick={() => deleteMovie(hit.objectID)} variant="outlined">
            Delete the movie
          </Button>
          <Button
            onClick={() => navigate(`/update_movie?objectID=${hit.objectID}`)}
            variant="outlined"
          >
            Update the movie
          </Button>
        </div>
      </div>
    </Paper>
  );
};
