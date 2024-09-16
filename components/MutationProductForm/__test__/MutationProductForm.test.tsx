import { render, screen } from "@testing-library/react";
import { useFormStatus } from "react-dom";
import { usePathname, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";

// Components
import MutationProductForm, { MutationProductFormProps } from "..";

// Mocks
import { MOCK_PRODUCTS, PLACEHOLDER_PRODUCT_FORM_DATA } from "@/mocks";

// Constants
import { FORM_MESSAGES, PRODUCT_MESSAGES } from "@/constants";

// Services
import { mutateProduct, uploadAndGetImageUrl } from "@/lib";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
  useFormState: () => [{}, () => {}],
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("../../../lib/image.ts", () => ({
  uploadAndGetImageUrl: jest.fn(),
}));

jest.mock("../../../lib/product.ts", () => ({
  mutateProduct: jest.fn(),
}));
describe("MutationProductForm test cases", () => {
  window.URL.createObjectURL = jest.fn();

  const mockUploadAndGetImageUrl = uploadAndGetImageUrl as jest.Mock;
  const mockMutateProduct = mutateProduct as jest.Mock;
  const mockImageFile = new File(
    [
      new Uint8Array([
        137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82,
      ]),
    ], // Mock binary data
    "mock-image.jpg", // File name
    { type: "image/jpeg" }, // MIME type
  );

  beforeEach(() => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    window.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  it("should display error message when uploading image fails", async () => {
    setup(mockProps);

    const imgInput = screen.getByTestId("cover-image");

    await userEvent.upload(imgInput, mockImageFile);

    mockUploadAndGetImageUrl.mockRejectedValueOnce("error");

    const submitBtn = screen.getByRole("button", {
      name: /submit/i,
    });

    await userEvent.click(submitBtn);

    const imgError = await screen.findByText(
      new RegExp(PRODUCT_MESSAGES.ERROR.UPLOAD_IMAGE, "i"),
    );

    expect(imgError.textContent).toEqual(PRODUCT_MESSAGES.ERROR.UPLOAD_IMAGE);
  });

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

  it("should be able to add when entering valid data", async () => {
    setup({ ...mockProps, data: { ...mockProps.data, id: "" } });

    const titleInput = screen.getByRole("textbox", {
      name: /title title/i,
    });

    await userEvent.type(titleInput, "Updated Title");

    const originalPriceInput = screen.getByRole("textbox", {
      name: /original price original price/i,
    });

    await userEvent.type(originalPriceInput, "100");

    const salePriceInput = screen.getByRole("textbox", {
      name: /sale price sale price/i,
    });

    await userEvent.type(salePriceInput, "100");

    const rateInput = screen.getByRole("textbox", {
      name: /rate rate/i,
    });

    await userEvent.type(rateInput, "2");

    const submitBtn = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitBtn).not.toBeDisabled();

    expect(originalPriceInput).toHaveValue(
      `${mockProps.data.originalPrice},100`,
    );

    expect(salePriceInput).toHaveValue(`${mockProps.data.salePrice},100`);

    expect(rateInput).toHaveValue("2");

    mockUploadAndGetImageUrl.mockResolvedValueOnce("https://mock-url.com");

    mockMutateProduct.mockResolvedValueOnce({
      ...mockProps.data,
      id: "0",
      coverImage: "https://mock-url.com",
      originalPrice: Number(`${mockProps.data.originalPrice}100`),
      salePrice: Number(`${mockProps.data.salePrice}100`),
      rate: 2,
    });

    await userEvent.click(submitBtn);
  });

  it("should be able to update when entering valid data", async () => {
    setup(mockProps);

    const titleInput = screen.getByRole("textbox", {
      name: /title title/i,
    });

    await userEvent.type(titleInput, "Updated Title");

    const imgInput = screen.getByTestId("cover-image");

    await userEvent.upload(imgInput, mockImageFile);

    const originalPriceInput = screen.getByRole("textbox", {
      name: /original price original price/i,
    });

    await userEvent.type(originalPriceInput, "100");

    const salePriceInput = screen.getByRole("textbox", {
      name: /sale price sale price/i,
    });

    await userEvent.type(salePriceInput, "100");

    const rateInput = screen.getByRole("textbox", {
      name: /rate rate/i,
    });

    await userEvent.type(rateInput, "2");

    const submitBtn = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitBtn).not.toBeDisabled();

    expect(originalPriceInput).toHaveValue(
      `${mockProps.data.originalPrice},100`,
    );

    expect(salePriceInput).toHaveValue(`${mockProps.data.salePrice},100`);

    expect(rateInput).toHaveValue("2");

    mockUploadAndGetImageUrl.mockResolvedValueOnce("https://mock-url.com");

    mockMutateProduct.mockResolvedValueOnce({
      ...mockProps.data,
      coverImage: "https://mock-url.com",
      originalPrice: Number(`${mockProps.data.originalPrice}100`),
      salePrice: Number(`${mockProps.data.salePrice}100`),
      rate: 2,
    });

    await userEvent.click(submitBtn);
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

    const originalPriceInput = screen.getByRole("textbox", {
      name: /original price original price/i,
    });

    await userEvent.type(originalPriceInput, "-");

    const salePriceInput = screen.getByRole("textbox", {
      name: /sale price sale price/i,
    });

    await userEvent.type(salePriceInput, "-");

    const rateInput = screen.getByRole("textbox", {
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

    const { salePrice, originalPrice } = mockProps.data;

    expect(titleInput).toHaveValue(`${mockProps.data.title}Updated Title`);
    expect(categorySelectList).toHaveValue("Books Library");
    expect(salesInput).toHaveValue(1);
    expect(salePriceInput).toHaveValue(salePrice.toString());
    expect(originalPriceInput).toHaveValue(originalPrice.toString());
    expect(rateInput).toHaveValue("1");
  });

  it("should display error message when typing invalid data", async () => {
    setup({
      ...mockProps,
      data: {
        ...PLACEHOLDER_PRODUCT_FORM_DATA,
        title: "a",
        sales: -1,
        originalPrice: 0,
        salePrice: 0,
        rate: 9,
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
      new RegExp(FORM_MESSAGES.PRODUCT.RATE.MAX, "i"),
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

    expect(rateError.textContent).toEqual(FORM_MESSAGES.PRODUCT.RATE.MAX);
  });
});
