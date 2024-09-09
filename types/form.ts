import { FORM_STATUS } from "@/constants";

export type FormState<T extends object> = {
  message?: string | null;
  errors?: {
    [K in keyof T]?: Array<string>;
  };
  status?: (typeof FORM_STATUS)[keyof typeof FORM_STATUS];
};
