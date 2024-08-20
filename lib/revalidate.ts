"use server";

import { revalidatePath } from "next/cache";

export const revalidateRoute = async () => revalidatePath("/", "layout");
