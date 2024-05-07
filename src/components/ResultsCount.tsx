import { useJobsContext } from "../contexts/JobsContextProvider";

export default function ResultsCount() {
  const { totalJobItems } = useJobsContext();
  return (
    <p className="count">
      <span className="u-bold">{totalJobItems}</span> results
    </p>
  );
}
