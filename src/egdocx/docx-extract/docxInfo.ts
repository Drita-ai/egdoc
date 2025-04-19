enum AcceptType {
  docx = "docx",
  doc = "doc",
}

export class DocxInfo {
  acceptFileType!: AcceptType;
  docxExt!: string;

  constructor(public docxPath: string) {
    const ext = this.extractExt(docxPath)!;
    this.validExt(ext);
  }

  validExt(docxExt: string) {
    this.docxExt = docxExt;

    const enumValues = Object.values(AcceptType);

    if (Object.values(AcceptType).includes(docxExt as AcceptType)) {
      this.acceptFileType = docxExt as AcceptType;
    } else {
      throw new Error(
        `Provided file does not have a supported extension. Expected one of: ${enumValues.join(
          ", "
        )}, but got "${docxExt}"`
      );
    }
  }

  extractExt(docxPath: string): string {
    const basename = docxPath.split(/[\\/]/).pop();

    if (!basename) {
      throw new Error("Invalid path: filename is undefined");
    }

    const pos = basename.lastIndexOf(".");

    if (basename === "" || pos < 1) {
      throw new Error("File does not have a valid extension");
    }

    return basename.slice(pos + 1).toLowerCase();
  }
}
