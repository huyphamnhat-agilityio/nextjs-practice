export const API_ROUTES = {
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  CART: "/api/cart",
} as const;

export const ROUTES = {
  LOGIN: "/login",
  CART: "/cart",
  ORDER: "/order",
  HOME: "/",
  PRODUCT: (id: string) => `/product/${id}`,
} as const;
