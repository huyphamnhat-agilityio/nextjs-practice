"use client";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import {
  Control,
  Controller,
  FieldErrors,
  useForm,
  UseFormSetValue,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image as NextUIImage,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  SelectItem,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";
import { NumericFormat } from "react-number-format";

// Types
import { Product, ProductForm } from "@/types";

// Schemas
import { ProductFormSchema } from "@/schemas";

// Mocks
import { MOCK_CATEGORIES, PLACEHOLDER_COURSE_IMAGE } from "@/mocks";

// Components
import { Button, ClearIcon, Input, Select, Textarea } from "../common";

// Services
import { mutateProduct, uploadAndGetImageUrl } from "@/lib";

// Constants
import { PRODUCT_MESSAGES } from "@/constants";

export type ProductFormBodyProps = {
  selectedImage: File;
  control: Control<ProductForm, any>;
  handleSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearImage: () => void;
  setValue: UseFormSetValue<ProductForm>;
  errors: FieldErrors<ProductForm>;
  isValid: boolean;
  isPending: boolean;
  isDirty: boolean;
  onClose: () => void;
  coverImageUrl: string;
};
const ProductFormBody = ({
  selectedImage,
  control,
  handleSelectImage,
  handleClearImage,
  setValue,
  errors,
  isValid,
  isPending,
  isDirty,
  onClose,
  coverImageUrl,
}: ProductFormBodyProps) => {
  return (
    <>
      <ModalBody className="flex flex-col gap-6 relative">
        {(!!selectedImage || !!coverImageUrl) && (
          <Button
            aria-label="clear-image"
            className="absolute z-50 top-2 right-6  p-2 text-foreground-500 bg-transparent rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
            isIconOnly
            onClick={handleClearImage}
          >
            <ClearIcon />
          </Button>
        )}
        <label
          aria-label="cover course image url"
          className={`self-center ${isPending && "opacity-50"}`}
          aria-disabled={isPending}
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
            className="object-cover cursor-pointer"
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
                  if (e.target.files.length > 0) {
                    handleSelectImage(e);
                    onChange(e.target.files[0]);
                  }
                }}
              />
            )}
          />
        </label>
        {errors?.coverImage && (
          <p className="text-base text-danger">{errors.coverImage.message}</p>
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
              isDisabled={isPending}
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
                isDisabled={isPending}
                isInvalid={!!errors?.title}
                errorMessage={errors?.title?.message}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onClear={() => setValue("title", "")}
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
              isInvalid={!!errors?.description}
              errorMessage={errors?.description?.message}
              isDisabled={isPending}
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
              isDisabled={isPending}
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
              onClear={() => setValue("sales", 0)}
              maxLength={10}
            />
          )}
        />
        <Controller
          control={control}
          name="originalPrice"
          render={({ field: { onChange, onBlur, value } }) => (
            <NumericFormat
              customInput={Input}
              label="Original Price"
              name="originalPrice"
              labelPlacement="outside"
              placeholder="Enter original price..."
              thousandSeparator
              allowNegative={false}
              value={value?.toString()}
              isDisabled={isPending}
              isInvalid={!!errors?.originalPrice}
              errorMessage={errors?.originalPrice?.message}
              onBlur={onBlur}
              onValueChange={({ floatValue }) => onChange(floatValue)}
              onClear={() => setValue("originalPrice", 0)}
              decimalScale={2}
              maxLength={16}
            />
          )}
        />

        <Controller
          control={control}
          name="salePrice"
          render={({ field: { onChange, onBlur, value } }) => (
            <NumericFormat
              customInput={Input}
              label="Sale Price"
              name="salePrice"
              labelPlacement="outside"
              placeholder="Enter sale price..."
              thousandSeparator
              allowNegative={false}
              value={value?.toString()}
              isDisabled={isPending}
              isInvalid={!!errors?.salePrice}
              errorMessage={errors?.salePrice?.message}
              onBlur={onBlur}
              onValueChange={({ floatValue }) => onChange(floatValue)}
              onClear={() => setValue("salePrice", 0)}
              decimalScale={2}
              maxLength={16}
            />
          )}
        />

        <Controller
          control={control}
          name="rate"
          render={({ field: { onChange, onBlur, value } }) => (
            <NumericFormat
              customInput={Input}
              label="Rate"
              name="rate"
              labelPlacement="outside"
              placeholder="Enter rate..."
              allowNegative={false}
              value={value?.toString()}
              isDisabled={isPending}
              isInvalid={!!errors?.rate}
              errorMessage={errors?.rate?.message}
              onBlur={onBlur}
              onValueChange={({ floatValue }) => onChange(floatValue)}
              onClear={() => setValue("rate", 0)}
              decimalScale={1}
              maxLength={3}
            />
          )}
        />

        <Controller
          control={control}
          name="isFavorited"
          render={({ field: { value } }) => (
            <Input
              name="isFavorited"
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
          isDisabled={isPending}
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          className="text-white"
          type="submit"
          spinner={<Spinner size="sm" color="white" />}
          isLoading={isPending}
          isDisabled={!isValid || isPending || !isDirty}
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
  onClose: () => void;
  data?: Product;
};

const MutationProductForm = ({
  isOpen,
  onClose,
  data,
}: MutationProductFormProps) => {
  const {
    control,
    formState: { errors, isValid, isDirty },
    reset,
    handleSubmit,
    setError,
    getValues,
    setValue,
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

  const [isPending, setIsPending] = useState(false);

  const handleSelectImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedImage(e.target.files[0]);
    },
    [],
  );

  const handleCloseModal = useCallback(() => {
    reset();
    setSelectedImage(undefined);
    onClose();
  }, [onClose, reset]);

  const handleClearImage = useCallback(() => {
    selectedImage?.size > 0 && setSelectedImage(undefined);

    getValues("coverImageUrl") &&
      setValue("coverImageUrl", "", { shouldDirty: true });

    getValues("coverImage") &&
      setValue("coverImage", undefined, { shouldDirty: true });
  }, [getValues, selectedImage, setValue]);

  const onSubmit = useCallback(
    async (data: ProductForm) => {
      try {
        setIsPending(true);

        let imageUrl = "";

        try {
          if (data.coverImage) {
            const imageFormData = new FormData();

            imageFormData.append("image", data.coverImage);

            imageUrl = await uploadAndGetImageUrl(imageFormData);
          }
        } catch (error) {
          setError("coverImage", {
            message: PRODUCT_MESSAGES.ERROR.UPLOAD_IMAGE,
          });
          return;
        }

        const { coverImage, coverImageUrl, createdAt, ...rest } = data;

        const product: Product = {
          ...rest,
          coverImageUrl: imageUrl || coverImageUrl,
          createdAt: data.id ? data.createdAt : Date.now(),
        };

        const response = await mutateProduct(product);

        if (response) {
          toast.success(
            data.id
              ? PRODUCT_MESSAGES.SUCCESS.UPDATE
              : PRODUCT_MESSAGES.SUCCESS.CREATE,
          );
          handleCloseModal();
        }
      } catch (error) {
        toast.error(
          data.id
            ? PRODUCT_MESSAGES.ERROR.UPDATE
            : PRODUCT_MESSAGES.ERROR.CREATE,
        );
      } finally {
        setIsPending(false);
      }
    },
    [handleCloseModal, setError],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
      <ModalContent>
        <ModalHeader className="text-2xl">
          {data?.id ? "Edit course" : "Add course"}
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProductFormBody
            control={control}
            errors={errors}
            handleSelectImage={handleSelectImage}
            handleClearImage={handleClearImage}
            setValue={setValue}
            isValid={isValid}
            isPending={isPending}
            isDirty={isDirty}
            selectedImage={selectedImage}
            coverImageUrl={getValues("coverImageUrl")}
            onClose={handleCloseModal}
          />
        </form>
      </ModalContent>
    </Modal>
  );
};

export default MutationProductForm;
