"use client";
import { Button } from "@/components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(isLightMode ? "light" : "dark");
  }, [isLightMode, setTheme]);
  return (
    <div>
      <Button color="primary" variant="ghost" className="text-primary">
        XS
      </Button>
      <Button color="primary" size="sm" className="text-white">
        SM
      </Button>
      <Button color="primary" size="md" className="text-white">
        MD
      </Button>
      <Button color="primary" size="lg" className="text-white">
        LG
      </Button>
      <p className="text-foreground font-bold">TEXT</p>
      <p className="text-foreground-100 font-bold">TEXT</p>
      <p className="text-primary">TEXT</p>
      <Button
        className="text-white"
        onClick={() => setIsLightMode((prev) => !prev)}
        color="olive"
      >
        Toggle
      </Button>
    </div>
  );
}
