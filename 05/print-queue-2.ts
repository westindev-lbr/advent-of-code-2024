import { content, PagesOrderingRules } from "./print-queue-1";

export class PagesOrderingRulesExtend extends PagesOrderingRules {
  incorrectUpdates: number[][] = [];
  correctedUpdates: number[][] = [];

  constructor(content: string) {
    super(content);
    this.incorrectUpdates = this.pageUpdates.filter((x) => !this.isCorrectUpdate(x));
  }

  private _reorderUpdateToCorrect(update: number[]) {
    for (let i = 0; i < update.length; i++) {
      for (let j = i + 1; j < update.length; j++) {
        if (!this.isBefore(update[i], update[j])) {
          let temp = update[i];
          update[i] = update[j];
          update[j] = temp;
          this._reorderUpdateToCorrect(update);
        }
      }
    }
    return true;
  }

  fixIncorrectUpdates(): void {
    this.correctedUpdates = [];
    this.incorrectUpdates.forEach((x) => {
      let transformedElement = [...x];
      while (!this.isCorrectUpdate(transformedElement)) {
        this._reorderUpdateToCorrect(transformedElement);
      }
      this.correctedUpdates = [...this.correctedUpdates, transformedElement];
    });
  }
}

const pagesOredringRulesExt = new PagesOrderingRulesExtend(content);
pagesOredringRulesExt.fixIncorrectUpdates();
const result = pagesOredringRulesExt.computeSumOfMiddlePageNumber(pagesOredringRulesExt.correctedUpdates);
console.log(`sum of the middle page number from those new correctly-ordered updates is :  ${result}`);
