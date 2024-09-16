import { MAX_IMAGE_FILE_SIZE } from "./images";

export const FETCH_ERROR_MESSAGES = {
  400: "The request could not be understood by the server due to malformed syntax. Please check your input and try again.",
  401: "You are not authorized to access this resource. Please log in with valid credentials and try again.",
  403: "You do not have permission to access this resource. Please contact the administrator if you believe this is an error.",
  404: "The requested resource could not be found on this server. Please check the URL and try again.",
  405: "The HTTP method used is not allowed for this resource. Please refer to the API documentation for the correct method.",
  406: "The requested resource cannot generate content acceptable according to the Accept headers sent in the request. Please modify your request and try again.",
} as const;

export const SUBSCRIBE_MESSAGES = {
  ERROR: {
    EMAIL: "This is not a valid email.",
    REQUIRED: "This field has to be filled.",
  },
  SUCCESS: "You have successfully subscribed to our newsletter!",
};

export const MARK_FAVORITE_MESSAGES = {
  SUCCESS: {
    MARKED: "Product has been marked as favorite.",
    UNMARKED: "Product has been unmarked as favorite.",
  },
  ERROR: {
    MARKED: "Failed to mark product as favorite.",
    UNMARKED: "Failed to unmark product as favorite.",
  },
};

export const PRODUCT_MESSAGES = {
  SUCCESS: {
    CREATE: "Product has been created successfully.",
    DELETE: "Product has been deleted successfully.",
    UPDATE: "Product has been updated successfully.",
  },
  ERROR: {
    CREATE: "An error has occurred while creating the product.",
    UPLOAD_IMAGE: "An error has occurred when uploading the product image.",
    SALE_PRICE: "Sale price cannot be higher than the original price.",
    ORIGINAL_PRICE: "Original price cannot be lower than the sale price.",
    DELETE: "An error has occurred while deleting the product.",
    UPDATE: "An error has occurred while updating the product.",
  },
};

export const FORM_MESSAGES = {
  PRODUCT: {
    TITLE: {
      REQUIRED: "Title is required",
      MIN: "Title must be at least 2 characters",
      MAX: "Title must be no more than 100 characters",
    },
    CATEGORY: {
      REQUIRED: "Category is required",
    },
    DESCRIPTION: {
      MAX: "Description must be no more than 200 characters",
    },
    SALES: {
      REQUIRED: "Sale amount is required",
      MIN: "Sales must be equal or greater than 0",
      MAX: "Sales must not exceed 10 digits",
    },
    ORIGINAL_PRICE: {
      REQUIRED: "Original price is required",
      MIN: "Original price must be equal or greater than 0.01",
      MAX: "A course price must be no more than 10 digits",
      CONSTRAINT: "Original price must be greater than or equal to sale price.",
      DECIMAL_MAX: "Must be a number with a maximum of 2 decimal places",
    },
    SALE_PRICE: {
      REQUIRED: "Sale price is required",
      MIN: "Sale price must be equal or greater than 0.01",
      MAX: "Sale price must be equal or lower than original price",
      DECIMAL_MAX: "Must be a number with a maximum of 2 decimal places",
    },
    RATE: {
      REQUIRED: "Rate is required",
      MIN: "Rate must be equal or greater than 0",
      MAX: "Rate must be no more than 5",
      DECIMAL: "Rate must have only one digit after the decimal point.",
    },
    COVER_IMAGE: {
      MAX_SIZE: `Max image size is ${MAX_IMAGE_FILE_SIZE / 1000000}MB.`,
      ACCEPTED_FORMATS:
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
    },
  },
} as const;

export const NOT_FOUND_PAGE_MESSAGES = {
  HOME: "The page you are looking for does not exist. Please check the URL and try again.",
  PRODUCT:
    "The product you are looking for does not exist. Please check the URL and try again.",
};
