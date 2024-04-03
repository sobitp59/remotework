import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TPageDirection } from "../lib/types";

type PaginationControlsProps = {
  onClick: (direction: TPageDirection) => void;
  currentPage: number;
  totalPage: number;
};
export default function PaginationControls({
  onClick,
  currentPage,
  totalPage,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          onClick={() => onClick("previous")}
          currentPage={currentPage}
        />
      )}

      {currentPage < totalPage && (
        <PaginationButton
          direction="next"
          onClick={() => onClick("next")}
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
