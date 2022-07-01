import MusicMetadata from "music-metadata";
import path from "path";

import IMetadataExtractor from "@/protocols/IMetadataExtractor";

import CannotExtractMusicMetadataError from "@/errors/CannotExtractMusicMetadataError";

export default class MetadataExtractor implements IMetadataExtractor {
  #basePath: string;
  
  constructor(basePath: string = "./") {
    this.#basePath = basePath;
  }

  async parse(file: string) {
    const filepath = path.resolve(this.#basePath, file);

    try {
      const metadata = await MusicMetadata.parseFile(filepath);
      return {
        title: metadata.common.title,
        artist: metadata.common.artist,
        album: metadata.common.album,
        genres: metadata.common.genre,
        year: metadata.common.year
      };
    } catch (err) {
      console.error('MusicMetadata error:', err);
      throw new CannotExtractMusicMetadataError();
    }
  }
}
