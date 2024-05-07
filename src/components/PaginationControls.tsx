import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TPageDirection } from "../lib/types";
import { useJobsContext } from "../contexts/JobsContextProvider";

export default function PaginationControls() {
  const { handleChangePage, currentPage, totalPage } = useJobsContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          onClick={() => handleChangePage("previous")}
          currentPage={currentPage}
        />
      )}

      {currentPage < totalPage && (
        <PaginationButton
          direction="next"
          onClick={() => handleChangePage("next")}
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: TPageDirection;
  onClick: () => void;
  currentPage: number;
};
const PaginationButton = ({
  direction,
  onClick,
  currentPage,
}: PaginationButtonProps) => {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        e.currentTarget.blur();
        onClick();
      }}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon /> page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          page {currentPage + 1} <ArrowRightIcon />{" "}
        </>
      )}
    </button>
  );
};
