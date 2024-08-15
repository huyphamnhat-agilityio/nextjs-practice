"use client";
import { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// Components
import { SearchIcon } from "@/components/common/Icons";
import { Input } from "../common";

const SearchProductForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      if (value) {
        params.set("query", value);
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    500,
  );
  return (
    <Input
      placeholder="Search courses..."
      startContent={<SearchIcon />}
      classNames={{
        inputWrapper: "max-w-full self-center py-3.75 px-4 ",
      }}
      onChange={handleSearch}
    />
  );
};

export default SearchProductForm;
