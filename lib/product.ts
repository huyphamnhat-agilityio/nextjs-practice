"use server";
import { fetchApi } from "./fetch";

// Types
import { FormState, Pagination, Product } from "@/types";

// Constants
import { PRODUCT_MESSAGES, RESOURCES } from "@/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { uploadAndGetImageUrl } from "./image";
import { redirect } from "next/navigation";

export type GetProductProps = {
  page: number;
  limit: number;
  query?: string;
};
export const getProducts = async ({
  page,
  limit,
  query = "",
}: GetProductProps) => {
  const options = {
    publicDataUrl: `${process.env.MOCK_API}/${RESOURCES.PRODUCT}?title=${query}`,
    page,
    limit,
  };

  try {
    const products = await fetchApi<Pagination<Product>>(
      process.env.PAGINATION_API,
      {
        method: "POST",
        body: JSON.stringify(options),
        next: {
          revalidate: 300,
          tags: ["products"],
        },
      },
    );

    return products;
  } catch (error) {
    if (error.status === 404 || error.status === 400) return undefined;
    throw new Error(error.message);
  }
};

export const markProduct = async (data: Product) => {
  try {
    const response = await fetchApi<Product>(
      `${process.env.MOCK_API}/${RESOURCES.PRODUCT}/${data.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          isFavorited: !!data.isFavorited ? 0 : 1,
        }),
      },
    );
    revalidateTag("products");

    return response;
  } catch (error) {
    throw error;
  }
};

export const mutateProduct = async <T extends object>(
  pathname: string,
  _: FormState<T>,
  data: FormData,
) => {
  console.log(data);
  console.log("pathname", pathname);
  const productBaseData: Product = {
    id: data.get("id") as string,
    category: data.get("category") as string,
    title: data.get("title") as string,
    description: data.get("description") as string,
    sales: Number(data.get("sales")),
    originalPrice: Number(data.get("originalPrice")),
    salePrice: Number(data.get("salePrice")),
    rate: Number(data.get("rate")),
    isFavorited: Number(data.get("isFavorited")),
    createdAt: Number(data.get("createdAt")) || Date.now(),
    coverImageUrl: data.get("coverImageUrl") as string,
  };

  let productData: Product = { ...productBaseData };

  const coverImage = data.get("coverImage") as File;

  let productImageUrl = "";

  if (coverImage.size !== 0)
    try {
      productImageUrl = await uploadAndGetImageUrl(coverImage);
      productData = { ...productBaseData, coverImageUrl: productImageUrl };
    } catch (_) {
      return {
        errors: {
          coverImage: [PRODUCT_MESSAGES.ERROR.UPLOAD_IMAGE],
        },
      };
    }

  if (productBaseData.originalPrice < productBaseData.salePrice)
    return {
      errors: {
        salePrice: [PRODUCT_MESSAGES.ERROR.SALE_PRICE],
      },
    };

  if (productBaseData.id) {
    // TODO
  } else {
    try {
      // await fetchApi<Product>(`${process.env.MOCK_API}/${RESOURCES.PRODUCT}`, {
      //   method: "POST",
      //   body: JSON.stringify(productData),
      // });
      // revalidatePath("/", "page");
      // return {
      //   message: PRODUCT_MESSAGES.SUCCESS.CREATED,
      //   resetKey: Date.now().toString(), // Generate a new resetKey to trigger form reset
      // };
    } catch (error) {
    } finally {
      redirect(`${pathname}`);
    }
  }
};
