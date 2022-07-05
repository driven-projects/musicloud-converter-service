import fs from "fs/promises";
import path from "path";

import IBucket from "@/protocols/IBucket";
import IBucketProvider from "@/protocols/IBucketProvider";

export default class Bucket implements IBucket {
  #bucketProvider: IBucketProvider;

  constructor(bucketProvider: IBucketProvider) {
    this.#bucketProvider = bucketProvider;
  }

  async upload(filePath: string) {
    const name = this.#generateRandomName() + ".mp3";
    await this.#bucketProvider.upload(filePath, name);
    return name;
  }

  async download(key: string) {
    await this.#createDownloadDirIfDoesntExist();
    const destinationPath = path.join("downloads", key);
    await this.#bucketProvider.download(key, destinationPath);
  }

  async destroy(key: string) {
    await this.#bucketProvider.destroy(key);
  }

  #generateRandomName() {
    const now = new Date().toISOString();
    return now.replaceAll("-", "").replaceAll(":", "").replace("T", "")
          + '-'
          + (Math.random() + 1).toString(36).substring(2)
  }

  async #createDownloadDirIfDoesntExist() {
    try {
      await fs.access("./downloads");
    } catch {
      await fs.mkdir("./downloads");
    }
  }
}
