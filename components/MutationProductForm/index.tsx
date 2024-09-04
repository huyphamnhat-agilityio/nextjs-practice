"use client";
import React, { useCallback, useState } from "react";
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
import { useFormState, useFormStatus } from "react-dom";
import { usePathname, useSearchParams } from "next/navigation";

// Types
import { FormState, Product, ProductForm } from "@/types";

// Schemas
import { ProductFormSchema } from "@/schemas";

// Mocks
import { MOCK_CATEGORIES, PLACEHOLDER_COURSE_IMAGE } from "@/mocks";

// Components
import { Button, Input, Select, Textarea } from "../common";

// Services
import { buildRedirectPathWithToast, mutateProduct } from "@/lib";
import {
  PRODUCT_MESSAGES,
  TOAST_ACTION,
  TOAST_SECTION,
  TOAST_TYPE,
} from "@/constants";

export type ProductFormBodyProps = {
  selectedImage: File;
  control: Control<ProductForm, any>;
  handleSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<ProductForm>;
  isValid: boolean;
  isDirty: boolean;
  state: FormState<ProductForm>;
  onClose: () => void;
  coverImageUrl: string;
};
const ProductFormBody = ({
  selectedImage,
  control,
  handleSelectImage,
  errors,
  isValid,
  isDirty,
  state,
  onClose,
  coverImageUrl,
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
            width={448}
            height={256}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : coverImageUrl
                  ? coverImageUrl
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
                data-testid="cover-image"
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
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              label="Category"
              name="category"
              labelPlacement="outside"
              placeholder="Choose category..."
              value={value}
              selectedKeys={[`${value}`]}
              isDisabled={pending}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
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
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                label="Title"
                name="title"
                labelPlacement="outside"
                placeholder="Enter course title..."
                isDisabled={pending}
                isInvalid={!!errors?.title}
                errorMessage={errors?.title?.message}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
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
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Sales"
              name="sales"
              labelPlacement="outside"
              placeholder="Enter sale amount..."
              type="number"
              value={value?.toString()}
              isDisabled={pending}
              isInvalid={!!errors?.sales}
              errorMessage={errors?.sales?.message}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(
                  !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0,
                );
              }}
              onKeyDown={(e: React.KeyboardEvent) =>
                ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
              }
            />
          )}
        />

        <Controller
          control={control}
          name="originalPrice"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Original Price"
              name="originalPrice"
              labelPlacement="outside"
              placeholder="Enter original price..."
              type="number"
              value={value?.toString()}
              isDisabled={pending}
              isInvalid={!!errors?.originalPrice}
              errorMessage={errors?.originalPrice?.message}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(
                  !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0,
                );
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="salePrice"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Sale Price"
              name="salePrice"
              labelPlacement="outside"
              placeholder="Enter sale price..."
              type="number"
              value={value?.toString()}
              isDisabled={pending}
              isInvalid={!!errors?.salePrice || !!state?.errors?.salePrice}
              errorMessage={
                errors?.salePrice?.message || state?.errors?.salePrice[0]
              }
              onBlur={onBlur}
              onChange={(e) => {
                onChange(
                  !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0,
                );
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="rate"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Rate"
              name="rate"
              labelPlacement="outside"
              placeholder="Enter rate..."
              type="number"
              value={value?.toString()}
              isDisabled={pending}
              isInvalid={!!errors?.rate}
              errorMessage={errors?.rate?.message}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(
                  !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0,
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
        <Button
          color="default"
          variant="flat"
          className="bg-foreground-100 text-white"
          isDisabled={pending}
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          className="text-white"
          type="submit"
          isDisabled={!isValid || pending || !isDirty}
        >
          Submit
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
  onClose,
  data,
}: MutationProductFormProps) => {
  const initialState: FormState<ProductForm> = {};

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPath = `${pathname}?${new URLSearchParams(searchParams).toString()}`;

  const redirectPathWhenAddSuccess = buildRedirectPathWithToast({
    pathname: currentPath,
    type: TOAST_TYPE.SUCCESS,
    section: TOAST_SECTION.ADD_PRODUCT_SECTION,
    action: TOAST_ACTION.MUTATE,
    message: PRODUCT_MESSAGES.SUCCESS.CREATE,
  });

  const redirectPathWhenUpdateSuccess = buildRedirectPathWithToast({
    pathname: currentPath,
    type: TOAST_TYPE.SUCCESS,
    section: TOAST_SECTION.PRODUCT_CARD,
    action: TOAST_ACTION.MUTATE,
    message: PRODUCT_MESSAGES.SUCCESS.UPDATE,
    queryId: data?.id,
  });

  const [state, formAction] = useFormState<FormState<ProductForm>, FormData>(
    mutateProduct.bind(null, {
      redirectPathWhenAddSuccess,
      redirectPathWhenUpdateSuccess,
    }),
    initialState,
  );

  const {
    control,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ProductForm>({
    mode: "all",
    defaultValues: {
      id: data?.id ?? "",
      category: data?.category ?? "",
      title: data?.title ?? "",
      description: data?.description ?? "",
      sales: data?.sales ?? 0,
      originalPrice: data?.originalPrice ?? 0,
      salePrice: data?.salePrice ?? 0,
      rate: data?.rate ?? 0,
      coverImageUrl: data?.coverImageUrl ?? "",
      coverImage: undefined,
      isFavorited: data?.isFavorited ?? 0,
      createdAt: data?.createdAt ?? 0,
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

  const handleCloseModal = useCallback(() => {
    reset();
    setSelectedImage(undefined);
    onClose();
  }, [onClose, reset]);

  const handleOnOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) handleCloseModal();
    },
    [handleCloseModal],
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleOnOpenChange}
      placement="center"
      scrollBehavior="outside"
    >
      <ModalContent>
        <ModalHeader className="text-2xl">
          {data?.id ? "Edit course" : "Add course"}
        </ModalHeader>
        <form action={formAction} key={state?.resetKey}>
          <ProductFormBody
            control={control}
            errors={errors}
            handleSelectImage={handleSelectImage}
            isValid={isValid}
            isDirty={isDirty}
            selectedImage={selectedImage}
            coverImageUrl={data?.coverImageUrl}
            state={state}
            onClose={handleCloseModal}
          />
        </form>
      </ModalContent>
    </Modal>
  );
};

export default MutationProductForm;
