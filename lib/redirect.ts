// Types
import { ToastAction, ToastSection, ToastType } from "@/types";

// Constants
import { TOAST_QUERY_PARAMS } from "@/constants";

export type BuildRedirectPathWithToastProps = {
  pathname: string;
  type: ToastType;
  section: ToastSection;
  action: ToastAction;
  message: string;
  queryId?: string;
};

export const buildRedirectPathWithToast = ({
  pathname,
  type,
  section,
  action,
  message,
  queryId,
}: BuildRedirectPathWithToastProps) => {
  const delimiter = pathname[pathname.length - 1] === "?" ? "" : "&";
  return `${pathname}${delimiter}${TOAST_QUERY_PARAMS.TOAST_TYPE}=${type}&${TOAST_QUERY_PARAMS.TOAST_SECTION}=${section}&${TOAST_QUERY_PARAMS.TOAST_ACTION}=${action}&${TOAST_QUERY_PARAMS.MESSAGE}=${message}${queryId ? `&${TOAST_QUERY_PARAMS.QUERY_ID}=${queryId}` : ""}`;
};
