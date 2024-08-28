import { fetchApi } from "../fetch";

global.fetch = jest.fn();

describe("fetchApi test cases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFetch = global.fetch as jest.Mock;
  it("should return data when the response is successful", async () => {
    const mockData = { id: 1, name: "Test" };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchApi<typeof mockData>(
      "https://api.example.com/data",
    );

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("should return data with custom options", async () => {
    const mockData = { id: 1, name: "Test" };
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer token",
      },
      body: JSON.stringify({ key: "value" }),
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchApi<typeof mockData>(
      "https://api.example.com/data",
      options,
    );

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/data",
      options,
    );
  });

  it("should throw an error when the response is not ok", async () => {
    const mockError = "Not Found";

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => mockError,
    });

    await expect(
      fetchApi("https://api.example.com/data"),
    ).rejects.toBeDefined();

    expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
});
