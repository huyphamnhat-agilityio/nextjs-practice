import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  Skeleton,
} from "@nextui-org/react";
import Image from "next/image";

// Mocks
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
  DownloadIcon,
  FeedbackIcon,
  GoalIcon,
  MediaIcon,
  PlayIcon,
} from "@/components";

export default async function Loading() {
  const {
    id,
    category,
    title,
    description,
    rate,
    sales,
    originalPrice,
    salePrice,
    coverImageUrl,
  } = MOCK_PRODUCTS[0];
  return (
    <main>
      <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl min-h-[66vh] my-0 pt-20 flex flex-col gap-15 mx-auto">
        <div className="flex flex-col gap-10">
          <h3 className="text-foreground text-4xl font-bold text-center">
            <Skeleton>{title}</Skeleton>
          </h3>

          <Skeleton>
            <p className="text-foreground-100 text-2xl text-center">
              {description || PLACEHOLDER_PRODUCT_DESCRIPTION}
            </p>
          </Skeleton>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between gap-4 lg:gap-0">
          <div className="flex flex-col gap-15">
            <div className="flex flex-col gap-4">
              <Skeleton>
                <div className="bg-content1 flex items-center gap-2 rounded px-8 sm:px-15 py-3 text-foreground text-sm font-medium shadow-medium">
                  <MediaIcon />
                  Get 16 lessons in 3 hours
                </div>
              </Skeleton>

              <Skeleton>
                <div className="bg-content1 flex items-center gap-2 rounded px-8 sm:px-15 py-3 text-foreground text-sm font-medium shadow-medium">
                  <GoalIcon />
                  Daily guided exercises
                </div>
              </Skeleton>

              <Skeleton>
                <div className="bg-content1 flex items-center gap-2 rounded px-8 sm:px-15 py-3 text-foreground text-sm font-medium shadow-medium">
                  <CommunityIcon />
                  Access to 50k+ community
                </div>
              </Skeleton>

              <Skeleton>
                <div className="bg-content1 flex items-center gap-2 rounded px-8 sm:px-15 py-3 text-foreground text-sm font-medium shadow-medium">
                  <FeedbackIcon />
                  Regular expert feedback
                </div>
              </Skeleton>
            </div>
            <Skeleton>
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
            </Skeleton>
          </div>
          <div className="flex flex-col gap-6 items-center justify-between">
            <Skeleton>
              <Image
                src={PLACEHOLDER_COURSE_IMAGE}
                alt=""
                width={480}
                height={360}
              />
            </Skeleton>

            <Skeleton className="w-full">
              <Button className="py-3 bg-gradient-to-tr from-primary to-danger text-white text-lg w-full rounded-lg">
                <p>
                  Buy Now for ${salePrice}{" "}
                  <span className="text-sm line-through">${originalPrice}</span>
                </p>
              </Button>
            </Skeleton>
          </div>
        </div>
      </div>
    </main>
  );
}
