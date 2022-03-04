import { Button, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { Control, UseFormHandleSubmit, UseFormReset } from "react-hook-form";
import { Link } from "react-router-dom";
import { Movie } from "../types";
import { FormInputText } from "./FormInputText";

type FormProps = {
  handleSubmit: UseFormHandleSubmit<Movie>;
  reset: UseFormReset<Movie>;
  defaultValues: Movie;
  control: Control<Movie, any>; //eslint-disable-line
  onSubmit: (data: Movie) => Promise<void>;
  pageTitle: string;
};

export const Form: FC<FormProps> = ({
  defaultValues,
  handleSubmit,
  reset,
  control,
  onSubmit,
  pageTitle,
}) => (
  <Paper
    style={{
      display: "grid",
      gridRowGap: "20px",
      padding: "20px",
      margin: "10px 300px",
    }}
  >
    {pageTitle}
    <Link to="/">
      <Button variant="contained">Go back to search page</Button>
    </Link>
    <Typography>ObjectID: {defaultValues.objectID}</Typography>
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
    <FormInputText name="actor_facets" control={control} label="Actor Facets" />
    <FormInputText name="genre" control={control} label="Genre" />
    <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
      Submit
    </Button>
    <Button onClick={() => reset()} variant={"outlined"}>
      Reset
    </Button>
  </Paper>
);
