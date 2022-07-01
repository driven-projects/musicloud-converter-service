import ffmpeg from "fluent-ffmpeg";
import path from "path";

import IFileConverter from "@/protocols/IFileConverter";

export default class FileConverter implements IFileConverter {
  #basePath: string;

  constructor(basePath: string = ".") {
    this.#basePath = basePath;
  }

  convertToMp3(inputFilePath: string, outputFilePath: string): Promise<void> {
    return new Promise((resolve) => {
      const input = path.resolve(this.#basePath, inputFilePath);
      const output = path.resolve(this.#basePath, outputFilePath);

      ffmpeg(input).format("mp3").output(output).on("end", () => resolve()).run();
    });
  }
}
