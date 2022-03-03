import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "./components";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      {/* <Route path="/add_movie" element={<About />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
