import { useState, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (value?: string) => {
    const keyword = value ?? query;
    if (!keyword.trim()) return;
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
      keyword
    )}`;
  };

  return (
    <div
      className="
        w-full flex flex-col items-center
        mt-10
        gap-4 sm:gap-6
        px-8 
      "
    >
      {/* Search Input */}
      <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4 sm:h-5 sm:w-5" />

        <Input
          type="text"
          value={query}
          placeholder="Search Google or type a URL"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          className="
            pl-11 sm:pl-12 pr-4 
            h-11 sm:h-12 lg:h-14
            rounded-full 
            shadow-md             
            border border-gray-200
            text-sm sm:text-[15px] lg:text-[16px]
            bg-white
            w-full

            hover:shadow-lg       
            transition-all

            focus-visible:ring-0
            focus-visible:border-gray-300
          "
        />
      </div>

      {/* Buttons */}
      <div
        className="
          flex flex-wrap items-center justify-center
          gap-3
        "
      >
        <button
          onClick={() => handleSearch()}
          className="
            px-4 sm:px-6 py-2 my-4
            bg-gray-100 rounded 
            text-xs sm:text-sm text-gray-700 
            border border-gray-200
            hover:bg-gray-200 
            transition-shadow
            shadow-sm hover:shadow 
            outline-none
          "
        >
          Google Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
