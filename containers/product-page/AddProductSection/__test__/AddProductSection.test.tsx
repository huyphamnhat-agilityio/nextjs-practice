import { render, screen } from "@testing-library/react";
import { useDisclosure } from "@nextui-org/react";

// Components
import AddProductionSection from "..";
import userEvent from "@testing-library/user-event";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: () => ({ pending: false }),
  useFormState: () => [{}, () => {}],
}));

describe("AddProductionSection test cases", () => {
  // const mockUseDisclosure = useDisclosure as jest.Mock;
  const setup = () => render(<AddProductionSection />);
  it("should render correctly", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should open the modal when the "Add course" button is clicked', async () => {
    setup();

    const addBtn = screen.getByRole("button", {
      name: /add course/i,
    });

    await userEvent.click(addBtn);

    const modal = screen.getByRole("dialog", {
      name: /add course/i,
    });

    expect(modal).toBeInTheDocument();
  });
});
