"use client";
import { Button, Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(isLightMode ? "light" : "dark");
  }, [isLightMode, setTheme]);

  return (
    <div className="bg-background">
      <h1 className="text-orange-550 font-bold">#ff6551</h1>
      <h1 className="text-gray-850 font-bold">#252B42</h1>
      <p className="text-gray-450">#737373</p>
      <p className="text-gray-250">#bdbdbd</p>
      <p className="text-dark-blue-400 font-bold">#2435A1</p>
      <Button
        className="text-white bg-orange-550 py-3.75 px-6.25 w-auto h-auto"
        onClick={() => setIsLightMode((prev) => !prev)}
      >
        Toggle
      </Button>

      <Button
        className="text-orange-550 border-orange-550 hover:!bg-orange-550/25 py-3.75 px-6.25 w-auto h-auto"
        variant="ghost"
      >
        Ghost
      </Button>

      <Button
        className="text-orange-550 border-orange-550 hover:!bg-orange-550/25 py-3.75 px-6.25 w-auto h-auto"
        variant="light"
      >
        Ghost
      </Button>

      <Button className="bg-orange-550 px-4.75 py-5.5 w-auto h-auto" isIconOnly>
        <Image src="/blackboards.svg" alt="blackboard icon" />
      </Button>

      <Button
        className="bg-dark-blue-400 px-4.75 py-5.5 w-auto h-auto"
        isIconOnly
      >
        <Image src="/blackboards.svg" alt="blackboard icon" />
      </Button>

      <Button className="bg-amber-350 px-4.75 py-5.5 w-auto h-auto" isIconOnly>
        <Image src="/blackboards.svg" alt="blackboard icon" />
      </Button>

      <Image src="/reddit.svg" alt="reddit icon" />
      <Image src="/facebook.svg" alt="facebook icon" />

      <Button
        className="bg-dark-blue-500 text-white w-auto min-w-0 h-auto p-1.25 gap-1.25"
        startContent={<Image src="/star.svg" alt="star icon" />}
      >
        4.9
      </Button>
    </div>
  );
}
