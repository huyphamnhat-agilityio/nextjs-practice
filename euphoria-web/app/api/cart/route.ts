// Services

import { getCart, updateCart } from "@/services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? "";

  try {
    const cart = await getCart(userId);
    return Response.json(cart, { status: 200 });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId, items } = await request.json();

  try {
    await updateCart({ userId, items });
    return Response.json("Cart updated", { status: 200 });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
