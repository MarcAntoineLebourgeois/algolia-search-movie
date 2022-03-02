import algoliasearch from "algoliasearch";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { CustomSearchBox } from "./components";

const searchClient = algoliasearch(
  "RWCX86AE0B",
  "a504b6788be5ef2ba3cd3f08b12d860a"
);

const App = () => (
  <InstantSearch searchClient={searchClient} indexName="Algolia_search_movie">
    <CustomSearchBox />
    <Hits />
  </InstantSearch>
);

export default App;
