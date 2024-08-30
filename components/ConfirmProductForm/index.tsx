"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { usePathname, useSearchParams } from "next/navigation";

// Component
import { Button, Input } from "../common";

// Services
import { buildRedirectPathWithToast, deleteProduct } from "@/lib";

// Constants
import {
  PRODUCT_MESSAGES,
  TOAST_ACTION,
  TOAST_SECTION,
  TOAST_TYPE,
} from "@/constants";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPath = `${pathname}?${new URLSearchParams(searchParams).toString()}`;

  const redirectPathWhenSuccess = buildRedirectPathWithToast({
    pathname: currentPath,
    type: TOAST_TYPE.SUCCESS,
    section: TOAST_SECTION.PRODUCT_LIST_SECTION,
    action: TOAST_ACTION.CONFIRM,
    message: PRODUCT_MESSAGES.SUCCESS.DELETE,
  });

  const redirectPathWhenError = buildRedirectPathWithToast({
    pathname: currentPath,
    type: TOAST_TYPE.ERROR,
    section: TOAST_SECTION.PRODUCT_CARD,
    action: TOAST_ACTION.CONFIRM,
    message: PRODUCT_MESSAGES.ERROR.DELETE,
    queryId: id,
  });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="outside"
    >
      <ModalContent>
        <ModalHeader className="text-2xl">Delete course</ModalHeader>
        <form
          action={deleteProduct.bind(null, {
            redirectPathWhenSuccess,
            redirectPathWhenError,
          })}
        >
          <ConfirmProductFormBody id={id} onClose={onClose} />
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmProductForm;
