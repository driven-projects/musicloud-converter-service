import { IMetadata } from "@/protocols/IMetadataExtractor";

export interface IConvertedSong extends IMetadata {
  filepath: string;
}

export default interface ISongConverter {
  convert(inputFile: string): Promise<IConvertedSong>;
}
