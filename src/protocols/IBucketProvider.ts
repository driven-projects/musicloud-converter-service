export default interface IBucketProvider {
  upload(filePath: string, name: string): Promise<void>;
  download(name: string, destinationPath: string): Promise<void>;
  destroy(name: string): Promise<void>;
}
