import { Button } from "@/components/ui/common";
import { IMAGES } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirm - Euphoria",
};

const OrderConfirm = () => {
  return (
    <div className="container mx-auto flex px-4 pt-10 items-center justify-center">
      <div className="flex flex-col gap-3 md:gap-[50px]">
        <Image
          src={IMAGES.ORDER_CONFIRM}
          alt="Order confirm Image"
          width={448}
          height={328}
          className="object-cover"
        />
        <h3 className="font-core-sans-c font-bold text-black text-4xl text-center">
          Your order is confirmed
        </h3>

        <Button font="causten" fontSize="lg" fontWeight="semibold" asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirm;
