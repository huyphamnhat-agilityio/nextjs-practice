"use client";
import Image from "next/image";
import { useState } from "react";

// Components
import { Button } from "@/components/ui/common";

export type ProductImageGalleryProps = {
  data: string[];
  productName: string;
};
const ProductImageGallery = ({
  data,
  productName,
}: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4 lg:flex lg:flex-row-reverse">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <Image
          src={data[selectedImage]}
          alt={`Main Image of ${productName} `}
          width={600}
          height={600}
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex space-x-2 lg:flex-col lg:justify-center lg:gap-2">
        {data.map((imageUrl, index) => (
          <Button
            key={`${imageUrl}-${index}`}
            variant="image"
            onClick={() => setSelectedImage(index)}
            className={`w-20 rounded-lg border-2 p-1 ${
              selectedImage === index ? "border-accent" : "border-border"
            }`}
          >
            <Image
              src={imageUrl}
              alt={`${productName}-${index}`}
              width={68}
              height={68}
              className="w-full h-full object-cover rounded-lg"
              loading="eager"
              fetchPriority="high"
              priority
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
