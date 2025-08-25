"use client";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "../Card";
import { Slider } from "../Slider";
const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([70, 600]);

  const categories = [
    "All",
    "Tops",
    "Printed T-shirts",
    "Plain T-shirts",
    "Kurti",
    "Boxers",
    "Full sleeve T-shirts",
    "Joggers",
    "Pyjamas",
    "Jeans",
  ];

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
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center justify-between py-2 cursor-pointer hover:bg-accent/50 rounded-md px-2 -mx-2 transition-colors"
            >
              <span className="text-foreground">{category}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Price</h3>

          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={600}
              min={0}
              step={10}
              className="w-full"
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
