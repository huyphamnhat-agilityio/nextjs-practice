import { render, screen } from "@testing-library/react";
import { useFormStatus } from "react-dom";
import { usePathname, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";

// Components
import { ConfirmProductForm } from "@/components";

// Mock necessary hooks
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("ConfirmProductForm", () => {
  const onClose = jest.fn();
  const onOpenChange = jest.fn();
  const onOpen = jest.fn();

  beforeEach(() => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });
    (usePathname as jest.Mock).mockReturnValue("/current-path");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("renders correctly", () => {
    render(
      <ConfirmProductForm
        id="1"
        isOpen={true}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />,
    );

    expect(screen.getByText("Delete course with id: 1")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Do you want to delete this course? This action cannot be undone.",
      ),
    ).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <ConfirmProductForm
        id="1"
        isOpen={true}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />,
    );

    userEvent.click(screen.getByText("Cancel"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("disables the Delete button when pending", () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: true });

    render(
      <ConfirmProductForm
        id="1"
        isOpen={true}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />,
    );

    expect(screen.getByText("Delete")).toBeDisabled();
  });

  it("triggers form submission with the correct action", async () => {
    const { asFragment } = render(
      <ConfirmProductForm
        id="1"
        isOpen={true}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />,
    );

    const submitBtn = screen.getByRole("button", {
      name: /delete/i,
    });

    await userEvent.click(submitBtn);

    expect(asFragment()).toMatchSnapshot();
  });
});
