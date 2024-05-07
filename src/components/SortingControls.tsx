import { CaretSortIcon } from "@radix-ui/react-icons";
import { TSortBy } from "../lib/types";
import { useJobsContext } from "../contexts/JobsContextProvider";

export default function SortingControls() {
  const { sortBy, handleSortBy } = useJobsContext();
  return (
    <section className="sorting">
      <CaretSortIcon />
      <SortingButton
        onClick={() => handleSortBy("relevant")}
        sortBy={"relevant"}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => handleSortBy("recent")}
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
