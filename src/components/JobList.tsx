import { useActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { TJobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: TJobItem[];
  isLoading: boolean;
};
export function JobList({ jobItems, isLoading }: JobListProps) {
  const { activeId } = useActiveIdContext();
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem: TJobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={activeId === jobItem.id}
          />
        ))}
    </ul>
  );
}

export default JobList;
