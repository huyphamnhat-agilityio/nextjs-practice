export type Subscription = {
  id: string;
  email: string;
};

export type SubscriptionForm = Omit<Subscription, "id">;
