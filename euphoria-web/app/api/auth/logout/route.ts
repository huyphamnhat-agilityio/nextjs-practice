// Services
import { logout } from "@/services";

export async function POST() {
  try {
    await logout();
    return Response.json("Logout", { status: 200 });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
