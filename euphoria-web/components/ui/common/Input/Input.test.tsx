import { render } from "@testing-library/react";

import { Input } from ".";

describe("Input components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Input />);

    expect(asFragment()).toMatchSnapshot();
  });
});
