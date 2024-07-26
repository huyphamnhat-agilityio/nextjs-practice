import { render } from "@testing-library/react";

import NavBar from "..";

describe("NavBar", () => {
  it("should render correctly", () => {
    const { container } = render(<NavBar />);

    expect(container).toMatchSnapshot();
  });
});
