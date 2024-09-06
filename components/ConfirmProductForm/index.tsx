"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";

// Component
import { Button, Input } from "../common";

// Services
import { deleteProduct } from "@/lib";

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
  onOpenChange,
}: ConfirmProductFormProps) => {
  const deleteAction = async (payload: FormData) => {
    try {
      const result = await deleteProduct(payload);

      if (result.message) toast.success(result.message);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }

    onClose();
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="outside">
      <ModalContent>
        <ModalHeader className="text-2xl">Delete course</ModalHeader>
        <form action={deleteAction}>
          <ConfirmProductFormBody id={id} onClose={onClose} />
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmProductForm;
