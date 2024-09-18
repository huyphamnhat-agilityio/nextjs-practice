import { render } from "@testing-library/react";
import RelatedProductsSectionSkeleton from "..";

describe("RelatedProductsSectionSkeleton test cases", () => {
  const setup = () => render(<RelatedProductsSectionSkeleton />);

  it("should render correctly", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
