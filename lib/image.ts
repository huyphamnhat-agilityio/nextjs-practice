"use server";
// Types
import { ImgBBResponse } from "@/types";

import { fetchApi } from "./fetch";

export const uploadAndGetImageUrl = async (imageData: FormData) => {
  const response = await fetchApi<ImgBBResponse>(
    `${process.env.UPLOAD_IMAGE_API}?key=${process.env.IMGBB_API_KEY}`,
    {
      method: "POST",
      body: imageData,
      headers: undefined,
    },
  );

  return response.data.url;
};
