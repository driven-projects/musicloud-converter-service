export default class CannotExtractMusicMetadataError extends Error {
  constructor() {
    super("Error trying to extract music file metadata!");
    this.name = "CannotExtractMusicMetadataError";
  }
}
