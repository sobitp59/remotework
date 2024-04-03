import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkContext } from "../contexts/BookmarkContextProvider";

type BookmarkIconProps = {
  id: number;
};
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkIds, handleToggleBookmark } = useBookmarkContext();

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        handleToggleBookmark(id);
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <BookmarkFilledIcon
        className={bookmarkIds.includes(id) ? "filled" : ""}
      />
    </button>
  );
}
