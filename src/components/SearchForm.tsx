import { IoSearch } from "react-icons/io5";

type SearchFormProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};
export default function SearchForm({
  searchText,
  setSearchText,
}: SearchFormProps) {
  return (
    <form action={"#"} onSubmit={(e) => e.preventDefault()} className="search">
      <button type="submit">
        <IoSearch />
      </button>

      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
