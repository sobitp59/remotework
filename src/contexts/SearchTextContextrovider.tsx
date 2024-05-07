import { createContext, useContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type TSearchTextContextType = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

const SearchTextContext = createContext<TSearchTextContextType | null>(null);
const SearchTextContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  const values = {
    searchText,
    debouncedSearchText,
    handleChangeSearchText,
  };

  return (
    <SearchTextContext.Provider value={values}>
      {children}
    </SearchTextContext.Provider>
  );
};

export default SearchTextContextProvider;

export const useSearchTextContext = () => {
  const searchTextContext = useContext(SearchTextContext);

  if (!searchTextContext) {
    throw new Error(
      "useSearchTextContext should be inside SearchTextContextProvider"
    );
  }

  return searchTextContext;
};
