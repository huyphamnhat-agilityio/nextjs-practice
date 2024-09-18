import { render } from "@testing-library/react";
import RelatedProductsSection from "..";

// Types
import { Pagination, Product } from "@/types";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks";

// Services
import { getProducts } from "@/lib";

// Utils
import { resolvedComponent } from "@/utils";

jest.mock("../../../../lib/product.ts", () => ({
  getProducts: jest.fn(),
}));

describe("RelatedProductsSection test cases", () => {
  const mockProps = {
    id: "1",
  };

  const mockProducts: Pagination<Product> = {
    data: MOCK_PRODUCTS,
    page: 1,
    limit: 6,
    totalPages: 1,
    totalItems: 6,
    hasNextPage: false,
    hasPrevPage: false,
    prevPage: null,
    nextPage: null,
  };

  const mockGetProducts = getProducts as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = async (props: { id: string }) => {
    const ResolvedRelatedProductsSection = await resolvedComponent(
      RelatedProductsSection,
      props,
    );

    return render(<ResolvedRelatedProductsSection />);
  };

  it("should render correctly", async () => {
    mockGetProducts.mockResolvedValueOnce(mockProducts);

    const { asFragment } = await setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly when id is not included in the product list", async () => {
    mockGetProducts.mockResolvedValueOnce(mockProducts);

    const { asFragment } = await setup({ id: "0" });

    expect(asFragment()).toMatchSnapshot();
  });
});
