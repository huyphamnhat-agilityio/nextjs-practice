import { getProducts } from "../product";
import { fetchApi } from "../fetch";

// Types
import { Pagination, Product } from "@/types";

// Constants
import { RESOURCES } from "@/constants";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks";

// Mock the fetchApi function
jest.mock("../fetch.ts");

describe("getProducts test cases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFetchApi = fetchApi as jest.Mock;

  it("should return products data when fetchApi is successful", async () => {
    const mockProducts: Pagination<Product> = {
      data: [MOCK_PRODUCTS[0]],
      page: 1,
      limit: 10,
      totalPages: 1,
      totalItems: 10,
      hasNextPage: false,
      hasPrevPage: false,
      prevPage: null,
      nextPage: null,
    };

    mockFetchApi.mockResolvedValueOnce(mockProducts);

    const result = await getProducts({
      page: 1,
      limit: 10,
    });

    expect(result).toEqual(mockProducts);

    expect(fetchApi).toHaveBeenCalledWith(process.env.PAGINATION_API, {
      method: "POST",
      body: JSON.stringify({
        publicDataUrl: `${process.env.MOCK_API}/${RESOURCES.PRODUCT}`,
        page: 1,
        limit: 10,
      }),
      next: {
        revalidate: 300,
      },
    });
  });

  it("should throw an error when fetchApi fails", async () => {
    const mockError = "Error fetching products";

    mockFetchApi.mockRejectedValueOnce(mockError);

    await expect(
      getProducts({
        page: 1,
        limit: 10,
      }),
    ).rejects.toThrow(mockError);

    expect(fetchApi).toHaveBeenCalledWith(process.env.PAGINATION_API, {
      method: "POST",
      body: JSON.stringify({
        publicDataUrl: `${process.env.MOCK_API}/${RESOURCES.PRODUCT}`,
        page: 1,
        limit: 10,
      }),
      next: {
        revalidate: 300,
      },
    });
  });
});
