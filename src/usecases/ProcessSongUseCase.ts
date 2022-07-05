import fs from "fs/promises";

import ISongConverter, { IConvertedSong } from "@/protocols/ISongConverter";
import IBucket from "@/protocols/IBucket";
import IProcessSongUseCase, { IProcessedSong } from "@/protocols/IProcessSongUseCase";

export default class ProcessSongUseCase implements IProcessSongUseCase {
  #songConverter: ISongConverter;
  #bucket: IBucket;
  
  constructor(songConverter: ISongConverter, bucket: IBucket) {
    this.#songConverter = songConverter;
    this.#bucket = bucket;
  }

  async execute(key: string) {
    await this.#bucket.download(key);
    const metadata = await this.#songConverter.convert(`./downloads/${key}`);
    const newName = await this.#bucket.upload(metadata.filepath);
    
    await this.#cleanup(key, metadata);

    delete metadata.filepath;

    return {
      name: newName,
      ...metadata
    };
  }

  async #cleanup(key: string, metadata: IConvertedSong) {
    await fs.rm(metadata.filepath);
    await fs.rm(`./downloads/${key}`);
    await this.#bucket.destroy(key);
  }
}
