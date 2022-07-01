import MetadataExtractor from "@/adapters/MetadataExtractor";
import FileConverter from "@/adapters/FileConverter";

import SongConverter from "@/domain/SongConverter";

const converter = new FileConverter();
const extractor = new MetadataExtractor();
const songConverter = new SongConverter(extractor, converter);

(async () => {
  const info = await songConverter.convert("./08. Mechanix.mp3");
  console.log(info);
})();
