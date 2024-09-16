import { render } from "@testing-library/react";
import Spinner from "..";

describe("Spinner test cases", () => {
  const setup = () => render(<Spinner />);
  it("should render correctly", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
