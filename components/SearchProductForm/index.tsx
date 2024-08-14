"use client";
import { ChangeEvent } from "react";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Components
import { SearchIcon } from "@/components/common/Icons";
import { useDebouncedCallback } from "use-debounce";

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
        inputWrapper:
          "max-w-[80%] sm:max-w-172 self-center bg-foreground-200 py-3.75 px-4 !rounded-1.25 border border-foreground-300 h-auto",
        input: "text-foreground-100 text-sm/7 h-auto",
      }}
      onChange={handleSearch}
    />
  );
};

export default SearchProductForm;
