import { render } from "@testing-library/react";
import { Skeleton } from ".";

describe("Skeleton components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Skeleton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
