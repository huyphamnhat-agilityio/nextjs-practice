import { render } from "@testing-library/react";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks";

// Components
import ProductList from "..";

// Types
import { Pagination, Product } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DESTINATION } from "@/constants";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("ProductList test cases", () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUsePathname.mockReturnValue(DESTINATION.PRODUCT);
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  const setup = (props?: Pagination<Product>) =>
    render(<ProductList products={props} />);

  it("should render correctly", async () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with provided data", async () => {
    const mockProducts: Pagination<Product> = {
      data: MOCK_PRODUCTS,
      hasNextPage: true,
      hasPrevPage: false,
      limit: 3,
      page: 1,
      totalItems: MOCK_PRODUCTS.length,
      totalPages: 2,
      nextPage: 2,
      prevPage: null,
    };

    const { asFragment } = setup(mockProducts);

    expect(asFragment()).toMatchSnapshot();
  });
});
