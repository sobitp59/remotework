import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import PaginationControls from "./PaginationControls";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { Toaster } from "react-hot-toast";
import SearchJobList from "./SearchJobList";
function App() {
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
        <SearchForm />
      </Header>

      {/* MAIN CONTAINER */}
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <SearchJobList />

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
