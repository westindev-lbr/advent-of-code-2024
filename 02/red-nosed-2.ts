import { list, Report } from "./red-nosed-1";

export class ReportDampener extends Report {
  constructor(line: string) {
    super(line);
  }

  public isSafeWithSingleLvlTolerance(lambda: (a: number, b: number) => boolean): boolean {
    if (this.report.length < 1) throw false;
    if (this.report.length === 1) return true;
    if (this.isSafe(this.report)) return true;
    let i = 0;
    let isValid = false;
    let badLvlCount = 0;
    let indexToRemove = 0;
    while (i < this.report.length - 1) {
      const currentLvl = this.report[i];
      const nextLvl = this.report[i + 1];
      if (this._adjacentLvlDifferByLeastOneAndMostThree(currentLvl, nextLvl) && lambda(currentLvl, nextLvl)) {
        isValid = true;
      } else {
        if (badLvlCount > 1) {
          return false;
        } else {
          indexToRemove = i;
          badLvlCount++;
          const reportTemp1 = [...this.report];
          const reportTemp2 = [...this.report];
          reportTemp1.splice(indexToRemove, 1);
          reportTemp2.splice(indexToRemove + 1, 1);
          if (this.isSafe(reportTemp1) || this.isSafe(reportTemp2)) {
            return true;
          } else {
            return false;
          }
        }
      }
      i++;
    }
    return isValid;
  }
}

let reportCollection: ReportDampener[] = [];
for (const line of list) {
  const report = new ReportDampener(line);
  reportCollection = [...reportCollection, report];
}

const unsafeReportCollection = reportCollection.filter((x) => !x.isSafe(x.report));
let acc = reportCollection.length - unsafeReportCollection.length;
const unsafeReportCollectionAsc = [
  ...unsafeReportCollection.filter((x) => !x.isSafeWithSingleLvlTolerance((a, b) => a < b)),
];
acc += unsafeReportCollection.length - unsafeReportCollectionAsc.length;
const unsafeReportCollectionDesc = [
  ...unsafeReportCollectionAsc.filter((x) => !x.isSafeWithSingleLvlTolerance((a, b) => a > b)),
];
acc += unsafeReportCollectionAsc.length - unsafeReportCollectionDesc.length;
console.log("Number of safe reports with single level tolerance : ", acc);
