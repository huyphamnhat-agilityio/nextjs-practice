import { QUERY_DELIMITER } from "@/constants";
import { ToastType } from "react-hot-toast";

export const buildRedirectPath = (
  pathname: string,
  type: ToastType,
  message: string,
) => {
  const delimiter =
    pathname[pathname.length - 1] === QUERY_DELIMITER ? "" : "&";
  return `${pathname}${delimiter}toastType=${type}&message=${message}`;
};
