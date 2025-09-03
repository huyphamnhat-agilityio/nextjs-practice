import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/common";
import Link from "next/link";
import { CartContent } from "@/components/feature/cart";

export const metadata: Metadata = {
  title: "Cart - Euphoria",
};

const CartPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Shop</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add To Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CartContent />
    </div>
  );
};

export default CartPage;
