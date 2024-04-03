import { createContext, useContext } from "react";
import { useLocalStorage } from "../lib/hooks";

type TBookmarkContextType = {
  bookmarkIds: number[];
  handleToggleBookmark: (id: number) => void;
};

const BookmarkContext = createContext<TBookmarkContextType | null>(null);
const BookmarkContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  const values = {
    bookmarkIds,
    handleToggleBookmark,
  };

  return (
    <BookmarkContext.Provider value={values}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContextProvider;

export const useBookmarkContext = () => {
  const bookmarkContext = useContext(BookmarkContext);

  if (!bookmarkContext) {
    throw new Error(
      "useBookmarkContext should be inside BookmarkContextProvider"
    );
  }

  return bookmarkContext;
};
