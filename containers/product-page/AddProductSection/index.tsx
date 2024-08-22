"use client";
import {
  Image as NextUIImage,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  SelectItem,
} from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Components
import {
  Button,
  Input,
  MutationProductForm,
  Select,
  Textarea,
} from "@/components";

// Services
import { mutateProduct } from "@/lib/product";

// Mocks
import {
  MOCK_CATEGORIES,
  PLACEHOLDER_COURSE_IMAGE,
  PLACEHOLDER_PRODUCT_FORM_DATA,
} from "@/mocks";

// Types
import { FormState, ProductForm, ToastType } from "@/types";

// Schemas
import { ProductFormSchema } from "@/schemas";
import { PRODUCT_MESSAGES, TOAST_SECTION, TOAST_TYPE } from "@/constants";

const AddProductSection = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const toastType = searchParams.get("toastType");
  const toastSection = searchParams.get("toastSection");
  const message = searchParams.get("message");

  useEffect(() => {
    if (toastSection === TOAST_SECTION.ADD_PRODUCT_SECTION) {
      onClose();
      toastType === TOAST_TYPE.SUCCESS
        ? toast.success(message)
        : toast.error(message);

      const params = new URLSearchParams(searchParams.toString());

      params.delete("toastType");
      params.delete("toastSection");
      params.delete("message");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [
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

      <MutationProductForm
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default AddProductSection;
