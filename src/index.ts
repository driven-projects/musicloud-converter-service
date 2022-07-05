import "./setup";

import MetadataExtractor from "@/adapters/MetadataExtractor";
import FileConverter from "@/adapters/FileConverter";
import BucketProvider from "@/adapters/BucketProvider";

import SongConverter from "@/domain/SongConverter";
import Bucket from "@/domain/Bucket";

import ProcessSongUseCase from "@/usecases/ProcessSongUseCase";

class ConverterService {
  #processSongUseCase: ProcessSongUseCase

  constructor() {
    this.#processSongUseCase = this.#buildProcessSongUseCase();
  }

  async run() {
    await this.#processSongUseCase.execute("Mechanix.wav");
  }

  #buildProcessSongUseCase() {
    const converter = new FileConverter();
    const extractor = new MetadataExtractor();
    const songConverter = new SongConverter(extractor, converter);

    const bucketProvider = new BucketProvider(
      process.env.AWS_REGION,
      process.env.AWS_ACCESS_KEY_ID,
      process.env.AWS_SECRET_ACCESS_KEY,
      process.env.AWS_BUCKET_NAME
    );
    const bucket = new Bucket(bucketProvider);

    const useCase = new ProcessSongUseCase(songConverter, bucket);
    return useCase;
  }
}

new ConverterService().run();
