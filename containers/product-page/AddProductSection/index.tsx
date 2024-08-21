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
import { FormState, ProductForm } from "@/types";

// Schemas
import { ProductFormSchema } from "@/schemas";

export type AddProductSectionProps = {
  toastType?: string;
  message?: string;
};

const AddProductSection = ({ toastType, message }: AddProductSectionProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (toastType && message) {
      toast.success(message);

      const params = new URLSearchParams(searchParams.toString());

      params.delete("toastType");
      params.delete("message");

      router.push(`${pathname}?${params.toString()}`);
    }
  }, [message, pathname, router, searchParams, toastType]);

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
        data={PLACEHOLDER_PRODUCT_FORM_DATA}
      />
    </>
  );
};

export default AddProductSection;
