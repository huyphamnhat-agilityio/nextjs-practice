"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

// Types
import { FormState, Pagination, Product, ToastSection } from "@/types";

// Constants
import {
  PRODUCT_MESSAGES,
  RESOURCES,
  TAGS,
  TOAST_ACTION,
  TOAST_SECTION,
  TOAST_TYPE,
} from "@/constants";

// Services
import {
  buildRedirectPathWithToast,
  fetchApi,
  uploadAndGetImageUrl,
} from "@/lib";

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

  let redirectPath = pathname;

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
    try {
      await fetchApi<Product>(
        `${process.env.MOCK_API}/${RESOURCES.PRODUCT}/${productBaseData.id}`,
        {
          method: "PUT",
          body: JSON.stringify(productData),
        },
      );

      revalidateTag(TAGS.PRODUCTS);

      redirectPath = buildRedirectPathWithToast({
        pathname,
        type: TOAST_TYPE.SUCCESS,
        section: TOAST_SECTION.PRODUCT_CARD,
        action: TOAST_ACTION.MUTATE,
        message: PRODUCT_MESSAGES.SUCCESS.UPDATE,
        queryId: productBaseData.id,
      });
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

      redirectPath = buildRedirectPathWithToast({
        pathname,
        type: TOAST_TYPE.SUCCESS,
        section: TOAST_SECTION.ADD_PRODUCT_SECTION,
        action: TOAST_ACTION.MUTATE,
        message: PRODUCT_MESSAGES.SUCCESS.CREATE,
      });
    } catch (error) {
      return {
        message: PRODUCT_MESSAGES.ERROR.CREATE,
      };
    }
  }
  redirect(redirectPath);
};

export const deleteProduct = async (pathname: string, data: FormData) => {
  const id = data.get("id") as string;

  let redirectPath = pathname;
  try {
    await fetchApi<Product>(
      `${process.env.MOCK_API}/${RESOURCES.PRODUCT}/${id}`,
      { method: "DELETE" },
    );

    revalidateTag(TAGS.PRODUCTS);

    redirectPath = buildRedirectPathWithToast({
      pathname,
      type: TOAST_TYPE.SUCCESS,
      section: TOAST_SECTION.PRODUCT_LIST_SECTION,
      action: TOAST_ACTION.CONFIRM,
      message: PRODUCT_MESSAGES.SUCCESS.DELETE,
    });
  } catch (error) {
    redirectPath = buildRedirectPathWithToast({
      pathname,
      type: TOAST_TYPE.ERROR,
      section: TOAST_SECTION.PRODUCT_CARD,
      action: TOAST_ACTION.CONFIRM,
      message: PRODUCT_MESSAGES.ERROR.DELETE,
      queryId: id,
    });
  } finally {
    redirect(`${redirectPath}`);
  }
};
