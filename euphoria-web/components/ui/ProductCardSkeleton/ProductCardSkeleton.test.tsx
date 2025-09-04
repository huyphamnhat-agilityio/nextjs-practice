import { render } from "@testing-library/react";
import ProductCardSkeleton from ".";

describe("ProductCardSkeleton components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<ProductCardSkeleton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
