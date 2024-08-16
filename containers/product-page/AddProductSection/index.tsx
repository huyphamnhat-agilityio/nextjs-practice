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
import { createProduct } from "@/lib/product";

// Mocks
import { MOCK_CATEGORIES, PLACEHOLDER_AVATAR_URL } from "@/mocks";

// Types
import { ProductForm } from "@/types";

// Schemas
import { ProductFormSchema } from "@/schemas";

const AddProductSection = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState<File>();

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm<ProductForm>({
    mode: "onBlur",
    defaultValues: {
      id: "",
      category: "",
      title: "",
      description: "",
      sales: -1,
      originalPrice: -1,
      salePrice: -1,
      rate: -1,
      coverImage: undefined,
      isFavorited: false,
      createdAt: "",
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

  useEffect(() => {
    if (errors) {
      console.log(errors.title);
    }
  }, [errors]);

  console.log(getValues());
  return (
    <>
      <Button size="lg" className="text-white" onClick={onOpen}>
        Add course
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form action={createProduct}>
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
                        : PLACEHOLDER_AVATAR_URL
                    }
                    className="object-cover"
                    alt=""
                  />
                  <Controller
                    control={control}
                    name="coverImage"
                    render={({ field: { onChange } }) => (
                      <Input
                        type="file"
                        onChange={(e) => {
                          handleSelectImage(e);
                          onChange(e.target.files[0]);
                        }}
                        className="hidden"
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
                      labelPlacement="outside"
                      placeholder="Enter sale amount..."
                      type="number"
                      onChange={(e) => onChange(e.target.valueAsNumber)}
                      onBlur={onBlur}
                      isInvalid={!!errors?.sales}
                      errorMessage={errors?.sales?.message}
                    />
                  )}
                />

                <Input
                  label="Original Price"
                  name="originalPrice"
                  labelPlacement="outside"
                  placeholder="Enter original price..."
                  type="number"
                />

                <Input
                  label="Sale Price"
                  name="salePrice"
                  labelPlacement="outside"
                  placeholder="Enter sale price..."
                  type="number"
                />

                <Input
                  label="Rate"
                  name="rate"
                  labelPlacement="outside"
                  placeholder="Enter rate..."
                  type="number"
                />
                {/* <Input
                  name="isFavorited"
                  placeholder="Enter rate..."
                  defaultValue="false"
                  className="hidden"
                />
                <Input name="categoryId" defaultValue="1" className="hidden" />

                <Input
                  name="category"
                  defaultValue="Certified teacher"
                  className="hidden"
                />

                <Input
                  name="createdAt"
                  defaultValue="2024-08-01T12:00:00Z"
                  className="hidden"
                /> */}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => setSelectedImage(undefined)}
                >
                  Test
                </Button>
                <Button color="primary" className="text-white" type="submit">
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
