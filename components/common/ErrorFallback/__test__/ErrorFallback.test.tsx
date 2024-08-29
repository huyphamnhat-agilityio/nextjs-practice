import { render } from "@testing-library/react";

import ErrorFallback, { ErrorFallbackProps } from "..";

describe("ErrorFallback test cases", () => {
  const setup = (props: ErrorFallbackProps) =>
    render(<ErrorFallback {...props} />);

  it("should render correctly", () => {
    const { asFragment } = setup({});

    expect(asFragment()).toMatchSnapshot();
  });
});
