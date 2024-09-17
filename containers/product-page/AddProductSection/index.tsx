"use client";
import { useDisclosure } from "@nextui-org/react";
import dynamic from "next/dynamic";

// Components
import { Button } from "@/components";

const MutationProductForm = dynamic(
  () => import("@/components/MutationProductForm/index"),
);

const AddProductSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size="lg" className="text-white" onClick={onOpen}>
        Add course
      </Button>

      {isOpen && (
        <MutationProductForm
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      )}
    </>
  );
};

export default AddProductSection;
