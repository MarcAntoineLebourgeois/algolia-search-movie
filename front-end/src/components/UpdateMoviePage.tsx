import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const UpdateMoviePage: FC = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  console.log("data", data);
  return (
    <div>
      UpdateMoviePage
      <Link to="/">
        <button>Go back to search page</button>
      </Link>
      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
        <div>
          <input {...register("title")} placeholder="Title" />
        </div>
        <div>
          <input {...register("genre")} placeholder="Genre" />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};
