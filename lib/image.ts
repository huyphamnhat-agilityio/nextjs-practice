"use server";
// Types
import { ImgBBResponse } from "@/types";

import { fetchApi } from "./fetch";

export const uploadAndGetImageUrl = async (imageAsBase64: string) => {
  const imageFormData = new FormData();

  imageFormData.append("image", imageAsBase64);

  const response = await fetchApi<ImgBBResponse>(
    `${process.env.UPLOAD_IMAGE_API}?key=${process.env.IMGBB_API_KEY}`,
    {
      method: "POST",
      body: imageFormData,
      headers: undefined,
    },
  );

  return response.data.url;
};
