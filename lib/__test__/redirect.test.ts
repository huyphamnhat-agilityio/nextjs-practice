import {
  TOAST_ACTION,
  TOAST_QUERY_PARAMS,
  TOAST_SECTION,
  TOAST_TYPE,
} from "@/constants";
import {
  buildRedirectPathWithToast,
  BuildRedirectPathWithToastProps,
} from "../redirect";

describe("Redirect utils function test cases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProps: BuildRedirectPathWithToastProps = {
    pathname: "/mock-path",
    type: TOAST_TYPE.SUCCESS,
    section: TOAST_SECTION.PRODUCT_CARD,
    action: TOAST_ACTION.MUTATE,
    message: "mock message",
  };

  it("should build a redirect path with all parameters when queryId is provided", () => {
    const result = buildRedirectPathWithToast({
      ...mockProps,
      queryId: "123",
    });

    expect(result).toBe(
      `${mockProps.pathname}&${TOAST_QUERY_PARAMS.TOAST_TYPE}=${mockProps.type}&${TOAST_QUERY_PARAMS.TOAST_SECTION}=${mockProps.section}&${TOAST_QUERY_PARAMS.TOAST_ACTION}=${mockProps.action}&${TOAST_QUERY_PARAMS.MESSAGE}=${mockProps.message}&${TOAST_QUERY_PARAMS.QUERY_ID}=123`,
    );
  });

  it("should build a redirect path without queryId when it is not provided", () => {
    const result = buildRedirectPathWithToast(mockProps);

    expect(result).toBe(
      `${mockProps.pathname}&${TOAST_QUERY_PARAMS.TOAST_TYPE}=${mockProps.type}&${TOAST_QUERY_PARAMS.TOAST_SECTION}=${mockProps.section}&${TOAST_QUERY_PARAMS.TOAST_ACTION}=${mockProps.action}&${TOAST_QUERY_PARAMS.MESSAGE}=${mockProps.message}`,
    );
  });

  it("should handle pathnames that end with '?'", () => {
    const result = buildRedirectPathWithToast({
      ...mockProps,
      pathname: "/mock-path?",
    });

    expect(result).toBe(
      `${mockProps.pathname}?${TOAST_QUERY_PARAMS.TOAST_TYPE}=${mockProps.type}&${TOAST_QUERY_PARAMS.TOAST_SECTION}=${mockProps.section}&${TOAST_QUERY_PARAMS.TOAST_ACTION}=${mockProps.action}&${TOAST_QUERY_PARAMS.MESSAGE}=${mockProps.message}`,
    );
  });

  it("should handle pathnames that do not end with '?'", () => {
    const result = buildRedirectPathWithToast(mockProps);

    expect(result).toBe(
      `${mockProps.pathname}&${TOAST_QUERY_PARAMS.TOAST_TYPE}=${mockProps.type}&${TOAST_QUERY_PARAMS.TOAST_SECTION}=${mockProps.section}&${TOAST_QUERY_PARAMS.TOAST_ACTION}=${mockProps.action}&${TOAST_QUERY_PARAMS.MESSAGE}=${mockProps.message}`,
    );
  });

  it("should handle an empty message", () => {
    const result = buildRedirectPathWithToast({
      ...mockProps,
      message: "",
    });

    expect(result).toBe(
      `${mockProps.pathname}&${TOAST_QUERY_PARAMS.TOAST_TYPE}=${mockProps.type}&${TOAST_QUERY_PARAMS.TOAST_SECTION}=${mockProps.section}&${TOAST_QUERY_PARAMS.TOAST_ACTION}=${mockProps.action}&${TOAST_QUERY_PARAMS.MESSAGE}=`,
    );
  });
});
