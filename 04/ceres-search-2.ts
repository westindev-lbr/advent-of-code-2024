import { CeresSearch, content } from "./ceres-search-1";

export class CeresSearchExtend extends CeresSearch {
  constructor(content: string) {
    super(content);
  }

  countX_masValid(): number {
    let result = 0;
    for (let i = 1; i < this.horizontals.length - 1; i++) {
      for (let j = 1; j < this.horizontals.length - 1; j++) {
        if (this.horizontals[i][j] === "A") {
          const mainDiag: string = `${this.horizontals[i - 1][j - 1]}${this.horizontals[i][j]}${
            this.horizontals[i + 1][j + 1]
          }`;
          const secDiag: string = `${this.horizontals[i + 1][j - 1]}${this.horizontals[i][j]}${
            this.horizontals[i - 1][j + 1]
          }`;
          if (mainDiag.match(/(MAS|SAM)/g) && secDiag.match(/(MAS|SAM)/g)) {
            result++;
          }
        }
      }
    }
    return result;
  }
}

const ceresPartTwo = new CeresSearchExtend(content);
const result = ceresPartTwo.countX_masValid();
console.log("How many times does an X-MAS appear ? ", result);
