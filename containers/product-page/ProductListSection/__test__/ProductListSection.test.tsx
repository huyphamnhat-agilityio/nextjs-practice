import { render, screen } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { act } from "react";

// Components
import ProductListSection from "..";

// Services
import { buildRedirectPathWithToast } from "@/lib";

// Constants
import {
  DESTINATION,
  PRODUCT_MESSAGES,
  TOAST_ACTION,
  TOAST_SECTION,
  TOAST_TYPE,
} from "@/constants";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
  useFormState: () => [{}, () => {}],
}));

describe("ProductListSection test cases", () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUsePathname.mockReturnValue(DESTINATION.PRODUCT);
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  const setup = () =>
    render(
      <ProductListSection>
        <></>
      </ProductListSection>,
    );
  it("should render correctly", async () => {
    const { asFragment } = await act(() => setup());

    expect(asFragment()).toMatchSnapshot();
  });

  it("shoulde able to show success toast corresponding to the query params", async () => {
    let mockParams = buildRedirectPathWithToast({
      pathname: DESTINATION.PRODUCT,
      type: TOAST_TYPE.SUCCESS,
      section: TOAST_SECTION.PRODUCT_LIST_SECTION,
      action: TOAST_ACTION.CONFIRM,
      message: PRODUCT_MESSAGES.SUCCESS.DELETE,
    });

    mockUseSearchParams.mockReturnValue(new URLSearchParams(mockParams));

    const { asFragment } = await act(() => setup());

    expect(asFragment()).toMatchSnapshot();
  });

  it("shoulde able to show error toast corresponding to the query params", async () => {
    let mockParams = buildRedirectPathWithToast({
      pathname: DESTINATION.PRODUCT,
      type: TOAST_TYPE.ERROR,
      section: TOAST_SECTION.PRODUCT_LIST_SECTION,
      action: TOAST_ACTION.CONFIRM,
      message: PRODUCT_MESSAGES.ERROR.DELETE,
    });

    mockUseSearchParams.mockReturnValue(new URLSearchParams(mockParams));

    const { asFragment } = await act(() => setup());

    expect(asFragment()).toMatchSnapshot();
  });
});
