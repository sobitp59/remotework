import { FaSort } from "react-icons/fa6";
export default function SortingControls() {
  return (
    <section className="sorting">
      <FaSort />

      <button className="sorting__button sorting__button--relevant">
        Relevant
      </button>

      <button className="sorting__button sorting__button--recent">
        Recent
      </button>
    </section>
  );
}
