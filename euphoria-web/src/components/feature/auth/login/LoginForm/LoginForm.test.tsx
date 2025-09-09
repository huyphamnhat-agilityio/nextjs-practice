// LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { login } from "@/actions";
import { useCart } from "@/hooks/cart";
import { useRouter } from "next/navigation";
import LoginForm from ".";
import { useUserStore } from "@/stores";

// 🔹 Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// 🔹 Mock actions and stores
jest.mock("@/actions", () => ({
  login: jest.fn(),
}));

jest.mock("@/stores/user", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("@/hooks/cart", () => ({
  useCart: jest.fn(),
}));

describe("LoginForm", () => {
  const mockSetUser = jest.fn();
  const mockFetchCart = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as unknown as jest.Mock).mockReturnValue(mockSetUser);
    (useCart as jest.Mock).mockReturnValue({ fetchCart: mockFetchCart });
    (useRouter as jest.Mock).mockReturnValue({ refresh: mockRefresh });
  });

  it("renders email and password inputs", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i, { selector: "input" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(/password/i, {
      selector: "input",
    });
    const toggleButton = screen.getByRole("button", { name: /show/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);

    expect(
      screen.getByLabelText(/password/i, { selector: "input" }),
    ).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: /hide/i })).toBeInTheDocument();
  });

  it("submits successfully and calls setUser, fetchCart, and refresh", async () => {
    (login as jest.Mock).mockResolvedValueOnce({
      id: "123",
      email: "test@test.com",
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(
      screen.getByLabelText(/password/i, { selector: "input" }),
      {
        target: { value: "password123" },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "password123",
      });
      expect(mockSetUser).toHaveBeenCalledWith({
        id: "123",
        email: "test@test.com",
      });
      waitFor(() => expect(mockFetchCart).toHaveBeenCalledWith("123"));
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("shows error message when login fails", async () => {
    (login as jest.Mock).mockRejectedValueOnce(
      new Error("Invalid credentials"),
    );

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "wrong@test.com" },
    });
    fireEvent.change(
      screen.getByLabelText(/password/i, { selector: "input" }),
      {
        target: { value: "badpass" },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("disables submit button when fields are empty", () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole("button", { name: /sign in/i });
    expect(submitButton).toBeDisabled();
  });
});
