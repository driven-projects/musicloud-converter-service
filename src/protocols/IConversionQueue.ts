export default interface IConversionQueue {
  run(): Promise<void>;
}
