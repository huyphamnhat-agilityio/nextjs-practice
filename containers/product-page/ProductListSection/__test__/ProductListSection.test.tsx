import { render, screen } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { act } from "react";

// Components
import ProductListSection from "..";

// Constants
import { DESTINATION, PRODUCT_MESSAGES } from "@/constants";

// Types
import { Pagination, Product } from "@/types";
import { MOCK_PRODUCTS } from "@/mocks";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
  useFormState: () => [{}, () => {}],
}));

describe("ProductListSection test cases", () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;
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

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUsePathname.mockReturnValue(DESTINATION.PRODUCT);
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  const setup = ({ products }: { products: Pagination<Product> }) =>
    render(<ProductListSection products={products} />);
  it("should render correctly", async () => {
    const { asFragment } = await act(() => setup({ products: mockProducts }));

    expect(asFragment()).toMatchSnapshot();
  });

  it("should be able to navigate to the next page", async () => {
    setup({ products: mockProducts });

    const paginationBtn = screen.getByRole("button", {
      name: /pagination item 2/i,
    });

    await userEvent.click(paginationBtn);

    expect(mockPush).toHaveBeenCalled();
  });
});
