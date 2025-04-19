import path from "path";

import { DocxDataExtractor } from "./egdocx/docx-extract/docxDataExtractor";

const docxPath = path.join(__dirname, "dev-data/a.docx");

(async () => {
  try {
    const extractor = new DocxDataExtractor(docxPath);
    await extractor.init();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Client-facing error:", err.message);
    } else {
      console.error("Client-facing error:", err);
    }
  }
})();
