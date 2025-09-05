import { Product } from "@/interfaces";
import { fetchApi } from "../fetch";
import { getProduct, getProducts } from "../products";

jest.mock("../fetch", () => ({
  fetchApi: jest.fn(),
}));

describe("products service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("calls fetchApi with correct URL and returns products", async () => {
      const fakeProducts: Product[] = [
        {
          id: "p1",
          name: "T-shirt",
          category: "clothing",
          description: "Soft cotton shirt",
          image: "shirt.png",
          brand: "BrandA",
          price: 25,
          sizes: ["S", "M", "L"],
          colors: [{ name: "Red", value: "#f00" }],
          shipping: 5,
        },
      ];

      (fetchApi as jest.Mock).mockResolvedValueOnce(fakeProducts);

      const result = await getProducts();

      expect(fetchApi).toHaveBeenCalledWith(
        expect.stringMatching(/\/products$/),
        { method: "GET", cache: "force-cache" },
      );
      expect(result).toEqual(fakeProducts);
    });

    it("appends query string when provided", async () => {
      (fetchApi as jest.Mock).mockResolvedValueOnce([]);

      await getProducts("?category=clothing");

      expect(fetchApi).toHaveBeenCalledWith(
        expect.stringMatching(/\/products\?category=clothing$/),
        { method: "GET", cache: "force-cache" },
      );
    });
  });

  describe("getProduct", () => {
    const fakeProduct: Product = {
      id: "p2",
      name: "Shoes",
      category: "footwear",
      description: "Running shoes",
      image: "shoes.png",
      brand: "BrandB",
      price: 80,
      sizes: ["40", "41", "42"],
      colors: [{ name: "Black", value: "#000" }],
      shipping: 10,
    };

    it("returns product when fetchApi resolves", async () => {
      (fetchApi as jest.Mock).mockResolvedValueOnce(fakeProduct);

      const result = await getProduct("p2");

      expect(fetchApi).toHaveBeenCalledWith(
        expect.stringMatching(/\/products\/p2$/),
        { method: "GET" },
      );
      expect(result).toEqual(fakeProduct);
    });

    it('returns undefined when fetchApi throws with message "{}"', async () => {
      (fetchApi as jest.Mock).mockRejectedValueOnce(new Error("{}"));

      const result = await getProduct("p3");

      expect(result).toBeUndefined();
    });

    it("rethrows error when fetchApi throws with other message", async () => {
      (fetchApi as jest.Mock).mockRejectedValueOnce(new Error("Server error"));

      await expect(getProduct("p4")).rejects.toThrow("Server error");
    });
  });
});
