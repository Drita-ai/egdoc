import { DocxInfo } from "./docxInfo";
import WordExtractor from "word-extractor";

import { Page, Section } from '../types/types';

export class DocxDataExtractor extends DocxInfo {
  public content: string = "";
  private _structuredContent: Page[] = [];

  constructor(filePath: string) {
    super(filePath);
  }

  async init(): Promise<void> {
    const extractor = new WordExtractor();
    const doc = await extractor.extract(this.docxPath);

    // Actual Content
    this.content = doc.getBody();

    this._extractContent();
  }

  private _extractContent(): void {
    const lines = this.content.split("\n");

    // Structured Content
    this._structuredContent = this.extractPages(lines);
  }

  // GET Structured Content
  public get structuredContent(): Page[] {
    return this._structuredContent;
  }

  private extractPages(lines: string[]): Page[] {
    const pages: Page[] = [];

    // Storage for data based on current page
    let currentPage: Page = [];

    // Storage for data based on current section
    let currentSection: Section = { heading: undefined, content: [] };
    let isInBulletBlock = false;
    let bulletBuffer: string[] = [];

    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      if (DocxDataExtractor.isHeader(line)) {
        // Push previous section to page
        if (currentSection.content.length > 0) {
          currentPage.push(currentSection);
        }
        const headingText = line.replace(/\[\s*header\s*\]/i, "").trim();
        currentSection = { heading: headingText || undefined, content: [] };
      }
      // Initialize handling Bullet Point
      else if (DocxDataExtractor.isBPStart(line)) {
        isInBulletBlock = true;
        bulletBuffer = [];
      }
      // Handle ending of Bullet Point
      else if (DocxDataExtractor.isBPEnd(line)) {
        isInBulletBlock = false;
        if (bulletBuffer.length > 0) {
          currentSection.content.push({
            type: "bullet",
            content: [...bulletBuffer],
          });
        }
        bulletBuffer = [];
      } else if (DocxDataExtractor.isPageEnd(line)) {
        if (currentSection.content.length > 0) {
          currentPage.push(currentSection);
        }
        pages.push(currentPage);

        // Reset for next page
        currentPage = [];
        currentSection = { heading: undefined, content: [] };
      } else {
        if (isInBulletBlock) {
          bulletBuffer.push(line);
        } else {
          currentSection.content.push({ type: "paragraph", content: line });
        }
      }
    }

    // Final flush
    if (currentSection.content.length > 0) {
      currentPage.push(currentSection);
    }
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  }

  static isHeader = (line: string) => /\[\s*header\s*\]/i.test(line);

  static isBPStart = (line: string) => /\[\s*bp\s*\]/i.test(line);

  static isBPEnd = (line: string) => /\[\s*ebp\s*\]/i.test(line);

  static isPageEnd = (line: string) => /!!!/.test(line);
}
