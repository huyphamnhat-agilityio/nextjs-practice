// Components
import { FeedbackCard } from "@/components";

// Types
import { FeedbackCardProps } from "@/components/common/FeedbackCard";

// Mocks
import { MOCK_AVATARS } from "@/mocks/avatar";

const FeedbackSection = () => {
  const mockFeedBacks: Array<FeedbackCardProps & { id: string }> = [
    {
      id: "1",
      avatar: MOCK_AVATARS[0],
      comment:
        "Slate helps you see how many more days you need to work to reach your financial goal for the month and year.",
      rate: 3,
      user: {
        id: "1",
        name: "Regina Miles",
        role: "Designer",
      },
    },
    {
      id: "2",
      avatar: MOCK_AVATARS[1],
      comment:
        "Slate helps you see how many more days you need to work to reach your financial goal for the month and year.",
      rate: 4,
      user: {
        id: "1",
        name: "Regina Miles",
        role: "Designer",
      },
    },
    {
      id: "3",
      avatar: MOCK_AVATARS[2],
      comment:
        "Slate helps you see how many more days you need to work to reach your financial goal for the month and year.",
      rate: 5,
      user: {
        id: "1",
        name: "Regina Miles",
        role: "Designer",
      },
    },
  ];
  return (
    <section>
      <div className="flex justify-center">
        <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 py-40 flex flex-col gap-20">
          <div className="flex flex-col gap-2.5 text-center 2xl:text-start">
            <p className="text-primary text-sm/6 font-bold">Practice Advice</p>
            <h2 className="text-foreground text-5xl/12.5 font-bold">
              Approdable Packages
            </h2>
            <p className="text-foreground-100 text-sm whitespace-pre-line">
              {`Problems trying to resolve the conflict between
              the two major realms of Classical physics: Newtonian mechanics`}
            </p>
          </div>
          <div className="flex flex-wrap gap-7.5 justify-evenly">
            {mockFeedBacks.map((feedback) => (
              <FeedbackCard key={feedback.id} {...feedback} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
