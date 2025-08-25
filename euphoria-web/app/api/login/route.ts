import { login } from "@/services";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    await login(data);
    return Response.json(null, { status: 200 });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
