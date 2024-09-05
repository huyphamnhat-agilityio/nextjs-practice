"use client";
import { useDisclosure } from "@nextui-org/react";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Components
import { Button } from "@/components";

// Constants
import {
  TOAST_ACTION,
  TOAST_QUERY_PARAMS,
  TOAST_SECTION,
  TOAST_TYPE,
} from "@/constants";

const MutationProductForm = dynamic(() =>
  import("@/components").then((module) => module.MutationProductForm),
);

const AddProductSection = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const toastType = searchParams.get(TOAST_QUERY_PARAMS.TOAST_TYPE);
  const toastSection = searchParams.get(TOAST_QUERY_PARAMS.TOAST_SECTION);
  const toastAction = searchParams.get(TOAST_QUERY_PARAMS.TOAST_ACTION);
  const message = searchParams.get(TOAST_QUERY_PARAMS.MESSAGE);

  useEffect(() => {
    if (
      toastSection === TOAST_SECTION.ADD_PRODUCT_SECTION &&
      toastAction === TOAST_ACTION.MUTATE
    ) {
      onClose();
      toastType === TOAST_TYPE.SUCCESS
        ? toast.success(message)
        : toast.error(message);

      const params = new URLSearchParams(searchParams.toString());

      params.delete(TOAST_QUERY_PARAMS.TOAST_TYPE);
      params.delete(TOAST_QUERY_PARAMS.TOAST_SECTION);
      params.delete(TOAST_QUERY_PARAMS.TOAST_ACTION);
      params.delete(TOAST_QUERY_PARAMS.MESSAGE);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [
    toastAction,
    message,
    onClose,
    pathname,
    router,
    searchParams,
    toastSection,
    toastType,
  ]);

  return (
    <>
      <Button size="lg" className="text-white" onClick={onOpen}>
        Add course
      </Button>

      {isOpen && (
        <Suspense>
          <MutationProductForm
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          />
        </Suspense>
      )}
    </>
  );
};

export default AddProductSection;
