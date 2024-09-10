import { render, screen } from "@testing-library/react";
import { useFormState, useFormStatus } from "react-dom";

// Components
import SubscribeSection from "..";

// Constants
import { FORM_STATUS, SUBSCRIBE_MESSAGES } from "@/constants";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
  useFormState: jest.fn(),
}));

describe("SubscribeSection test cases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUseFormStatus = useFormStatus as jest.Mock;
  const mockUseFormState = useFormState as jest.Mock;

  mockUseFormState.mockReturnValueOnce([{}, () => {}]);

  const setup = () => render(<SubscribeSection />);

  it("should render correctly", () => {
    mockUseFormState.mockReturnValue([{}, () => {}]);

    mockUseFormStatus.mockReturnValue({
      pending: false,
    });

    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly when the form is pending", () => {
    mockUseFormState.mockReturnValue([{}, () => {}]);

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

  it("should show success toast when subscribing is successful", () => {
    mockUseFormState.mockReturnValue([
      {
        message: SUBSCRIBE_MESSAGES.SUCCESS,
        status: FORM_STATUS.SUCCESS,
        resetKey: Date.now().toString(),
      },
      () => {},
    ]);

    mockUseFormStatus.mockReturnValue({
      pending: false,
    });

    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should show error message when subscribing email is invalid", () => {
    mockUseFormState.mockReturnValue([
      {
        errors: {
          email: [SUBSCRIBE_MESSAGES.ERROR.REQUIRED],
        },
      },
      () => {},
    ]);

    mockUseFormStatus.mockReturnValue({
      pending: false,
    });

    setup();

    const errorMessage = screen.getByText(SUBSCRIBE_MESSAGES.ERROR.REQUIRED);

    expect(errorMessage).toBeInTheDocument();
  });
});
