import { Input } from "./ui/input";
import { TbShoppingCartSearch } from "react-icons/tb";
import { FaListCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

export default function Search({
  setSearchValue,
  filterValue,
  setFilterValue,
}) {
  const [input, setInput] = useState("");
  useEffect(
    (delay = 500) => {
      const timeout = setTimeout(() => {
        setSearchValue(input);
      }, delay);

      return () => {
        clearTimeout(timeout);
      };
    },
    [input, setSearchValue]
  );

  const handleSearch = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="relative mb-3 flex items-center flex gap-2">
        <Input
          type="text"
          placeholder="Search..."
          className="px-10 text-xl"
          onChange={handleSearch}
        />
        <TbShoppingCartSearch className="text-2xl text-gray-500 absolute top-2 left-2" />

        <div>
          <Select
            value={filterValue}
            onValueChange={(v) => {
              setFilterValue(v);
            }}
          >
            <SelectTrigger
              className="p-3"
            >
              <FaListCheck className="p-1 text-2xl" />
            </SelectTrigger>

            <SelectContent
              className="bg-white"
              ref={(ref) => {
                if (!ref) return;
                ref.ontouchend = (e) => e.preventDefault();
              }}
            >
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
