import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary border border-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-muted-foreground text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        social:
          "w-full border border-input bg-background hover:bg-accent/50 text-primary",
        icon: "hover:bg-accent/50 flex items-center gap-1 border border-transparent",
        image: "aspect-square overflow-hidden",
        color: "rounded-full",
      },
      size: {
        default: "py-4 px-4",
        sm: "rounded-lg py-3 px-3",
        lg: "rounded-md py-4 px-4",
        icon: "h-10 w-10",
        auto: "p-0",
      },
      font: {
        causten: "font-causten",
        coreSans: "font-core-sans-c",
      },
      fontSize: {
        default: "text-base",
        xs: "text-xs",
        sm: "text-sm",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
      },
      fontWeight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
      font: "causten",
      fontWeight: "normal",
      fontSize: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      font,
      fontSize,
      fontWeight,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            font,
            fontSize,
            fontWeight,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
