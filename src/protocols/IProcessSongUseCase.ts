import { IMetadata } from "@/protocols/IMetadataExtractor";

export interface IProcessedSong extends IMetadata {
  name: string;
}

export default interface IProcessSongUseCase {
  execute(key: string): Promise<IProcessedSong>;
}
