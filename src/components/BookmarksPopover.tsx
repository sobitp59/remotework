import { forwardRef } from "react";
import { useBookmarkContext } from "../contexts/BookmarkContextProvider";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarkContext();
  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>,
    document.body
  );
});

export default BookmarksPopover;
