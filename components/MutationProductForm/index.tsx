"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image as NextUIImage,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  SelectItem,
  ModalFooter,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Types
import { FormState, Product, ProductForm } from "@/types";

// Schemas
import { ProductFormSchema } from "@/schemas";

// Mocks
import { MOCK_CATEGORIES, PLACEHOLDER_COURSE_IMAGE } from "@/mocks";

// Components
import { Button, Input, Select, Textarea } from "../common";

// Services
import { mutateProduct } from "@/lib/product";

export type ProductFormBodyProps = {
  selectedImage: File;
  control: Control<ProductForm, any>;
  handleSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<ProductForm>;
  isValid: boolean;
  state: FormState<ProductForm>;
};
const ProductFormBody = ({
  selectedImage,
  control,
  handleSelectImage,
  errors,
  isValid,
  state,
}: ProductFormBodyProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      <ModalBody className="flex flex-col gap-6">
        <label
          aria-label="cover course image url"
          className={`self-center ${pending && "opacity-50"}`}
          aria-disabled={pending}
        >
          <NextUIImage
            width={300}
            height={256}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : PLACEHOLDER_COURSE_IMAGE
            }
            className="object-cover"
            alt=""
          />
          <Controller
            control={control}
            name="coverImage"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                name="coverImage"
                type="file"
                className="hidden"
                onBlur={onBlur}
                onChange={(e) => {
                  handleSelectImage(e);
                  onChange(e.target.files[0]);
                }}
              />
            )}
          />
        </label>
        {errors?.coverImage && (
          <p className="text-base text-danger">{errors.coverImage.message}</p>
        )}

        {state?.errors?.coverImage && (
          <p className="text-base text-danger">{state.errors.coverImage[0]}</p>
        )}
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, ...rest } }) => (
            <Select
              {...rest}
              label="Category"
              name="category"
              labelPlacement="outside"
              placeholder="Choose category..."
              isDisabled={pending}
              isInvalid={!!errors?.category}
              errorMessage={errors?.category?.message}
              onChange={(e) => onChange(e.target.value)}
            >
              {MOCK_CATEGORIES.map((category) => (
                <SelectItem key={category.name}>{category.name}</SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <>
              <Input
                {...field}
                label="Title"
                name="title"
                labelPlacement="outside"
                isDisabled={pending}
                placeholder="Enter course title..."
                isInvalid={!!errors?.title}
                errorMessage={errors?.title?.message}
              />
            </>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea
              {...field}
              label="Description"
              name="description"
              labelPlacement="outside"
              placeholder="Enter course description..."
              isDisabled={pending}
            />
          )}
        />

        <Controller
          control={control}
          name="sales"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="Sales"
              name="sales"
              labelPlacement="outside"
              placeholder="Enter sale amount..."
              type="number"
              isDisabled={pending}
              isInvalid={!!errors?.sales}
              errorMessage={errors?.sales?.message}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(
                  !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : -1,
                );
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="originalPrice"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="Original Price"
              name="originalPrice"
              labelPlacement="outside"
              placeholder="Enter original price..."
              type="number"
              isDisabled={pending}
              isInvalid={!!errors?.originalPrice}
              errorMessage={errors?.originalPrice?.message}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(
                  !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : -1,
                );
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="salePrice"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="Sale Price"
              name="salePrice"
              labelPlacement="outside"
              placeholder="Enter sale price..."
              type="number"
              isDisabled={pending}
              isInvalid={!!errors?.salePrice || !!state?.errors?.salePrice}
              errorMessage={
                errors?.salePrice?.message || state?.errors?.salePrice[0]
              }
              onBlur={onBlur}
              onChange={(e) => {
                onChange(
                  !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : -1,
                );
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="rate"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="Rate"
              name="rate"
              labelPlacement="outside"
              placeholder="Enter rate..."
              type="number"
              isDisabled={pending}
              isInvalid={!!errors?.rate}
              errorMessage={errors?.rate?.message}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(
                  !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : -1,
                );
              }}
            />
          )}
        />

        {state?.message && (
          <p className="text-base text-danger">{state.message}</p>
        )}

        <Controller
          control={control}
          name="isFavorited"
          render={({ field: { value } }) => (
            <Input
              name="isFavorited"
              type="number"
              className="hidden"
              value={value.toString()}
            />
          )}
        />

        <Controller
          control={control}
          name="id"
          render={({ field }) => (
            <Input {...field} name="id" className="hidden" />
          )}
        />

        <Controller
          control={control}
          name="createdAt"
          render={({ field: { value } }) => (
            <Input
              name="createdAt"
              className="hidden"
              value={value.toString()}
            />
          )}
        />

        <Controller
          control={control}
          name="coverImageUrl"
          render={({ field }) => (
            <Input {...field} name="coverImageUrl" className="hidden" />
          )}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" isDisabled={pending}>
          Test
        </Button>
        <Button
          color="primary"
          className="text-white"
          type="submit"
          isDisabled={!isValid || pending}
        >
          Sign in
        </Button>
      </ModalFooter>
    </>
  );
};

export type MutationProductFormProps = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  data?: Product;
};

const MutationProductForm = ({
  isOpen,
  onOpenChange,
  onClose,
}: MutationProductFormProps) => {
  const initialState: FormState<ProductForm> = {};

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPath = `${pathname}?${new URLSearchParams(searchParams)}`;

  const [state, formAction] = useFormState<FormState<ProductForm>, FormData>(
    mutateProduct.bind(null, currentPath),
    initialState,
  );

  const {
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<ProductForm>({
    mode: "all",
    defaultValues: {
      id: "",
      category: "",
      title: "",
      description: "",
      sales: undefined,
      originalPrice: undefined,
      salePrice: undefined,
      rate: undefined,
      coverImageUrl: "",
      coverImage: undefined,
      isFavorited: 0,
      createdAt: 0,
    },
    resolver: zodResolver(ProductFormSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File>();

  const handleSelectImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSelectedImage(e.target.files[0]);
      }
    },
    [],
  );

  useEffect(() => {
    if (state.message) {
      toast.error(state.message);
    }
  }, [reset, state.message]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      hideCloseButton
    >
      <ModalContent>
        {(_) => (
          <form action={formAction} key={state?.resetKey}>
            <ModalHeader className="text-2xl">Add course</ModalHeader>
            <ProductFormBody
              control={control}
              errors={errors}
              handleSelectImage={handleSelectImage}
              isValid={isValid}
              selectedImage={selectedImage}
              state={state}
            />
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MutationProductForm;
