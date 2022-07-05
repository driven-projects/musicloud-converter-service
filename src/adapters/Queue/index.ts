import amqplib from "amqplib";

import IQueue, { TSubscriptionFn } from "@/protocols/IQueue";

export default class Queue implements IQueue {
  #queueName: string;

  constructor(queueName: string) {
    this.#queueName = queueName;
  }

  async publish(data: string) {
    const channel = await this.#createChannel();
    await channel.sendToQueue(this.#queueName, Buffer.from(data));
  }

  async subscribe(callback: TSubscriptionFn) {
    const channel = await this.#createChannel();
    channel.consume(this.#queueName, (data) => {
      callback(data.content.toString());
    }, { noAck: true });
  }

  async init() {
    await this.#createQueue();
  }

  async #createChannel() {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    return channel;
  }

  async #createQueue() {
    const channel = await this.#createChannel();
    await channel.assertQueue(this.#queueName, { durable: true });
  }
}
