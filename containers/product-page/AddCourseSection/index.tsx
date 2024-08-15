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
import { useCallback, useState } from "react";

// Components
import { Button, Input, Select, Textarea } from "@/components";
import { PLACEHOLDER_AVATAR_URL } from "@/mocks/avatar";
import { createProduct } from "@/lib/product";
import { MOCK_CATEGORIES } from "@/mocks";

const AddCourseSection = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState<File>();

  const handleSelectImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSelectedImage(e.target.files[0]);
      }
    },
    [],
  );

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
                    width="full"
                    height={256}
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : PLACEHOLDER_AVATAR_URL
                    }
                    className="object-cover"
                    alt=""
                  />
                  <Input
                    type="file"
                    onChange={handleSelectImage}
                    className="hidden"
                    name="coverImage"
                  />
                </label>

                <Select
                  label="Category"
                  labelPlacement="outside"
                  placeholder="Choose category..."
                >
                  {MOCK_CATEGORIES.map((category) => (
                    <SelectItem key={category.id}>{category.name}</SelectItem>
                  ))}
                </Select>

                <Input
                  autoFocus
                  label="Title"
                  name="title"
                  labelPlacement="outside"
                  placeholder="Enter course title..."
                />

                <Textarea
                  label="Description"
                  name="description"
                  labelPlacement="outside"
                  placeholder="Enter course description..."
                />

                <Input
                  label="Sales"
                  name="sales"
                  labelPlacement="outside"
                  placeholder="Enter sale amount..."
                  type="number"
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
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
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

export default AddCourseSection;
