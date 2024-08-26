"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useFormStatus } from "react-dom";

// Component
import { Button, Input } from "../common";
import { deleteProduct } from "@/lib";
import { usePathname, useSearchParams } from "next/navigation";

export type ConfirmProductFormBodyProps = {
  onClose: () => void;
  id: string;
};

const ConfirmProductFormBody = ({
  onClose,
  id,
}: ConfirmProductFormBodyProps) => {
  const { pending } = useFormStatus();

  return (
    <>
      <ModalBody className="flex">
        Do you want to delete this course? This action cannot be undone.
        <Input name="id" value={id} className="hidden" />
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          variant="flat"
          isDisabled={pending}
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          className="text-white"
          type="submit"
          isDisabled={pending}
        >
          Delete
        </Button>
      </ModalFooter>
    </>
  );
};

export type ConfirmProductFormProps = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  id: string;
};

const ConfirmProductForm = ({
  id,
  isOpen,
  onClose,
  onOpen,
  onOpenChange,
}: ConfirmProductFormProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPath = `${pathname}?${new URLSearchParams(searchParams).toString()}`;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="outside"
    >
      <ModalContent>
        <ModalHeader className="text-2xl">
          Delete course with id: {id}
        </ModalHeader>
        <form action={deleteProduct.bind(null, currentPath)}>
          <ConfirmProductFormBody id={id} onClose={onClose} />
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmProductForm;
