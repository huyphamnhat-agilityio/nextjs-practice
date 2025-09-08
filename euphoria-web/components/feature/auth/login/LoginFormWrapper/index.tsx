import Image from "next/image";

// Icons
import { GoogleIcon, TwitterIcon } from "@/components/icons";

// Components
import { Button, Separator } from "@/components/ui/common";
import { IMAGES } from "@/constants";

const LoginFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex-1 flex flex-col lg:flex-row mx-auto w-full">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden min-h-[400px]">
        <Image
          priority
          fetchPriority="high"
          src={IMAGES.HERO}
          alt="Happy friends"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="font-core-sans-c font-bold text-left text-4xl text-foreground">
              Sign In Page
            </h1>
          </div>

          <div className="space-y-4">
            {/* Social Login Buttons */}
            <Button
              variant="social"
              size="lg"
              className="text-base font-normal"
            >
              <GoogleIcon />
              Continue With Google
            </Button>

            <Button
              variant="social"
              size="lg"
              className="text-base font-normal"
            >
              <TwitterIcon />
              Continue With Twitter
            </Button>

            {/* Divider */}
            <div className="flex items-center space-x-4">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormWrapper;
