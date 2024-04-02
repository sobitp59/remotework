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
function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  const { jobItems, isLoading } = useJobItems(debouncedSearchText);

  const totalJobItems = jobItems?.length || 0;
  const jobItemsSliced = jobItems?.slice(0, 9) || [];

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
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls />
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
