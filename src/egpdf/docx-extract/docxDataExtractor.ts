import { DocxInfo } from "./docxInfo";
import WordExtractor from "word-extractor";

export class DocxDataExtractor extends DocxInfo {
  public content: string = "";

  constructor(filePath: string) {
    super(filePath);
  }

  async init() {
    // Instantiating Extractor Module
    const extractor = new WordExtractor();

    // Extracting the data
    const doc = await extractor.extract(this.docxPath);
    this.content = doc.getBody();

    this._extractContent();
  }

  private _extractContent() {
    console.log(this.content);
  }
}
