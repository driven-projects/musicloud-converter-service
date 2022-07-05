export type TSubscriptionFn = (data: string) => unknown;

export default interface IQueue {
  publish(data: string): Promise<void>;
  subscribe(fn: TSubscriptionFn): Promise<void>;
}
