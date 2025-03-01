import { render, screen, waitFor } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";

// Components
import ProductCard from "..";

// Types
import { Product } from "@/types";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks/product";

// Services
import { deleteProduct, fetchApi, markProduct, mutateProduct } from "@/lib";
import { DESTINATION, PRODUCT_MESSAGES } from "@/constants";
import { act } from "react";
import { useFormStatus } from "react-dom";

jest.mock("../../../../lib/fetch.ts");
jest.mock("../../../../lib/product.ts", () => ({
  markProduct: jest.fn(),
  mutateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
  useFormState: () => [{}, () => {}],
}));

describe("ProductCard test cases", () => {
  const mockUsePathname = usePathname as jest.Mock;
  const mockMarkProduct = markProduct as jest.Mock;
  const mockUseFormStatus = useFormStatus as jest.Mock;

  beforeEach(() => {
    mockUsePathname.mockReturnValue(DESTINATION.PRODUCT);
    mockUseFormStatus.mockReturnValue({ pending: false });
  });

  const setup = (props: Product) => render(<ProductCard {...props} />);

  it("should render correctly", () => {
    const { asFragment } = setup({
      ...MOCK_PRODUCTS[0],
      description: undefined,
      coverImageUrl: undefined,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should be able to mark the product as favorite", async () => {
    const mockResolveValue = {
      ...MOCK_PRODUCTS[0],
      isFavorited: 1,
    };
    mockMarkProduct.mockResolvedValueOnce(mockResolveValue);

    const { rerender } = setup(MOCK_PRODUCTS[0]);

    const favoriteBtn = screen.getByTestId("mark-favorite");

    await userEvent.click(favoriteBtn);

    rerender(<ProductCard {...mockResolveValue} />);

    expect(favoriteBtn.className.includes("bg-red-500")).toBe(true);
  });

  it("should be able to unmark the product as favorite", async () => {
    const mockResolveValue = {
      ...MOCK_PRODUCTS[1],
      isFavorited: 0,
    };

    mockMarkProduct.mockResolvedValueOnce(mockResolveValue);

    const { rerender } = setup(MOCK_PRODUCTS[1]);

    const favoriteBtn = screen.getByTestId("mark-favorite");

    await userEvent.click(favoriteBtn);

    rerender(<ProductCard {...mockResolveValue} />);

    expect(favoriteBtn.className.includes("bg-white")).toBe(true);
  });

  it("should be able to show error toast when marking product failed", async () => {
    mockMarkProduct.mockRejectedValueOnce({});

    setup(MOCK_PRODUCTS[0]);

    const favoriteBtn = screen.getByTestId("mark-favorite");

    await userEvent.click(favoriteBtn);

    expect(favoriteBtn.className.includes("bg-white")).toBe(true);
  });

  it("should be able to show error toast when unmarking product failed", async () => {
    mockMarkProduct.mockRejectedValueOnce({});

    setup(MOCK_PRODUCTS[1]);

    const favoriteBtn = screen.getByTestId("mark-favorite");

    await userEvent.click(favoriteBtn);

    expect(favoriteBtn.className.includes("bg-red-500")).toBe(true);
  });

  it("should be able to show edit form when clicking edit button", async () => {
    act(() => setup(MOCK_PRODUCTS[0]));

    const editBtn = screen.getByTestId("update");

    await userEvent.click(editBtn);

    const editForm = await screen.findByRole("dialog", {
      name: /edit course/i,
    });

    expect(editForm).toBeInTheDocument();
  });

  it("should be able to show delete form when clicking delete button", async () => {
    act(() => setup(MOCK_PRODUCTS[0]));

    const editBtn = screen.getByTestId("delete");

    await userEvent.click(editBtn);

    const deleteForm = await screen.findByRole("dialog", {
      name: new RegExp("delete course", "i"),
    });

    expect(deleteForm).toBeInTheDocument();
  });
});
