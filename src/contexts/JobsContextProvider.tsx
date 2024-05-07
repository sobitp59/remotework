import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useSearchQuery } from "../lib/hooks";
import { MAX_ITEMS_PER_PAGE } from "../lib/constants";
import { TSortBy, TPageDirection, TJobItem } from "../lib/types";
import { useSearchTextContext } from "./SearchTextContextrovider";

type TJobsContextType = {
  totalJobItems: number;
  sortBy: TSortBy;
  handleSortBy: (newSortBy: TSortBy) => void;
  jobItemsSortedAndSliced: TJobItem[];
  isLoading: boolean;
  handleChangePage: (direction: TPageDirection) => void;
  currentPage: number;
  totalPage: number;
};

const JobsContext = createContext<TJobsContextType | null>(null);
const JobsContextProvider = ({ children }: { children: React.ReactNode }) => {
  // dependent context
  const { debouncedSearchText } = useSearchTextContext();

  // states
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);

  // derived / computed states
  const totalJobItems = jobItems?.length || 0;
  const totalPage = totalJobItems / MAX_ITEMS_PER_PAGE;

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * MAX_ITEMS_PER_PAGE - MAX_ITEMS_PER_PAGE,
        currentPage * MAX_ITEMS_PER_PAGE
      ) || [],
    [currentPage, jobItemsSorted]
  );

  // handlers / actions
  const handleChangePage = useCallback((direction: TPageDirection) => {
    if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  }, []);

  const handleSortBy = useCallback((newSortBy: TSortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const values = useMemo(
    () => ({
      totalJobItems,
      sortBy,
      handleSortBy,
      jobItemsSortedAndSliced,
      isLoading,
      handleChangePage,
      currentPage,
      totalPage,
    }),
    [
      totalJobItems,
      sortBy,
      handleSortBy,
      jobItemsSortedAndSliced,
      isLoading,
      handleChangePage,
      currentPage,
      totalPage,
    ]
  );

  return <JobsContext.Provider value={values}>{children}</JobsContext.Provider>;
};

export default JobsContextProvider;

export const useJobsContext = () => {
  const jobsContext = useContext(JobsContext);

  if (!jobsContext) {
    throw new Error("useJobsContext should be inside JobsContextProvider");
  }

  return jobsContext;
};
