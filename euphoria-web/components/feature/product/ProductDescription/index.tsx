export type ProductDescriptionProps = {
  description: string;
};

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div className="mt-12 flex flex-wrap">
      <div className="border-l-4 border-primary pl-6">
        <h2 className="text-2xl font-core-sans-c font-bold text-muted-foreground">
          Product Description
        </h2>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="border-b-1 border-muted-foreground w-fit">
          <h3 className="font-causten font-medium text-muted-foreground mb-3 text-lg">
            Description
          </h3>
        </div>
        <p className="font-causten font-normal text-alternative leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
