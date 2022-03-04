import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Movie } from "../types";
import { getMovie, updateMovie } from "../helpers";
import { useNavigate } from "react-router-dom";
import { Form } from "./Form";
import { Loader } from "./Loader";

export const UpdateMoviePage: FC = () => {
  const [searchParams] = useSearchParams();
  const [defaultMovie, setDefaultMovie] = useState<Movie>();
  const { handleSubmit, control, setValue } = useForm<Movie>({
    defaultValues: defaultMovie,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data: Movie) => {
    setLoading(true);
    await updateMovie(data);
    setLoading(false);
    navigate("/");
  };

  if (!defaultMovie) return null;
  if (loading) return <Loader />;
  return (
    <Form
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      defaultValues={defaultMovie}
      pageTitle={"Update Movie Page"}
    />
  );
};
