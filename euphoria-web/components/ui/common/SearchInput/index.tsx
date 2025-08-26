"use client";
import { Search } from "lucide-react";
import { Input } from "../Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEvent } from "react";

export type SearchInputProps = {
  style: string | undefined;
};
const SearchInput = ({ style }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      if (value) {
        params.set("name_like", value);
      } else {
        params.delete("name_like");
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    500,
  );
  return (
    <div className={style}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 w-full"
        defaultValue={searchParams.get("name_like") ?? undefined}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
