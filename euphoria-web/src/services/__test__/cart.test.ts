import { Cart } from "@/interfaces";
import { fetchApiWithAuth } from "../fetch";
import { getCart, updateCart } from "../cart";

// 🔹 Mock fetchApiWithAuth
jest.mock("../fetch", () => ({
  fetchApiWithAuth: jest.fn(),
}));

describe("cart service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCart", () => {
    it("calls fetchApiWithAuth with userId and returns cart", async () => {
      const fakeCart: Cart = {
        id: "c1",
        userId: "u1",
        items: [
          {
            id: "p1",
            name: "Shirt",
            price: 20,
            image: "shirt.png",
            shipping: 10,
            quantity: 2,
            color: "red",
            size: "M",
          },
        ],
      };

      (fetchApiWithAuth as jest.Mock).mockResolvedValueOnce(fakeCart);

      const result = await getCart("u1");

      expect(fetchApiWithAuth).toHaveBeenCalledWith(
        expect.stringMatching(/\/carts\/u1$/),
        { method: "GET" },
      );
      expect(result).toEqual(fakeCart);
    });

    it("works with default userId (empty string)", async () => {
      const fakeCart: Cart = { id: "c2", userId: "", items: [] };
      (fetchApiWithAuth as jest.Mock).mockResolvedValueOnce(fakeCart);

      const result = await getCart();

      expect(fetchApiWithAuth).toHaveBeenCalledWith(
        expect.stringMatching(/\/carts\/$/),
        { method: "GET" },
      );
      expect(result).toEqual(fakeCart);
    });
  });

  describe("updateCart", () => {
    it("sends PATCH with items only", async () => {
      const payload: Omit<Cart, "id"> = {
        userId: "u2",
        items: [
          {
            id: "p2",
            name: "Shoes",
            price: 50,
            image: "shoes.png",
            shipping: 10,
            quantity: 1,
            color: "black",
            size: "42",
          },
        ],
      };

      (fetchApiWithAuth as jest.Mock).mockResolvedValueOnce(undefined);

      await updateCart(payload);

      expect(fetchApiWithAuth).toHaveBeenCalledWith(
        expect.stringMatching(/\/carts\/u2$/),
        {
          method: "PATCH",
          body: JSON.stringify({ items: payload.items }),
        },
      );
    });
  });
});
