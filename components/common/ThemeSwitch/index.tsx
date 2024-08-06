"use client";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

// Components
import { DarkModeIcon, LightModeIcon } from "../Icons";

export type ThemeSwitchProps = {
  className?: string;
};
const ThemeSwitch = ({ className = "" }: ThemeSwitchProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const onChangeTheme = (isLightMode: boolean) => {
    setTheme(isLightMode ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      isSelected={theme === "light"}
      size="lg"
      color="primary"
      thumbIcon={({ isSelected }) =>
        isSelected ? <LightModeIcon /> : <DarkModeIcon />
      }
      className={className}
      classNames={{
        wrapper: "bg-foreground-100",
      }}
      onValueChange={onChangeTheme}
    >
      <span className="sr-only">switch theme button</span>
    </Switch>
  );
};

export default ThemeSwitch;
