import { ToastSection, ToastType } from "@/types";

export type BuildRedirectPathProps = {
  pathname: string;
  type: ToastType;
  section: ToastSection;
  message: string;
};
export const buildRedirectPath = ({
  pathname,
  type,
  section,
  message,
}: BuildRedirectPathProps) => {
  const delimiter = pathname[pathname.length - 1] === "?" ? "" : "&";
  return `${pathname}${delimiter}toastType=${type}&toastSection=${section}&message=${message}`;
};
