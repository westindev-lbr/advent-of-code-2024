import * as fs from "node:fs/promises";

const buffer = await fs.readFile("02/input.txt");
export const content = buffer.toString();
export const list: string[] = content
  .split("\n")
  .map((e) => e.split("   "))
  .flat();

export class Report {
  report: number[];
  constructor(line: string) {
    this.report = line.split(" ").map((x) => Number(x));
  }

  protected _adjacentLvlDifferByLeastOneAndMostThree(first: number, second: number): boolean {
    return Math.abs(first - second) <= 3 && Math.abs(first - second) >= 1;
  }

  isValid(report: number[], lambda: (a: number, b: number) => boolean): boolean {
    if (report.length < 1) return false;
    if (report.length === 1) return true;
    let i = 0;
    let isValid = false;
    while (i < report.length - 1) {
      const currentLvl = report[i];
      const nextLvl = report[i + 1];
      if (this._adjacentLvlDifferByLeastOneAndMostThree(currentLvl, nextLvl) && lambda(currentLvl, nextLvl)) {
        isValid = true;
      } else {
        return false;
      }
      i++;
    }
    return isValid;
  }

  isSafe(report: number[]): boolean {
    return this.isValid(report, (a, b) => a < b) || this.isValid(report, (a, b) => a > b);
  }
}

let reportCollection: Report[] = [];
for (const line of list) {
  const report = new Report(line);
  reportCollection = [...reportCollection, report];
}
const result = reportCollection.filter((x) => x.isSafe(x.report)).length;
console.log("Number of safe reports : ", result);
