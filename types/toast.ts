import { TOAST_ACTION, TOAST_SECTION, TOAST_TYPE } from "@/constants";

export type ToastType = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];

export type ToastSection = (typeof TOAST_SECTION)[keyof typeof TOAST_SECTION];

export type ToastAction = (typeof TOAST_ACTION)[keyof typeof TOAST_ACTION];
