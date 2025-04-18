import path from "path";

import { DocxInfo } from "./egpdf/docx-extract/docxInfo";

const docxPath = path.join(__dirname, "dev-data/nlp_word_extractor_demo.docx");

try {
  new DocxInfo(docxPath);
} catch (err) {
  if (err instanceof Error) {
    console.error("Client-facing error:", err.message);
  } else {
    console.error("Client-facing error:", err);
  }
}
