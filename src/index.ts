import MetadataExtractor from "@/adapters/MetadataExtractor";
import FileConverter from "./adapters/FileConverter";

const converter = new FileConverter();
const extractor = new MetadataExtractor();

(async () => {
  await converter.convertToMp3("./Mechanix.wav", "./Mechanix 3.mp3");
  const metadata = await extractor.parse("./Mechanix 3.mp3");
  console.log(metadata);
})();
