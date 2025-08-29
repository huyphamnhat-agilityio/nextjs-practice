import { Button } from "@/components/ui/common";
import Image from "next/image";
import Link from "next/link";

const OrderConfirm = () => {
  return (
    <div className="container mx-auto flex px-4 pt-10 items-center justify-center">
      <div className="flex flex-col gap-3 md:gap-[50px]">
        <Image
          src="/images/order-confirm.jpg"
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
