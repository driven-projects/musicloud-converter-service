import { S3Client, GetObjectCommand, PutObjectCommand, GetObjectCommandOutput, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import internal from "stream";

import IBucketProvider from "@/protocols/IBucketProvider";

export default class BucketProvider implements IBucketProvider {
  #s3Client: S3Client;
  #bucketName: string;

  constructor(region: string, accessKeyId: string, secretAccessKey: string, bucketName: string) {
    this.#bucketName = bucketName;
    
    const config = {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    };

    this.#s3Client = new S3Client(config);
  }

  async upload(filePath: string, name?: string) {
    const readStream = fs.createReadStream(filePath);
    await this.#s3Client.send(new PutObjectCommand({
      Bucket: this.#bucketName,
      Key: name,
      Body: readStream
    }));
  }

  async download(name: string, destinationPath: string) {
    const data = await this.#s3Client.send(new GetObjectCommand({
      Bucket: this.#bucketName,
      Key: name
    }));

    const writeStream = fs.createWriteStream(destinationPath);
    return new Promise((resolve: (a: void) => void, reject) => {
      if (data.Body instanceof internal.Readable) {
        const readableStream = data.Body as internal.Readable;
        readableStream.pipe(writeStream);
        readableStream.on("end", () => {
          resolve();
        });
        readableStream.on("error", reject);
      }
    });
  }

  async destroy(key: string) {
    await this.#s3Client.send(new DeleteObjectCommand({
      Bucket: this.#bucketName,
      Key: key
    }));
  }
}
