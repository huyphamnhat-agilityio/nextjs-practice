import { render } from "@testing-library/react";

// Components
import ProductCardSkeleton from "..";

// Types
import { Product } from "@/types";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks/product";

describe("ProductCarkSkeleton test cases", () => {
  const setup = (props: Product) => render(<ProductCardSkeleton {...props} />);

  it("should render correctly", () => {
    const { asFragment } = setup(MOCK_PRODUCTS[0]);

    expect(asFragment()).toMatchSnapshot();
  });
});
