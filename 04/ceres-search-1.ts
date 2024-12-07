import * as fs from "fs/promises";
const buffer = await fs.readFile("04/input.txt");
export const content = buffer.toString();

export class CeresSearch {
  horizontals: string[] = [];
  verticals: string[] = [];
  mainDiagonals: string[] = [];
  secondaryDiagonals: string[] = [];

  constructor(public content: string) {
    this.setHorizontals();
    this.setVerticals();
    this.setMainDiagonals();
    this.setSecondaryDiagonals();
  }

  setHorizontals(): void {
    this.horizontals = this.content.split("\n");
  }

  setVerticals(): void {
    for (let i = 0; i < this.horizontals.length; i++) {
      let verticalString: string[] = [];
      for (let j = 0; j < this.horizontals.length; j++) {
        verticalString = [...verticalString, this.horizontals[j][i]];
      }
      this.verticals.push(verticalString.join(""));
    }
  }

  setMainDiagonals(): void {
    for (let k = -this.horizontals.length + 1; k < this.horizontals.length; k++) {
      let mainDiagonals: string[] = [];
      for (let i = 0; i < this.horizontals.length; i++) {
        for (let j = 0; j < this.horizontals.length; j++) {
          if (i - j === k) {
            mainDiagonals = [...mainDiagonals, this.horizontals[i][j]];
          }
        }
      }
      this.mainDiagonals.push(mainDiagonals.join(""));
    }
  }

  setSecondaryDiagonals(): void {
    for (let k = 0; k < 2 * this.horizontals.length - 1; k++) {
      let secondaryDiagonals: string[] = [];
      for (let i = 0; i < this.horizontals.length; i++) {
        for (let j = 0; j < this.horizontals.length; j++) {
          if (i + j === k) {
            secondaryDiagonals = [...secondaryDiagonals, this.horizontals[i][j]];
          }
        }
      }
      this.secondaryDiagonals.push(secondaryDiagonals.join(""));
    }
  }

  countPattern(content: string[], pattern: RegExp): number {
    let result = 0;
    for (const line of content) {
      let some = line.match(pattern);
      if (some) result += some?.length;
    }
    return result;
  }

  countPatternInAllDirections(pattern: RegExp, reversePattern: RegExp): number {
    let result = 0;
    result += this.countPattern(this.horizontals, pattern);
    result += this.countPattern(this.horizontals, reversePattern);
    result += this.countPattern(this.verticals, pattern);
    result += this.countPattern(this.verticals, reversePattern);
    result += this.countPattern(this.mainDiagonals, pattern);
    result += this.countPattern(this.mainDiagonals, reversePattern);
    result += this.countPattern(this.secondaryDiagonals, pattern);
    result += this.countPattern(this.secondaryDiagonals, reversePattern);
    return result;
  }
}

const ceres = new CeresSearch(content);
const result = ceres.countPatternInAllDirections(/XMAS/g, /SAMX/g);
console.log("How many times does XMAS appear : ", result);
