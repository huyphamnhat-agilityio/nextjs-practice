import { PlanCardProps } from "@/components/common/PlanCard";

export const MOCK_PLAN: PlanCardProps = {
  isNew: false,
  title: "free",
  subTitle: "Organize across all apps by hand",
  price: 19,
  duration: "month",
  description: "Slate helps you see how many more days you need...",
  features: [
    {
      isSupported: true,
      feature: "Unlimited product updates",
    },
    {
      isSupported: true,
      feature: "Unlimited product updates",
    },
    {
      isSupported: true,
      feature: "Unlimited product updates",
    },
    {
      isSupported: false,
      feature: "1GB Cloud storage",
    },
    {
      isSupported: false,
      feature: "Email and community support",
    },
  ],
};
