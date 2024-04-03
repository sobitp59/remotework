import { CaretSortIcon } from "@radix-ui/react-icons";
import { TSortBy } from "../lib/types";

type SortingControlsProps = {
  sortBy: TSortBy;
  onClick: (newSortBy: TSortBy) => void;
};
export default function SortingControls({
  sortBy,
  onClick,
}: SortingControlsProps) {
  return (
    <section className="sorting">
      <CaretSortIcon />
      <SortingButton
        onClick={() => onClick("relevant")}
        sortBy={"relevant"}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => onClick("recent")}
        sortBy={"recent"}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  sortBy: TSortBy;
  isActive: boolean;
};
const SortingButton = ({
  children,
  onClick,
  sortBy,
  isActive,
}: SortingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--${sortBy} ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {children}
    </button>
  );
};
