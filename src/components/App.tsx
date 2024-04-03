import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import PaginationControls from "./PaginationControls";
import JobList from "./JobList";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { MAX_ITEMS_PER_PAGE } from "../lib/constants";
import { TPageDirection, TSortBy } from "../lib/types";
function App() {
  // states
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");
  const debouncedSearchText = useDebounce(searchText, 300);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);

  // derived / computed states
  const totalJobItems = jobItems?.length || 0;
  const totalPage = totalJobItems / MAX_ITEMS_PER_PAGE;

  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });

  const jobItemsSortedAndSliced =
    jobItemsSorted.slice(
      currentPage * MAX_ITEMS_PER_PAGE - MAX_ITEMS_PER_PAGE,
      currentPage * MAX_ITEMS_PER_PAGE
    ) || [];

  // handlers / actions
  const handleChangePage = (direction: TPageDirection) => {
    if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSortBy = (newSortBy: TSortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <>
      {/* BACKGROUND */}
      <Background />

      {/* HEADER */}
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      {/* MAIN CONTAINER */}
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalJobItems={totalJobItems} />
            <SortingControls sortBy={sortBy} onClick={handleSortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
          <PaginationControls
            onClick={handleChangePage}
            currentPage={currentPage}
            totalPage={totalPage}
          />
        </Sidebar>

        <JobItemContent />
      </Container>

      {/* FOOTER */}
      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
