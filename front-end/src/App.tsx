import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddMoviePage, SearchPage, UpdateMoviePage } from "./components";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/update_movie" element={<UpdateMoviePage />} />
      <Route path="/add_movie" element={<AddMoviePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
