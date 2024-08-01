import { Input } from "@nextui-org/react";

// Components
import { Button } from "@/components";

const SubscribeSection = () => {
  return (
    <section>
      <div className="max-w-lg md:max-w-4xl lg:max-w-5xl my-0 mx-auto py-40 flex flex-col gap-20">
        <div className="flex flex-col gap-2.5 text-center">
          <h6 className="text-primary text-sm/6 font-bold">Newsletter</h6>
          <h3 className="text-foreground text-2xl font-bold">
            Most Popular Courses
          </h3>
          <p className="text-foreground-100 text-sm">
            Problems trying to resolve the conflict between
            <br />
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
        <form className="flex flex-col gap-2 items-center">
          <Input
            type="email"
            placeholder="Your Email"
            classNames={{
              inputWrapper:
                "max-w-[80%] sm:max-w-172 self-center  bg-foreground-200 py-3.75 px-4 !rounded-1.25 border border-foreground-300 h-auto relative",
              input: "text-foreground-100 text-sm/7 h-auto",
            }}
            endContent={
              <Button
                size="md"
                className="hidden sm:block px-5.625 text-white text-sm/7 absolute right-0 rounded-l-none rounded-r-1.25"
              >
                Subscribe
              </Button>
            }
          />

          <Button
            size="md"
            className="sm:hidden px-5.625 text-white text-sm/7 w-full max-w-[80%]"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
