import { render } from "@testing-library/react";

// Components
import ProductListSkeleton from "..";

describe("ProductListSkeleton test cases", () => {
  const setup = () => render(<ProductListSkeleton />);

  it("should render correctly", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
