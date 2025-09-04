import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import CartItem, { CartItemProps } from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority: _priority, unoptimized: _unoptimized, ...rest } = props;
    return <img {...rest} alt={props.alt} />;
  },
}));

// Default props for tests
const defaultProps: CartItemProps = {
  id: "1",
  name: "Classic Tee",
  color: "Blue",
  size: "M",
  image: "test-image.jpg",
  price: 25,
  quantity: 2,
  shipping: 0,
  onRemove: jest.fn(),
  onUpdate: jest.fn().mockResolvedValue(undefined),
};

describe("CartItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders product details", () => {
    render(<CartItem {...defaultProps} />);
    expect(screen.getAllByText("Classic Tee")[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Color: Blue/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Size: M/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText("$25.00")[0]).toBeInTheDocument();
    expect(screen.getAllByText("$50.00")[0]).toBeInTheDocument();
    expect(screen.getAllByText(/FREE/i)[0]).toBeInTheDocument();
  });

  it("calls onRemove when trash button clicked", () => {
    render(<CartItem {...defaultProps} />);
    const trashButtons = screen.getByTestId("remove-button");
    fireEvent.click(trashButtons);
    waitFor(() => expect(defaultProps.onRemove).toHaveBeenCalled());
  });

  it("calls onUpdate when quantity changes (after debounce)", async () => {
    render(<CartItem {...defaultProps} />);
    const plusButton = screen.getAllByTestId("increment-button")[0];

    expect(plusButton).toBeTruthy();

    fireEvent.click(plusButton);

    // Debounce requires timers to flush
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(defaultProps.onUpdate).toHaveBeenCalledWith("1", 3);
  });

  it("updates subtotal when quantity changes", async () => {
    render(<CartItem {...defaultProps} />);
    expect(screen.getAllByText("$50.00")[0]).toBeInTheDocument();

    const plusButton = screen.getAllByTestId("increment-button")[0];

    fireEvent.click(plusButton);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect((await screen.findAllByText("$75.00"))[0]).toBeInTheDocument(); // 25 * 3
  });

  it("shows shipping price when > 0", () => {
    render(<CartItem {...defaultProps} shipping={5} />);
    expect(screen.getByText("$5.00")).toBeInTheDocument();
  });
});
