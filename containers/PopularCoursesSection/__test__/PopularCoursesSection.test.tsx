import { render } from "@testing-library/react";

// Components
import PopularCoursesSection from "..";

// Utils
import { resolvedComponent } from "@/utils";

// Mocks
import { MOCK_PRODUCTS, mockFetch } from "@/mocks";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useSearchParams: () => ({
    get: () => {},
  }),
  usePathname: () => ({
    get: () => {},
  }),
}));

describe("PopularCoursesSection test cases", () => {
  it("should render correctly", async () => {
    window.fetch = mockFetch({ data: MOCK_PRODUCTS });

    const PopularCoursesSectionResolved = await resolvedComponent<{
      currentPage: number;
    }>(PopularCoursesSection, {
      currentPage: 1,
    });

    const { container } = render(<PopularCoursesSectionResolved />);

    expect(container).toMatchSnapshot();
  });
});
