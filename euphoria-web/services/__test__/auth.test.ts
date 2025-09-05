import { cookies } from "next/headers";
import { fetchApi } from "../fetch";
import { login, logout } from "../auth";

jest.mock("../fetch", () => ({
  fetchApi: jest.fn(),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("auth actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("calls fetchApi with correct payload and sets cookie", async () => {
      const fakePayload = { email: "a@b.com", password: "123456" };
      const fakeResponse = {
        accessToken: "token-123",
        user: { id: "u1", name: "Alice" },
      };

      (fetchApi as jest.Mock).mockResolvedValueOnce(fakeResponse);

      const setMock = jest.fn();
      (cookies as jest.Mock).mockReturnValue({
        set: setMock,
      });

      const result = await login(fakePayload);

      expect(fetchApi).toHaveBeenCalledWith(
        expect.stringMatching(/\/login$/), // URL ends with /login
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(fakePayload),
        }),
      );

      expect(setMock).toHaveBeenCalledWith(
        "accessToken",
        "token-123",
        expect.objectContaining({
          httpOnly: true,
          expires: expect.any(Date),
        }),
      );

      expect(result).toEqual(fakeResponse.user);
    });

    it("propagates errors from fetchApi", async () => {
      (fetchApi as jest.Mock).mockRejectedValueOnce(
        new Error("Bad credentials"),
      );

      await expect(login({ email: "x", password: "y" })).rejects.toThrow(
        "Bad credentials",
      );
    });
  });

  describe("logout", () => {
    it("deletes accessToken cookie", async () => {
      const deleteMock = jest.fn();
      (cookies as jest.Mock).mockReturnValue({
        delete: deleteMock,
      });

      await logout();

      expect(deleteMock).toHaveBeenCalledWith("accessToken");
    });
  });
});
