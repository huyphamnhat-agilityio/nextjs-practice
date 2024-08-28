import { render, screen } from "@testing-library/react";
import { useFormStatus } from "react-dom";

// Components
import SubscribeSection from "..";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
  useFormState: () => [{}, () => {}],
}));

describe("SubscribeSection test cases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUseFormStatus = useFormStatus as jest.Mock;

  const setup = () => render(<SubscribeSection />);

  it("should render correctly", () => {
    mockUseFormStatus.mockReturnValue({
      pending: false,
    });
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly when the form is pending", () => {
    mockUseFormStatus.mockReturnValue({
      pending: true,
    });
    setup();

    const emailInput = screen.getByRole("textbox", {
      name: /your email/i,
    });

    const submitButton = screen.getByTestId("subscribe-button");

    expect(emailInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
