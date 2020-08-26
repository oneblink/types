// @flow

declare type PushSubscription = {
  endpoint: string,
  expirationTime: string | null,
  keys: {
    p256dh: string,
    auth: string,
  },
}

declare type FormsAppUserSubscription = {
  username: string,
  formsAppId: number,
  pushSubscriptions: PushSubscription[],
  createdAt: Date,
  updatedAt: Date,
}
