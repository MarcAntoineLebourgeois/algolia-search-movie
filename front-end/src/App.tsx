import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage, UpdateMoviePage } from "./components";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/update_movie" element={<UpdateMoviePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
