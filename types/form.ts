export type FormState<T extends object> = {
  message?: string | null;
  errors?: {
    [K in keyof T]?: string[];
  };
  resetKey?: string;
};
