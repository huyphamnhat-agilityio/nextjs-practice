import { render } from "@testing-library/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "..";

describe("NavigationMenu components", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuIndicator>Indicator</NavigationMenuIndicator>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
