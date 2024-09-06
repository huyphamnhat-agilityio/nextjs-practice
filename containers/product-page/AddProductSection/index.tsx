"use client";
import { useDisclosure } from "@nextui-org/react";
import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";

// Components
import { Button } from "@/components";

const MutationProductForm = dynamic(() =>
  import("@/components").then((module) => module.MutationProductForm),
);

const AddProductSection = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button size="lg" className="text-white" onClick={onOpen}>
        Add course
      </Button>

      {isOpen && (
        <Suspense>
          <MutationProductForm
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          />
        </Suspense>
      )}
    </>
  );
};

export default AddProductSection;
