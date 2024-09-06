import { z } from "zod";

// Constants
import {
  ACCEPTED_IMAGE_TYPES,
  FORM_MESSAGES,
  MAX_IMAGE_FILE_SIZE,
} from "@/constants";

export const ProductFormSchema = z
  .object({
    id: z.string(),
    category: z.string({
      required_error: FORM_MESSAGES.PRODUCT.CATEGORY.REQUIRED,
    }),
    title: z
      .string({ required_error: FORM_MESSAGES.PRODUCT.TITLE.REQUIRED })
      .min(2, FORM_MESSAGES.PRODUCT.TITLE.MIN)
      .max(100, FORM_MESSAGES.PRODUCT.TITLE.MAX),
    description: z
      .string()
      .max(200, FORM_MESSAGES.PRODUCT.DESCRIPTION.MAX)
      .optional(),
    sales: z
      .number({ required_error: FORM_MESSAGES.PRODUCT.SALES.REQUIRED })
      .min(0, FORM_MESSAGES.PRODUCT.SALES.MIN),
    originalPrice: z
      .number({ required_error: FORM_MESSAGES.PRODUCT.ORIGINAL_PRICE.REQUIRED })
      .min(0, FORM_MESSAGES.PRODUCT.ORIGINAL_PRICE.MIN),
    salePrice: z
      .number({ required_error: FORM_MESSAGES.PRODUCT.SALE_PRICE.REQUIRED })
      .min(0, FORM_MESSAGES.PRODUCT.SALE_PRICE.MIN),
    rate: z
      .number({ required_error: FORM_MESSAGES.PRODUCT.RATE.REQUIRED })
      .min(0, FORM_MESSAGES.PRODUCT.RATE.MIN)
      .max(5, FORM_MESSAGES.PRODUCT.RATE.MAX)
      .refine(
        (val) => {
          return /^\d+(\.\d)?$/.test(val.toString());
        },
        {
          message: FORM_MESSAGES.PRODUCT.RATE.DECIMAL,
        },
      ),
    coverImage: z
      .any()
      .optional()
      .refine(
        (file) => !file || file?.size <= MAX_IMAGE_FILE_SIZE,
        FORM_MESSAGES.PRODUCT.COVER_IMAGE.MAX_SIZE,
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        FORM_MESSAGES.PRODUCT.COVER_IMAGE.ACCEPTED_FORMATS,
      ),
  })
  .refine((schema) => schema.originalPrice >= schema.salePrice, {
    message: FORM_MESSAGES.PRODUCT.SALE_PRICE.MAX,
    path: ["salePrice"],
  })
  .refine((schema) => schema.originalPrice >= schema.salePrice, {
    message: FORM_MESSAGES.PRODUCT.ORIGINAL_PRICE.CONSTRAINT,
    path: ["originalPrice"],
  });
