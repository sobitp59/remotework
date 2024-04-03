import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type SearchFormProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  // setSearchText: (searchText: string) => void;
};
export default function SearchForm({
  searchText,
  setSearchText,
}: SearchFormProps) {
  return (
    <form action={"#"} onSubmit={(e) => e.preventDefault()} className="search">
      <button type="submit">
        <MagnifyingGlassIcon />
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
