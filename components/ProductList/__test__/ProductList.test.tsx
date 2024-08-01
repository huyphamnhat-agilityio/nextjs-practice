import { render } from "@testing-library/react";

// Components
import PopularCoursesSection from "..";

// Utils
import { resolvedComponent } from "@/utils";

// Mocks
import { MOCK_PRODUCTS, mockFetch } from "@/mocks";

// Components
import ProductList from "..";

describe("ProductList test cases", () => {
  it("should render correctly", async () => {
    window.fetch = mockFetch({ data: MOCK_PRODUCTS });

    const ProductListResolved = await resolvedComponent<{
      currentPage: number;
    }>(ProductList, {
      currentPage: 1,
    });

    const { container } = render(<ProductListResolved />);

    expect(container).toMatchSnapshot();
  });
});
