import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

// Services
import { getProductById, getProducts } from "@/lib";

// Constants
import {
  MOCK_LEARNER_AVATARS,
  MOCK_LECTURER_AVATAR,
  MOCK_PRODUCTS,
  PLACEHOLDER_COURSE_IMAGE,
  PLACEHOLDER_PRODUCT_DESCRIPTION,
} from "@/mocks";

// Components
import {
  Button,
  CommunityIcon,
  FeedbackIcon,
  GoalIcon,
  MediaIcon,
  PlayIcon,
} from "@/components";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  return {
    title: `Course ${id} Detail`,
    openGraph: {
      title: "School Course App",
      description: "A simple course web app for schools",
      url: "https://nextjs-practice-eosin-beta.vercel.app/",
      type: "website",
      images: [
        {
          url: "https://nextjs-practice-eosin-beta.vercel.app/opengraph-image.jpg",
          width: 1953,
          height: 2253,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "School Course App",
      description: "A simple course web app for schools",
      images: [
        {
          url: "https://nextjs-practice-eosin-beta.vercel.app/twitter-image.jpg",
          width: 1953,
          height: 2253,
          type: "image/jpeg",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const product = await getProductById(id);

  if (!product) notFound();

  const {
    title = MOCK_PRODUCTS[0].title,
    description = MOCK_PRODUCTS[0].description,
    sales = MOCK_PRODUCTS[0].sales,
    originalPrice = MOCK_PRODUCTS[0].originalPrice,
    salePrice = MOCK_PRODUCTS[0].salePrice,
    coverImageUrl = MOCK_PRODUCTS[0].coverImageUrl,
  } = product;

  return (
    <main>
      <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl min-h-[66vh] my-0 pt-20 flex flex-col gap-15 mx-auto">
        <div className="flex flex-col gap-10">
          <h3 className="text-foreground text-4xl font-bold text-center">
            {title}
          </h3>
          <p className="text-foreground-100 text-2xl text-center">
            {description || PLACEHOLDER_PRODUCT_DESCRIPTION}
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between gap-4 lg:gap-0">
          <div className="flex flex-col gap-15">
            <div className="flex flex-col gap-4">
              <div className="bg-content1 flex items-center gap-2 rounded px-8 sm:px-15 py-3 text-foreground text-sm font-medium shadow-medium">
                <MediaIcon />
                Get 16 lessons in 3 hours
              </div>

              <div className="bg-content1 flex items-center gap-2 rounded px-8 sm:px-15 py-3 text-foreground text-sm font-medium shadow-medium">
                <GoalIcon />
                Daily guided exercises
              </div>

              <div className="bg-content1 flex items-center gap-2 rounded px-8 sm:px-15 py-3 text-foreground text-sm font-medium shadow-medium">
                <CommunityIcon />
                Access to 50k+ community
              </div>

              <div className="bg-content1 flex items-center gap-2 rounded px-8 sm:px-15 py-3 text-foreground text-sm font-medium shadow-medium">
                <FeedbackIcon />
                Regular expert feedback
              </div>
            </div>
            <Card className="overflow-visible relative">
              <div className="w-10 h-10 flex justify-center items-center rounded-full text-base text-white bg-gradient-to-tr from-primary to-danger absolute -top-[14%] right-[44%] z-10">
                by
              </div>
              <CardBody className="pl-4 pt-6 flex flex-col gap-3">
                <div className="flex gap-4">
                  <Image
                    src={MOCK_LECTURER_AVATAR.src}
                    alt={MOCK_LECTURER_AVATAR.alt}
                    width={52}
                    height={52}
                    radius="sm"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-primary text-base font-bold">
                      Vako Shvili
                    </p>
                    <p className="text-foreground text-sm">Web Designer</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <AvatarGroup>
                    {MOCK_LEARNER_AVATARS.map((avatar, index) => (
                      <Avatar
                        key={index}
                        src={avatar.src}
                        alt={avatar.alt}
                        classNames={{
                          base: "w-6 h-6",
                        }}
                        isBordered={false}
                      />
                    ))}
                  </AvatarGroup>
                  <p className="text-sm text-foreground-100">
                    <span className="font-bold text-danger">{sales}</span>{" "}
                    people have joined already
                  </p>
                </div>
              </CardBody>
              <CardFooter className="p-0">
                <Button
                  color="default"
                  className="text-center text-foreground text-base w-full rounded-t-none rounded-b-large"
                  startContent={<PlayIcon />}
                >
                  Watch Trailer
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="flex flex-col gap-6 items-center justify-between">
            <Image
              src={coverImageUrl || PLACEHOLDER_COURSE_IMAGE}
              alt={`An image about ${title}`}
              width={480}
              height={360}
              isZoomed
            />

            <Button className="py-3 bg-gradient-to-tr from-primary to-danger text-white text-lg w-full rounded-lg">
              <p>
                Buy Now for ${salePrice}{" "}
                <span className="text-sm line-through">${originalPrice}</span>
              </p>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
