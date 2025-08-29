"use client";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { TransitionStartFunction, useEffect, useState } from "react";
import { Card, CardContent } from "../Card";
import { Slider } from "../Slider";
import { CATEGORIES } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../Button";
import { useDebounce } from "use-debounce";

export type FilterSidebarProps = {
  isDisabled?: boolean;
  startFilterTransition?: TransitionStartFunction;
};

const FilterSidebar = ({
  startFilterTransition,
  isDisabled = false,
}: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const debouncedPriceRange = useDebounce(priceRange, 300);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set("price_gte", debouncedPriceRange[0][0].toString());
    params.set("price_lte", debouncedPriceRange[0][1].toString());

    startFilterTransition?.(() =>
      replace(`${pathname}?${params.toString()}`, { scroll: false }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceRange[0][0], debouncedPriceRange[0][1]]);

  const handleClickCategory = (value: string | null) => {
    if (searchParams.get("category_like") === value) return;

    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (value) {
      params.set("category_like", value);
    } else {
      params.delete("category_like");
    }

    startFilterTransition?.(() => replace(`${pathname}?${params.toString()}`));

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Card className="w-full bg-card border-border">
      <CardContent className="p-6 space-y-6">
        {/* Filter Header */}
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Filter</h2>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          {CATEGORIES.map(({ label, value }) => (
            <Button
              key={label}
              variant="ghost"
              fontWeight="semibold"
              className={`flex items-center justify-between w-full py-2 cursor-pointer hover:bg-accent/50 rounded-md px-2 -mx-2 transition-colors ${searchParams.get("category_like") === value ? "bg-accent/50 text-muted-foreground" : ""}`}
              onClick={() => handleClickCategory(value)}
              disabled={isDisabled}
            >
              <span className="text-foreground">{label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>
          ))}
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Price</h3>

          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
              disabled={isDisabled}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">${priceRange[0]}</span>
            <span className="text-muted-foreground">${priceRange[1]}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
