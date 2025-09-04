import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from ".";

// 🔧 Helper component that sets up react-hook-form context
function TestForm({
  onSubmit,
  withValidation = false,
}: {
  onSubmit?: (data: any) => void;
  withValidation?: boolean;
}) {
  const methods = useForm<{ username: string }>({
    defaultValues: { username: "" },
    errors: {
      username: {
        message: "Mock error message",
        type: "pattern",
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit ?? (() => {}))}>
        <FormField
          control={methods.control}
          name="username"
          rules={withValidation ? { required: "Username is required" } : {}}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name
              </FormDescription>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}

describe("Form components", () => {
  it("renders form field and label", () => {
    render(<TestForm />);
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(
      screen.getByText("This is your public display name"),
    ).toBeInTheDocument();
  });

  it("connects label to input via htmlFor", () => {
    render(<TestForm />);
    const label = screen.getByText("Username");
    const input = screen.getByPlaceholderText("Enter username");
    expect(label).toHaveAttribute("for", input.id);
  });

  it("shows validation error message", async () => {
    const user = userEvent.setup();
    render(<TestForm withValidation />);

    await user.click(screen.getByText("Submit"));

    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("submits form values", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<TestForm onSubmit={handleSubmit} />);

    await user.type(screen.getByPlaceholderText("Enter username"), "Alice");
    await user.click(screen.getByText("Submit"));

    expect(handleSubmit).toHaveBeenCalledWith(
      { username: "Alice" },
      expect.anything(),
    );
  });
});
