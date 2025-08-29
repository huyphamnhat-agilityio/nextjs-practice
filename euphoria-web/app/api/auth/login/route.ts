// Services
import { UserPayload } from "@/interfaces";
import { login } from "@/services";

export async function POST(request: Request) {
  const data: UserPayload = await request.json();

  try {
    const userInfo = await login(data);
    return Response.json(userInfo, { status: 200 });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
