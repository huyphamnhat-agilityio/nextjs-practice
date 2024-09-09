// Types
import { FormState, Subscription } from "@/types";

// Services
import { fetchApi, subscribe } from "..";

// Constants
import { SUBSCRIBE_MESSAGES } from "@/constants";

jest.mock("../fetch.ts");

describe("Subscribe service test case", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFetchApi = fetchApi as jest.Mock;

  const mockFormState: FormState<Subscription> = {};

  const mockData = "mockmail@gmail.com";

  it("should return success message if subscribe successfully", async () => {
    const mockFormData = new FormData();
    mockFormData.append("email", mockData);

    const result = await subscribe(mockFormState, mockFormData);

    expect(result.message).toBe(SUBSCRIBE_MESSAGES.SUCCESS);
  });

  it("should return errors if subscribe fails", async () => {
    const mockError = { message: "Failed to subscribe" };

    mockFetchApi.mockRejectedValueOnce(mockError);

    const mockFormData = new FormData();

    mockFormData.append("email", mockData);

    const result = await subscribe(mockFormState, mockFormData);

    expect(result.errors.email[0]).toBe(mockError.message);
  });
});
