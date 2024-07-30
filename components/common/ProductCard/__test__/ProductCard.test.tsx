import { render } from "@testing-library/react";

// Components
import ProductCard from "..";

// Types
import { Product } from "@/types";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks/product";

describe("HeroCard test cases", () => {
  const setup = (props: Product) => render(<ProductCard {...props} />);

  it("should render correctly", () => {
    const { container } = setup(MOCK_PRODUCTS[0]);

    expect(container).toMatchSnapshot();
  });
});
