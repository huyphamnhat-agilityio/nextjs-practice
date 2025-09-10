import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantityControl from ".";

describe("QuantityControl", () => {
  it("renders current quantity", () => {
    const setQuantity = jest.fn();
    render(<QuantityControl quantity={5} setQuantity={setQuantity} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("increments quantity when plus button is clicked", async () => {
    const user = userEvent.setup();
    const setQuantity = jest.fn();
    render(<QuantityControl quantity={2} setQuantity={setQuantity} />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]); // plus button

    expect(setQuantity).toHaveBeenCalledWith(3);
  });

  it("decrements quantity when minus button is clicked", async () => {
    const user = userEvent.setup();
    const setQuantity = jest.fn();
    render(<QuantityControl quantity={2} setQuantity={setQuantity} />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]); // minus button

    expect(setQuantity).toHaveBeenCalledWith(1);
  });

  it("does not decrement below 1", async () => {
    const user = userEvent.setup();
    const setQuantity = jest.fn();
    render(<QuantityControl quantity={1} setQuantity={setQuantity} />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]); // minus button

    expect(setQuantity).not.toHaveBeenCalled();
  });

  it("disables buttons when isDisabled is true", async () => {
    const user = userEvent.setup();
    const setQuantity = jest.fn();
    render(
      <QuantityControl quantity={3} setQuantity={setQuantity} isDisabled />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();

    await user.click(buttons[0]);
    await user.click(buttons[1]);

    expect(setQuantity).not.toHaveBeenCalled();
  });
});
