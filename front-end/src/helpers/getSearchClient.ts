import algoliasearch, { SearchClient } from "algoliasearch";
import { algoliaApiId, algoliaApiKey } from "../data";

export const getSearchClient = (): SearchClient =>
  algoliasearch(algoliaApiId, algoliaApiKey);
