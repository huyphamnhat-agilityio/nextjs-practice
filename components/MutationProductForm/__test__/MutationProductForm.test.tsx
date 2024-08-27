import { render, screen } from "@testing-library/react";
import { useFormStatus } from "react-dom";
import { usePathname, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";
import MutationProductForm, { MutationProductFormProps } from "..";

// Mocks
import { MOCK_PRODUCTS, PLACEHOLDER_PRODUCT_FORM_DATA } from "@/mocks";
import { FORM_MESSAGES } from "@/constants";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
  useFormState: () => [{}, () => {}],
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("MutationProductForm test cases", () => {
  beforeAll(() => {
    window.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });

  beforeEach(() => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  const setup = (props: MutationProductFormProps) =>
    render(<MutationProductForm {...props} />);

  const mockProps: MutationProductFormProps = {
    isOpen: true,
    onClose: jest.fn(),
    onOpen: jest.fn(),
    onOpenChange: jest.fn(),
    data: MOCK_PRODUCTS[0],
  };

  it("should renders correctly with no data", () => {
    const { asFragment } = setup({
      ...mockProps,
      data: undefined,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should renders correctly with existing data", () => {
    const { asFragment } = setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it("disables the submit button when pending", () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: true });

    setup(mockProps);

    const submitBtn = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitBtn).toBeDisabled();
  });

  it("should be able to submit when entering valid data and clear data when close form", async () => {
    setup(mockProps);

    const titleInput = screen.getByRole("textbox", {
      name: /title title/i,
    });

    await userEvent.type(titleInput, "Updated Title");

    const submitBtn = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitBtn).not.toBeDisabled();

    const closeBtn = screen.getByRole("button", {
      name: /cancel/i,
    });

    await userEvent.click(closeBtn);
  });

  it("should be able to prevent entering invalid data", async () => {
    setup(mockProps);

    const titleInput = screen.getByRole("textbox", {
      name: /title title/i,
    });

    await userEvent.type(titleInput, "Updated Title");

    const salesInput = screen.getByRole("spinbutton", {
      name: /sales sales/i,
    });

    await userEvent.type(salesInput, "-1");

    const originalPriceInput = screen.getByRole("spinbutton", {
      name: /original price original price/i,
    });

    await userEvent.type(originalPriceInput, "-1");

    const salePriceInput = screen.getByRole("spinbutton", {
      name: /sale price sale price/i,
    });

    await userEvent.type(salePriceInput, "-1");

    const rateInput = screen.getByRole("spinbutton", {
      name: /rate rate/i,
    });

    await userEvent.type(rateInput, "-1");

    const categorySelectList = screen.getByRole("button", {
      name: /training courses category/i,
      hidden: true,
    });

    await userEvent.click(categorySelectList);

    const categoryOption = screen.getByRole("option", {
      name: /books library/i,
    });

    await userEvent.click(categoryOption);

    expect(titleInput).toHaveValue(`${mockProps.data.title}Updated Title`);
    expect(categorySelectList).toHaveValue("Books Library");
    expect(salesInput).toHaveValue(1);
    expect(salePriceInput).toHaveValue(1);
    expect(originalPriceInput).toHaveValue(1);
    expect(rateInput).toHaveValue(1);
  });

  it("should display error message when typing invalid data", async () => {
    window.URL.createObjectURL = jest.fn();

    const { asFragment } = setup({
      ...mockProps,
      data: {
        ...PLACEHOLDER_PRODUCT_FORM_DATA,
        title: "a",
        sales: -1,
        originalPrice: -1,
        salePrice: -1,
        rate: -1,
      },
    });

    const file = new File([""], "mock.svg", { type: "image/svg+xml" });

    const imgInput = screen.getByTestId("cover-image");

    await userEvent.upload(imgInput, file);

    await userEvent.tab();

    await userEvent.tab();

    await userEvent.tab();

    await userEvent.tab();

    await userEvent.tab();

    await userEvent.tab();

    await userEvent.tab();

    await userEvent.tab();

    const imgError = screen.getByText(
      new RegExp(FORM_MESSAGES.PRODUCT.COVER_IMAGE.ACCEPTED_FORMATS, "i"),
    );

    const titleError = screen.getByText(
      new RegExp(FORM_MESSAGES.PRODUCT.TITLE.MIN, "i"),
    );

    const salesError = screen.getByText(
      new RegExp(FORM_MESSAGES.PRODUCT.SALES.MIN, "i"),
    );

    const originalPriceError = screen.getByText(
      new RegExp(FORM_MESSAGES.PRODUCT.ORIGINAL_PRICE.MIN, "i"),
    );

    const salePriceError = screen.getByText(
      new RegExp(FORM_MESSAGES.PRODUCT.SALE_PRICE.MIN, "i"),
    );

    const rateError = screen.getByText(
      new RegExp(FORM_MESSAGES.PRODUCT.RATE.MIN, "i"),
    );

    expect(imgError.textContent).toEqual(
      FORM_MESSAGES.PRODUCT.COVER_IMAGE.ACCEPTED_FORMATS,
    );

    expect(titleError.textContent).toEqual(FORM_MESSAGES.PRODUCT.TITLE.MIN);

    expect(salesError.textContent).toEqual(FORM_MESSAGES.PRODUCT.SALES.MIN);

    expect(originalPriceError.textContent).toEqual(
      FORM_MESSAGES.PRODUCT.ORIGINAL_PRICE.MIN,
    );

    expect(salePriceError.textContent).toEqual(
      FORM_MESSAGES.PRODUCT.SALE_PRICE.MIN,
    );

    expect(rateError.textContent).toEqual(FORM_MESSAGES.PRODUCT.RATE.MIN);
  });
});
