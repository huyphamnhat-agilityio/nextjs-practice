import { render, screen } from "@testing-library/react";
import { useFormStatus } from "react-dom";
import { usePathname, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";

import ConfirmProductForm, { ConfirmProductFormProps } from "..";

// Mock necessary hooks
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("../../../lib/product.ts", () => ({
  deleteProduct: jest.fn(),
}));
describe("ConfirmProductForm test cases", () => {
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

  const setup = (props: ConfirmProductFormProps) =>
    render(<ConfirmProductForm {...props} />);

  const mockProps: ConfirmProductFormProps = {
    id: "1",
    isOpen: true,
    onClose: onClose,
    onOpen: onOpen,
    onOpenChange: onOpenChange,
  };

  it("should renders correctly", () => {
    const { asFragment } = setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it("disables the Delete button when pending", () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: true });

    setup(mockProps);

    const submitBtn = screen.getByRole("button", {
      name: /delete/i,
    });

    expect(submitBtn).toBeDisabled();
  });

  it("triggers form submission with the correct action", async () => {
    const { asFragment } = setup(mockProps);

    const submitBtn = screen.getByRole("button", {
      name: /delete/i,
    });

    await userEvent.click(submitBtn);

    expect(asFragment()).toMatchSnapshot();
  });
});
