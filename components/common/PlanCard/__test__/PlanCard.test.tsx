import { render } from "@testing-library/react";

// Components
import PlanCard, { PlanCardProps } from "..";
import { MOCK_PLAN } from "@/mocks/plan";

describe("PlanCard test cases", () => {
  const setup = (props?: PlanCardProps) => render(<PlanCard {...props} />);

  it("should render correctly", () => {
    const { asFragment } = setup(MOCK_PLAN);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with new badge", () => {
    const { asFragment } = setup({ ...MOCK_PLAN, isNew: true });

    expect(asFragment()).toMatchSnapshot();
  });
});
