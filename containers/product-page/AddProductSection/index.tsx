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
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

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

const AddProductSection = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
