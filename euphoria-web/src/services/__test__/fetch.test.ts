// fetchApi.test.ts
import { cookies } from "next/headers";
import { fetchApi, fetchApiWithAuth } from "../fetch";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

// Make TypeScript happy about global.fetch in test environment
const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

const makeJsonResponse = (body: any) => ({
  ok: true,
  json: async () => body,
});

const makeErrorResponse = (text: string) => ({
  ok: false,
  text: async () => text,
});

describe("fetchApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("defaults to GET and sets Content-Type when no options provided", async () => {
    const data = { ok: true };
    mockFetch.mockResolvedValueOnce(makeJsonResponse(data));

    const res = await fetchApi<typeof data>("/api/test");

    expect(res).toEqual(data);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("respects options.method, options.body and spreads other options (e.g., credentials)", async () => {
    const payload = { hello: "world" };
    const data = { success: true };
    mockFetch.mockResolvedValueOnce(makeJsonResponse(data));

    const opts: RequestInit = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "X-Custom-Header": "abc",
        // override Content-Type
        "Content-Type": "text/plain",
      },
      credentials: "include", // passed through in final options
    };

    const res = await fetchApi<typeof data>("/api/post", opts);

    expect(res).toEqual(data);
    expect(fetch).toHaveBeenCalledWith(
      "/api/post",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(payload),
        credentials: "include",
        headers: expect.objectContaining({
          "X-Custom-Header": "abc",
          "Content-Type": "text/plain", // options.headers should override default
        }),
      }),
    );
  });

  it("throws an Error with response.text() when response.ok is false", async () => {
    mockFetch.mockResolvedValueOnce(makeErrorResponse("Bad request"));

    await expect(fetchApi("/api/fail")).rejects.toThrow("Bad request");
  });
});

describe("fetchApiWithAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds Authorization header when accessToken cookie exists", async () => {
    // cookies() is awaited in the implementation, returning an object with get()
    (cookies as jest.Mock).mockReturnValue({
      get: (name: string) =>
        name === "accessToken" ? { value: "token-123" } : undefined,
    });

    const data = { ok: true };
    mockFetch.mockResolvedValueOnce(makeJsonResponse(data));

    const res = await fetchApiWithAuth<typeof data>("/api/secure");

    expect(res).toEqual(data);
    expect(fetch).toHaveBeenCalledWith(
      "/api/secure",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer token-123",
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("does not add Authorization header when no accessToken cookie", async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => undefined,
    });

    const data = { ok: true };
    mockFetch.mockResolvedValueOnce(makeJsonResponse(data));

    const res = await fetchApiWithAuth<typeof data>("/api/secure");

    expect(res).toEqual(data);
    expect(fetch).toHaveBeenCalledWith(
      "/api/secure",
      expect.objectContaining({
        headers: expect.not.objectContaining({
          Authorization: expect.any(String),
        }),
      }),
    );
  });

  it("allows options.headers to override default Authorization when provided", async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: "cookie-token" }),
    });

    const data = { ok: true };
    mockFetch.mockResolvedValueOnce(makeJsonResponse(data));

    const res = await fetchApiWithAuth<typeof data>("/api/secure", {
      method: "PUT",
      body: JSON.stringify({ a: 1 }),
      headers: {
        Authorization: "Bearer override-token",
        "Content-Type": "application/custom",
      },
    });

    expect(res).toEqual(data);
    expect(fetch).toHaveBeenCalledWith(
      "/api/secure",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify({ a: 1 }),
        headers: expect.objectContaining({
          Authorization: "Bearer override-token",
          "Content-Type": "application/custom",
        }),
      }),
    );
  });

  it("throws with backend text when response.ok is false", async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: "cookie-token" }),
    });

    mockFetch.mockResolvedValueOnce(makeErrorResponse("Unauthorized"));

    await expect(fetchApiWithAuth("/api/secure")).rejects.toThrow(
      "Unauthorized",
    );
  });
});
