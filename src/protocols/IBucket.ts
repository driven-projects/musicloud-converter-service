export default interface IBucket {
  upload(filePath: string): Promise<string>;
  download(key: string): Promise<void>;
  destroy(key: string): Promise<void>;
}
