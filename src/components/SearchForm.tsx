import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useSearchTextContext } from "../contexts/SearchTextContextrovider";

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  return (
    <form action={"#"} onSubmit={(e) => e.preventDefault()} className="search">
      <button type="submit">
        <MagnifyingGlassIcon />
      </button>

      <input
        value={searchText}
        onChange={(e) => handleChangeSearchText(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
