import IMetadataExtractor from "@/protocols/IMetadataExtractor";
import IFileConverter from "@/protocols/IFileConverter";
import ISongConverter from "@/protocols/ISongConverter";

export default class SongConverter implements ISongConverter {
  #metadataExtractor: IMetadataExtractor;
  #fileConverter: IFileConverter;

  constructor(metadataExtractor: IMetadataExtractor, fileConverter: IFileConverter) {
    this.#metadataExtractor = metadataExtractor;
    this.#fileConverter = fileConverter;
  }

  async convert(inputFile: string) {
    const now = new Date().toISOString();
    const parts = inputFile.split("/");

    const outputFile = `${now}-${parts[parts.length - 1]}`;
    await this.#fileConverter.convertToMp3(inputFile, outputFile);

    const metadata = await this.#metadataExtractor.parse(outputFile);

    return {
      filepath: outputFile,
      ...metadata
    };
  }
}