export type FormState<T extends object> = {
  message?: string | null;
  errors?: {
    [K in keyof T]?: Array<string>;
  };
  resetKey?: string;
};
