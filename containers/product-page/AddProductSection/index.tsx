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

// Components
import { Button, Input, Select, Textarea } from "@/components";

// Services
import { mutateProduct } from "@/lib/product";

// Mocks
import { MOCK_CATEGORIES, PLACEHOLDER_COURSE_IMAGE } from "@/mocks";

// Types
import { ProductForm } from "@/types";

// Schemas
import { ProductFormSchema } from "@/schemas";

const AddProductSection = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState<File>();

  const {
    control,
    formState: { errors, isValid },
  } = useForm<ProductForm>({
    mode: "all",
    defaultValues: {
      id: "",
      category: "",
      title: "",
      description: "",
      sales: -1,
      originalPrice: -1,
      salePrice: -1,
      rate: -1,
      coverImageUrl: "",
      coverImage: undefined,
      isFavorited: 0,
      createdAt: undefined,
    },
    resolver: zodResolver(ProductFormSchema),
  });

  const handleSelectImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSelectedImage(e.target.files[0]);
      }
    },
    [],
  );

  // useEffect(() => {
  //   if (errors) {
  //     console.log(errors);
  //   }
  // }, [errors]);

  return (
    <>
      <Button size="lg" className="text-white" onClick={onOpen}>
        Add course
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form action={mutateProduct}>
              <ModalHeader className="text-2xl">Add course</ModalHeader>
              <ModalBody className="flex flex-col gap-6">
                <label
                  aria-label="cover course image url"
                  className="self-center"
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
                  <p className="text-base text-danger">
                    {errors.coverImage.message}
                  </p>
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
                      isInvalid={!!errors?.category}
                      errorMessage={errors?.category?.message}
                      onChange={(e) => onChange(e.target.value)}
                    >
                      {MOCK_CATEGORIES.map((category) => (
                        <SelectItem key={category.name}>
                          {category.name}
                        </SelectItem>
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
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(
                          !isNaN(e.target.valueAsNumber)
                            ? e.target.valueAsNumber
                            : -1,
                        );
                      }}
                      isInvalid={!!errors?.sales}
                      errorMessage={errors?.sales?.message}
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
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(
                          !isNaN(e.target.valueAsNumber)
                            ? e.target.valueAsNumber
                            : -1,
                        );
                      }}
                      isInvalid={!!errors?.originalPrice}
                      errorMessage={errors?.originalPrice?.message}
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
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(
                          !isNaN(e.target.valueAsNumber)
                            ? e.target.valueAsNumber
                            : -1,
                        );
                      }}
                      isInvalid={!!errors?.salePrice}
                      errorMessage={errors?.salePrice?.message}
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
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(
                          !isNaN(e.target.valueAsNumber)
                            ? e.target.valueAsNumber
                            : -1,
                        );
                      }}
                      isInvalid={!!errors?.rate}
                      errorMessage={errors?.rate?.message}
                    />
                  )}
                />

                {/* <Input name="isFavorited" className="hidden" />

                <Input name="id" className="hidden" />

                <Input name="createdAt" className="hidden" /> */}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => setSelectedImage(undefined)}
                >
                  Test
                </Button>
                <Button
                  color="primary"
                  className="text-white"
                  type="submit"
                  isDisabled={!isValid}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProductSection;
