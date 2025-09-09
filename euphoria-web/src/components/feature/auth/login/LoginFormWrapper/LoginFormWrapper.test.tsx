import { render, screen } from "@testing-library/react";
import LoginFormWrapper from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority: _priority, fill: _fill, ...rest } = props;
    return <img {...rest} alt={props.alt} />;
  },
}));
describe("LoginFormWrapper", () => {
  it("renders the left image", () => {
    render(
      <LoginFormWrapper>
        <div>Child content</div>
      </LoginFormWrapper>,
    );

    const img = screen.getByAltText("Happy friends");
    expect(img).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<LoginFormWrapper>child</LoginFormWrapper>);
    expect(
      screen.getByRole("heading", { name: /sign in page/i }),
    ).toBeInTheDocument();
  });

  it("renders Google and Twitter login buttons", () => {
    render(<LoginFormWrapper>child</LoginFormWrapper>);

    expect(
      screen.getByRole("button", { name: /continue with google/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue with twitter/i }),
    ).toBeInTheDocument();
  });

  it("renders divider with OR text", () => {
    render(<LoginFormWrapper>child</LoginFormWrapper>);
    expect(screen.getByText("OR")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <LoginFormWrapper>
        <form aria-label="login-form">
          <input placeholder="Email" />
        </form>
      </LoginFormWrapper>,
    );

    expect(
      screen.getByRole("form", { name: /login-form/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });
});
