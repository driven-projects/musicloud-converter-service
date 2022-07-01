export interface IMetadata {
  title?: string;
  artist?: string;
  album?: string;
  genres?: string[];
  year?: number;
}

export default interface IMetadataExtractor {
  parse(file: string): Promise<IMetadata>;
}
