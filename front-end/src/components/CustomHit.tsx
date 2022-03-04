/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Highlight } from "react-instantsearch-dom";
import { useNavigate } from "react-router";
import { deleteMovie } from "../helpers";
import { CustomHit as Hit } from "../types";
import { Loader } from "./Loader";

export const CustomHit: FC<Hit> = ({ hit }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const image = new Image();
  image.src = hit.image;

  if (loading) return <Loader />;
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
          <Typography
            variant="body1"
            css={css`
              margin-bottom: 10px;
            `}
          >
            Genre: {hit.genre.replaceAll("'", "")}
          </Typography>
        )}
        <div
          css={css`
            display: flex;
            flex-direction: row;
            margin-bottom: 20px;
          `}
        >
          <Button
            onClick={async () => {
              setLoading(true);
              await deleteMovie(hit.objectID);
              window.location.reload();
            }}
            variant="outlined"
          >
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
