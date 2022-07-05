import IConversionQueue from "@/protocols/IConversionQueue";
import IQueue from "@/protocols/IQueue";

type TRunnerFn = (key: string) => Promise<Object>;

export default class ConversionQueue implements IConversionQueue {
  #uploadQueue: IQueue;
  #convertedQueue: IQueue;
  #runner: TRunnerFn;

  constructor(uploadQueue: IQueue, convertedQueue: IQueue, runner: TRunnerFn) {
    this.#uploadQueue = uploadQueue;
    this.#convertedQueue = convertedQueue;
    this.#runner = runner;
  }

  async run() {
    await this.#uploadQueue.init();
    await this.#convertedQueue.init();

    this.#uploadQueue.subscribe(async (data) => {
      const payload = JSON.parse(data);
      const key = payload.key as string;
      const result = await this.#runner(key);
      const conversionResult = JSON.stringify(result);
      this.#convertedQueue.publish(conversionResult);
    });
  }
}
