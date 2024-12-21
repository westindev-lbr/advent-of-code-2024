import * as fs from "fs/promises";
export const buffer = await fs.readFile("05/input.txt");
export const content = buffer.toString();

export type PageOrderRule = {
  before: number;
  after: number;
};

export class PagesOrderingRules {
  pageOrderRules: PageOrderRule[] = [];
  pageUpdates: number[][] = [];
  sections: string[] = [];
  constructor(public content: string) {
    this.sections = content.split("\n\n");
    this.initPagesOrderList();
    this.initUpdatesPages();
  }

  initPagesOrderList(): void {
    const listPagesOrder = this.sections[0].split("\n");
    const test = listPagesOrder.map((x) => x.split("|"));
    test.map((x) => this.pageOrderRules.push({ before: Number(x[0]), after: Number(x[1]) }));
  }

  initUpdatesPages(): void {
    const updatesPages = this.sections[1].split("\n");
    updatesPages.map((x) => this.pageUpdates.push([...x.split(",").map((x) => Number(x))]));
  }

  isBefore(value: number, after: number): boolean {
    return this.pageOrderRules.some((o) => o.before === value && o.after === after);
  }

  isCorrectUpdate(update: number[]) {
    for (let i = 0; i < update.length; i++) {
      for (let j = i + 1; j < update.length; j++) {
        if (!this.isBefore(update[i], update[j])) return false;
      }
    }
    return true;
  }

  getMiddlePageNumber(update: number[]): number {
    return update[Math.floor(update.length / 2)];
  }

  computeSumOfMiddlePageNumber(updates: number[][]): number {
    return updates.filter((x) => this.isCorrectUpdate(x)).reduce((acc, v) => acc + this.getMiddlePageNumber(v), 0);
  }
}

const pagesOredringRules = new PagesOrderingRules(content);
const result = pagesOredringRules.computeSumOfMiddlePageNumber(pagesOredringRules.pageUpdates);
console.log(`sum of the middle page number from those correctly-ordered updates is :  ${result}`);
