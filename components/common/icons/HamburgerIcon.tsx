export const HamburgerIcon = ({ colorFill }: { colorFill?: string }) => (
  <svg
    width="36"
    height="34"
    viewBox="0 0 36 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="36"
      height="34"
      rx="4"
      fill={colorFill === "light" ? "white" : "black"}
    />
    <rect
      x="6"
      y="6"
      width="24"
      height="2"
      fill={colorFill === "light" ? "black" : "white"}
    />
    <rect
      x="6"
      y="16"
      width="24"
      height="2"
      fill={colorFill === "light" ? "black" : "white"}
    />
    <rect
      x="6"
      y="26"
      width="24"
      height="2"
      fill={colorFill === "light" ? "black" : "white"}
    />
  </svg>
);
