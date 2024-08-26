import { fireEvent, render, screen } from "@testing-library/react";
import { useFormStatus } from "react-dom";
import { usePathname, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";
import MutationProductForm, { MutationProductFormProps } from "..";

// Mocks
import { MOCK_PRODUCTS, PLACEHOLDER_PRODUCT_FORM_DATA } from "@/mocks";
import { FORM_MESSAGES } from "@/constants";

// Mock necessary hooks
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
  const onClose = jest.fn();
  const onOpenChange = jest.fn();
  const onOpen = jest.fn();

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

  it("should be able to submit when entering valid data", async () => {
    setup(mockProps);

    const titleInput = screen.getByRole("textbox", {
      name: /title title/i,
    });

    await userEvent.type(titleInput, "Updated Title");

    const submitBtn = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitBtn).not.toBeDisabled();
  });

  it("should display error message when typing invalid data", async () => {
    window.URL.createObjectURL = jest.fn();

    const { asFragment } = setup({
      ...mockProps,
      data: {
        ...PLACEHOLDER_PRODUCT_FORM_DATA,
        sales: -1,
      },
    });

    const file = new File([""], "mock.svg", { type: "image/svg+xml" });

    const imgInput = screen.getByTestId("cover-image");

    await userEvent.upload(imgInput, file);

    await userEvent.tab();

    await userEvent.tab();

    const titleInput = screen.getByRole("textbox", {
      name: /title title/i,
    });

    await userEvent.type(titleInput, "a");

    await userEvent.tab();

    await userEvent.tab();

    const salesInput = screen.getByRole("spinbutton", {
      name: /sales sales/i,
    }) as HTMLInputElement;

    await userEvent.tab();

    // const titleError = screen.getByText(
    //   new RegExp(FORM_MESSAGES.PRODUCT.TITLE.MIN, "i")
    // );

    // const imgError = screen.getByText(
    //   new RegExp(FORM_MESSAGES.PRODUCT.COVER_IMAGE.ACCEPTED_FORMATS, "i")
    // );

    const salesError = screen.getByText(
      new RegExp(FORM_MESSAGES.PRODUCT.SALES.MIN, "i"),
    );

    console.log(salesError);

    expect(asFragment()).toMatchSnapshot();
  });
});
