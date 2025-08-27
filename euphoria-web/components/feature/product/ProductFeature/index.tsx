import {
  ClothIcon,
  CreditCardIcon,
  ShippingIcon,
  ShippingReturnIcon,
} from "@/components/icons";

const ProductFeature = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
        <div className="w-11 h-11 flex justify-center items-center bg-muted rounded-full">
          <CreditCardIcon />
        </div>
        <span className="font-causten font-medium text-lg text-muted-foreground">
          Secure payment
        </span>
      </div>
      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
        <div className="w-11 h-11 flex justify-center items-center bg-muted rounded-full">
          <ClothIcon />
        </div>
        <span className="font-causten font-medium text-lg text-muted-foreground">
          Size & Fit
        </span>
      </div>
      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
        <div className="w-11 h-11 flex justify-center items-center bg-muted rounded-full">
          <ShippingIcon />
        </div>
        <span className="font-causten font-medium text-lg text-muted-foreground">
          Free shipping
        </span>
      </div>
      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
        <div className="w-11 h-11 flex justify-center items-center bg-muted rounded-full">
          <ShippingReturnIcon />
        </div>
        <span className="font-causten font-medium text-lg text-muted-foreground">
          Free Shipping & Returns
        </span>
      </div>
    </div>
  );
};

export default ProductFeature;
