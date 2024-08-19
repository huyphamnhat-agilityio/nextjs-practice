// Types
import { ImgBBResponse } from "@/types";

import { fetchApi } from "./fetch";
import { headers } from "next/headers";

export const uploadAndGetImageUrl = async (image: File) => {
  console.log("image", image);
  const imageFormData = new FormData();

  imageFormData.append("image", image);

  const options = {
    method: "POST",
    body: imageFormData,
    headers: undefined,
  };

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
