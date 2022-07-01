export default interface IFileConverter {
  convertToMp3(inputFilePath: string, outputFilePath: string): Promise<void>;
}
