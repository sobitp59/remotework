import { useJobsContext } from "../contexts/JobsContextProvider";
import JobList from "./JobList";

const SearchJobList = () => {
  const { jobItemsSortedAndSliced, isLoading } = useJobsContext();
  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
};

export default SearchJobList;
