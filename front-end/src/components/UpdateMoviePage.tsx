import { Button, Paper } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Movie } from "../types";
import { FormInputText } from "./FormInputText";

const defaultValues: Movie = {
  title: "",
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
  const methods = useForm<Movie>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, watch } = methods;
  const onSubmit = (data: Movie) => console.log(data);

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
      <FormInputText name="title" control={control} label="Title" />
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
