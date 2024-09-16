// service
import { fetchApi } from "../fetch";
import {
  deleteProduct,
  getProductById,
  getProducts,
  markProduct,
  mutateProduct,
} from "../product";
import { uploadAndGetImageUrl } from "../image";

// Types
import { FormState, Pagination, Product, ProductForm } from "@/types";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks";
import { PRODUCT_MESSAGES, RESOURCES } from "@/constants";

jest.mock("../fetch.ts");

jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

jest.mock("../image.ts");

describe("Product services test cases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFetchApi = fetchApi as jest.Mock;
  const mockUpLoadAndGetImageUrl = uploadAndGetImageUrl as jest.Mock;

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

  const mockProduct: Product = MOCK_PRODUCTS[0];

  const mockError: {
    status: number;
    message: string;
  } = {
    status: 401,
    message: "mock",
  };

  const mockNotFoundError: {
    status: number;
    message: string;
  } = {
    status: 404,
    message: "mock",
  };

  const mockFormState: FormState<ProductForm> = {};

  it("should return products data when getProducts is successful", async () => {
    mockFetchApi.mockResolvedValueOnce(mockProducts);

    const result = await getProducts({
      page: 1,
      limit: 10,
    });

    expect(result).toEqual(mockProducts);
  });

  it("should throw an error when getProducts fails", async () => {
    mockFetchApi.mockRejectedValueOnce(mockError);

    await expect(
      getProducts({
        page: 1,
        limit: 10,
      }),
    ).rejects.toStrictEqual(new Error(mockError.message));

    mockFetchApi.mockRejectedValueOnce(mockNotFoundError);

    await expect(
      getProducts({
        page: 1,
        limit: 10,
      }),
    ).resolves.toEqual(undefined);
  });

  it("should return product details when getProductById is successful", async () => {
    mockFetchApi.mockResolvedValueOnce(mockProduct);

    const result = await getProductById(mockProduct.id);

    expect(result).toEqual(mockProduct);
  });

  it("should throw an error when getProductById fails", async () => {
    let mockError: {
      status: number;
      message: string;
    } = {
      status: 401,
      message: "Error when fetching product with id",
    };

    mockFetchApi.mockRejectedValueOnce(mockError);

    await expect(getProductById("1")).rejects.toStrictEqual(
      new Error(mockError.message),
    );

    mockError = {
      status: 404,
      message: "Error when fetching product",
    };

    mockFetchApi.mockRejectedValueOnce(mockError);

    await expect(getProductById("1")).resolves.toEqual(undefined);
  });

  it("should return product data when markProduct is successful", async () => {
    mockFetchApi.mockResolvedValueOnce({
      ...mockProduct,
      isFavorited: !!mockProduct.isFavorited ? 0 : 1,
    });

    await expect(markProduct(mockProduct)).resolves.toEqual({
      ...mockProduct,
      isFavorited: !!mockProduct.isFavorited ? 0 : 1,
    });
  });
  it("should throw error when markProduct fails", async () => {
    mockFetchApi.mockRejectedValueOnce(mockError);

    await expect(markProduct(mockProduct)).rejects.toEqual(mockError);
  });

  it("should be able to add a product when data is valid and services are available", async () => {
    mockUpLoadAndGetImageUrl.mockReturnValueOnce(mockProduct.coverImageUrl);

    mockFetchApi.mockResolvedValueOnce(mockProduct);

    const expectedPayload: Product = {
      id: "",
      category: mockProduct.category,
      title: mockProduct.title,
      description: mockProduct.description,
      sales: mockProduct.sales,
      originalPrice: mockProduct.originalPrice,
      salePrice: mockProduct.salePrice,
      rate: mockProduct.rate,
      isFavorited: mockProduct.isFavorited,
      createdAt: Date.now(),
      coverImageUrl: mockProduct.coverImageUrl,
    };

    await mutateProduct(expectedPayload);

    expect(mockFetchApi).toHaveBeenCalledWith(
      `${process.env.MOCK_API}/${RESOURCES.PRODUCT}`,
      {
        method: "POST",
        body: JSON.stringify(expectedPayload),
      },
    );
  });

  it("should throw error when adding a product fails", async () => {
    mockFetchApi.mockRejectedValueOnce(mockError);

    try {
      await mutateProduct({ ...mockProduct, id: "" });
    } catch (error) {
      expect((error as Error).message).toEqual(mockError.message);
    }
  });

  it("should be able to update a product when data is valid and services are available", async () => {
    const mockProduct = MOCK_PRODUCTS[1];

    mockFetchApi.mockResolvedValueOnce(mockProduct);

    await mutateProduct(mockProduct);

    expect(mockFetchApi).toHaveBeenCalledWith(
      `${process.env.MOCK_API}/${RESOURCES.PRODUCT}/${mockProduct.id}`,
      {
        method: "PUT",
        body: JSON.stringify(mockProduct),
      },
    );
  });

  it("should throw error when updating a product fails", async () => {
    mockFetchApi.mockRejectedValueOnce(mockError);

    try {
      await mutateProduct(mockProduct);
    } catch (error) {
      expect((error as Error).message).toEqual(mockError.message);
    }
  });

  it("should be able to delete a product when data is valid and services are available", async () => {
    mockFetchApi.mockResolvedValueOnce(mockProduct);

    const mockFormData: FormData = new FormData();

    mockFormData.append("id", mockProduct.id);

    await deleteProduct(mockFormData);

    expect(mockFetchApi).toHaveBeenCalledWith(
      `${process.env.MOCK_API}/${RESOURCES.PRODUCT}/${mockProduct.id}`,
      {
        method: "DELETE",
      },
    );
  });

  it("should throw error when deleting product fails", async () => {
    mockFetchApi.mockRejectedValueOnce(mockError);

    const mockFormData: FormData = new FormData();

    mockFormData.append("id", mockProduct.id);

    try {
      await deleteProduct(mockFormData);
    } catch (error) {
      expect((error as Error).message).toEqual(PRODUCT_MESSAGES.ERROR.DELETE);
    }
  });
});
