import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Movie } from "../types";
import { v4 as uuidv4 } from "uuid";
import { addMovie } from "../helpers";
import { useNavigate } from "react-router-dom";
import { Form, Loader } from "../components";

const newMovieValues: Movie = {
  objectID: uuidv4(),
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

export const AddMoviePage: FC = () => {
  const { handleSubmit, reset, control } = useForm<Movie>({
    defaultValues: newMovieValues,
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: Movie) => {
    setLoading(true);
    await addMovie(data);
    setLoading(false);
    navigate("/");
  };

  if (loading) return <Loader />;
  return (
    <Form
      control={control}
      handleSubmit={handleSubmit}
      reset={reset}
      onSubmit={onSubmit}
      defaultValues={newMovieValues}
      pageTitle={"Add Movie Page"}
    />
  );
};
