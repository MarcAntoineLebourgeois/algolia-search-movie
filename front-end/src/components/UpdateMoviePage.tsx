import { Button, Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { Movie } from "../types";
import { FormInputText } from "./FormInputText";
import { v4 as uuidv4 } from "uuid";
import { addMovie, getMovie } from "../helpers";
import { useNavigate } from "react-router-dom";

const newMovieValues: Movie = {
  objectID: uuidv4(),
  title: "test",
  alternative_titles: "",
  year: 0,
  image: "",
  color: "",
  score: 0,
  rating: 0,
  actors: "",
  actor_facets: "",
  genre: "",
};

export const UpdateMoviePage: FC = () => {
  const [searchParams] = useSearchParams();
  const [defaultMovie, setDefaultMovie] = useState(newMovieValues);
  const methods = useForm<Movie>({ defaultValues: defaultMovie });
  const { handleSubmit, reset, control, setValue } = methods;
  const navigate = useNavigate();
  console.log("defaultMovie", defaultMovie);

  useEffect(() => {
    const movieToUpdateId = searchParams.get("objectID");
    if (movieToUpdateId)
      getMovie(movieToUpdateId).then((movie) => setDefaultMovie(movie));
  }, []);

  useEffect(() => {
    if (defaultMovie) {
      setValue("objectID", defaultMovie.objectID);
      setValue("title", defaultMovie.title);
      setValue("alternative_titles", defaultMovie.alternative_titles);
      setValue("year", defaultMovie.year);
      setValue("image", defaultMovie.image);
      setValue("color", defaultMovie.color);
      setValue("score", defaultMovie.score);
      setValue("rating", defaultMovie.rating);
      setValue("actors", defaultMovie.actors);
      setValue("actor_facets", defaultMovie.actor_facets);
      setValue("genre", defaultMovie.genre);
    }
  }, [defaultMovie]);

  const onSubmit = (data: Movie) => {
    addMovie(data);
    console.log("data", data);
    navigate("/");
  };

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 300px",
      }}
    >
      UpdateMoviePage
      <Link to="/">
        <Button variant="contained">Go back to search page</Button>
      </Link>
      <Typography>ObjectID: {defaultMovie.objectID}</Typography>
      <FormInputText
        name="title"
        control={control}
        label="Title"
        value={defaultMovie.title}
      />
      <FormInputText
        name="alternative_titles"
        control={control}
        label="Alternative Titles"
      />
      <FormInputText name="year" control={control} label="Year" />
      <FormInputText name="image" control={control} label="Image" />
      <FormInputText name="color" control={control} label="Color" />
      <FormInputText name="score" control={control} label="Score" />
      <FormInputText name="rating" control={control} label="Rating" />
      <FormInputText name="actors" control={control} label="Actors" />
      <FormInputText
        name="actor_facets"
        control={control}
        label="Actor Facets"
      />
      <FormInputText name="genre" control={control} label="Genre" />
      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>
    </Paper>
  );
};
