"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// Types
import { FormState, Pagination, Product } from "@/types";

// Constants
import {
  DEFAULT_SORTING_OPTIONS,
  PRODUCT_MESSAGES,
  RESOURCES,
  TAGS,
} from "@/constants";

// Services
import { fetchApi, uploadAndGetImageUrl } from "@/lib";

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
    publicDataUrl: `${process.env.MOCK_API}/${RESOURCES.PRODUCT}?sortBy=${DEFAULT_SORTING_OPTIONS.SORT_BY}&order=${DEFAULT_SORTING_OPTIONS.ORDER}&title=${query}`,
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
          tags: [TAGS.PRODUCTS],
        },
      },
    );

    return products;
  } catch (error) {
    if (error.status === 404 || error.status === 400) return undefined;
    throw new Error(error.message);
  }
};

export const getProductById = async (productId: string) => {
  try {
    const response = await fetchApi<Product>(
      `${process.env.MOCK_API}/${RESOURCES.PRODUCT}/${productId}`,
      {
        next: {
          revalidate: 300,
          tags: [TAGS.PRODUCT_DETAIL],
        },
      },
    );

    return response;
  } catch (error) {
    if (error.status === 404) return undefined;
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

    revalidateTag(TAGS.PRODUCTS);
    revalidateTag(TAGS.PRODUCT_DETAIL);

    return response;
  } catch (error) {
    throw error;
  }
};

export const mutateProduct = async <T extends object>(
  {
    redirectPathWhenAddSuccess,
    redirectPathWhenUpdateSuccess,
  }: {
    redirectPathWhenAddSuccess: string;
    redirectPathWhenUpdateSuccess: string;
  },
  _: FormState<T>,
  data: FormData,
) => {
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

  let redirectPath = "";

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

  if (productBaseData.id) {
    try {
      await fetchApi<Product>(
        `${process.env.MOCK_API}/${RESOURCES.PRODUCT}/${productBaseData.id}`,
        {
          method: "PUT",
          body: JSON.stringify(productData),
        },
      );

      revalidateTag(TAGS.PRODUCTS);
      revalidateTag(TAGS.PRODUCT_DETAIL);

      redirectPath = redirectPathWhenUpdateSuccess;
    } catch (error) {
      return {
        message: PRODUCT_MESSAGES.ERROR.UPDATE,
      };
    }
  } else {
    try {
      await fetchApi<Product>(`${process.env.MOCK_API}/${RESOURCES.PRODUCT}`, {
        method: "POST",
        body: JSON.stringify(productData),
      });

      revalidateTag(TAGS.PRODUCTS);
      revalidateTag(TAGS.PRODUCT_DETAIL);

      redirectPath = redirectPathWhenAddSuccess;
    } catch (error) {
      return {
        message: PRODUCT_MESSAGES.ERROR.CREATE,
      };
    }
  }
  redirect(redirectPath);
};

export const deleteProduct = async (
  {
    redirectPathWhenSuccess,
    redirectPathWhenError,
  }: {
    redirectPathWhenSuccess: string;
    redirectPathWhenError: string;
  },
  data: FormData,
) => {
  const id = data.get("id") as string;

  let redirectPath = redirectPathWhenSuccess;
  try {
    await fetchApi<Product>(
      `${process.env.MOCK_API}/${RESOURCES.PRODUCT}/${id}`,
      { method: "DELETE" },
    );

    revalidateTag(TAGS.PRODUCTS);
    revalidateTag(TAGS.PRODUCT_DETAIL);
  } catch (error) {
    redirectPath = redirectPathWhenError;
  } finally {
    redirect(redirectPath);
  }
};
