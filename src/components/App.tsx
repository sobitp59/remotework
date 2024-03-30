import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import { TJobItem } from "../types";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import PaginationControls from "./PaginationControls";
import JobList from "./JobList";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

function App() {
  const [searchText, setSearchText] = useState("");
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setJobItems(data?.jobItems);
      } catch (error) {
        console.log("Failed to fetch data [SEARCH FORM] ", error);
        throw new Error("Something went wrong!!");
      }
    };

    fetchData();
  }, [searchText]);

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
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItems} />
          <PaginationControls />
        </Sidebar>

        <JobItemContent />
      </Container>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default App;
