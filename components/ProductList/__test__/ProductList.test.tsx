import { render } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Utils
import { resolvedComponent } from "@/utils";

// Mocks
import { MOCK_PRODUCTS, mockFetch } from "@/mocks";

// Components
import ProductList from "..";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("ProductList test cases", () => {
  const mockReplace = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUsePathname.mockReturnValue("/");
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    window.fetch = mockFetch({ data: MOCK_PRODUCTS });

    const ProductListResolved = await resolvedComponent<{
      currentPage: number;
    }>(ProductList, {
      currentPage: 1,
    });

    const { asFragment } = render(<ProductListResolved />);

    expect(asFragment()).toMatchSnapshot();
  });
});
