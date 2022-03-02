import { connectSearchBox } from "react-instantsearch-dom";
import { SearchBox } from "./SearchBox";

export const CustomSearchBox = connectSearchBox(SearchBox);
