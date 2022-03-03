import algoliasearch, { SearchClient } from "algoliasearch";

export const useSearchClient = (): SearchClient =>
  algoliasearch("RWCX86AE0B", "a504b6788be5ef2ba3cd3f08b12d860a");
