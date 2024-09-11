import { render } from "@testing-library/react";

// Components
import ProductCardSkeleton from "..";

describe("ProductCarkSkeleton test cases", () => {
  const setup = () => render(<ProductCardSkeleton />);

  it("should render correctly", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
