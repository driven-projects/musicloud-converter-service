import { IMetadata } from "@/protocols/IMetadataExtractor";

interface IConvertedSong extends IMetadata {
  filepath: string;
}

export default interface ISongConverter {
  convert(inputFile: string): Promise<IConvertedSong>;
}
