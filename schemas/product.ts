import { z } from "zod";

// Constants
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE } from "@/constants";

export const ProductFormSchema = z
  .object({
    id: z.string(),
    category: z.string({ required_error: "Category is required" }),
    title: z
      .string({ required_error: "Title is required" })
      .min(2, "Title must be at least 2 characters")
      .max(100, "Title must be no more than 100 characters"),
    description: z
      .string()
      .max(200, "Description must be no more than 200 characters")
      .optional(),
    sales: z
      .number({ required_error: "Sale amount is required" })
      .min(0, "Sales must be equal or greater than 0"),
    originalPrice: z
      .number({ required_error: "Original price is required" })
      .min(0, "Original price must be equal or greater than 0"),
    salePrice: z
      .number({ required_error: "Sale price is required" })
      .min(0, "Sale price must be equal or greater than 0"),
    rate: z
      .number({ required_error: "Rate is required" })
      .min(0, "Rate must be equal or greater than 0")
      .max(5, "Rate must be no more than 5")
      .refine(
        (val) => {
          return /^\d+(\.\d)?$/.test(val.toString());
        },
        {
          message: "Rate must have only one digit after the decimal point.",
        },
      ),
    coverImage: z
      .any()
      .optional()
      .refine(
        (file) => !file || file?.size <= MAX_IMAGE_FILE_SIZE,
        `Max image size is ${MAX_IMAGE_FILE_SIZE / 1000000}MB.`,
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),
  })
  .refine((schema) => schema.originalPrice >= schema.salePrice, {
    message: "Sale price must be equal or lower than original price",
    path: ["salePrice"],
  });
