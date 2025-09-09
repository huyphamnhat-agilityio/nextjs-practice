import { render } from "@testing-library/react";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from ".";

describe("Popover components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
        <PopoverAnchor>Anchor</PopoverAnchor>
      </Popover>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
