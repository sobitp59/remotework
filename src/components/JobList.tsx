import { TJobItem } from "../types";
import JobListItem from "./JobListItem";

type JobListProps = {
  jobItems: TJobItem[];
};
export function JobList({ jobItems }: JobListProps) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem: TJobItem) => (
        <JobListItem jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
