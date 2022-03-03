import algoliasearch from "algoliasearch";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch-dom";
import { CustomHit } from "./components";

const searchClient = algoliasearch(
  "RWCX86AE0B",
  "a504b6788be5ef2ba3cd3f08b12d860a"
);

const App = () => (
  <InstantSearch searchClient={searchClient} indexName="Algolia_search_movie">
    <SearchBox />
    <>
      <Hits hitComponent={CustomHit} />
    </>
  </InstantSearch>
);

export default App;
