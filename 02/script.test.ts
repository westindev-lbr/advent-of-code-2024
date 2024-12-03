import * as fs from "node:fs/promises";
import { Report } from "./red-nosed-1";
import { ReportDampener } from "./red-nosed-2";
const buffer = await fs.readFile("02/test.txt");
const content = buffer.toString();
const list = content.split("\n");

describe("Red-Nosed TDD", () => {
  it("should return true if the line is decreasing", () => {
    const r = new Report(list[0]);
    expect(r.isValid(r.report, (a, b) => a > b)).toBeTruthy();
  });

  it("should return false if the line isn't either only decreasing or only increasing", () => {
    const r = new Report(list[1]);
    expect(r.isValid(r.report, (a, b) => a < b) || r.isValid(r.report, (a, b) => a > b)).toBeFalsy();
  });

  it("should return true if the line is safe ", () => {
    const r1 = new Report(list[0]);
    const r2 = new Report(list[5]);
    expect(r1.isSafe(r1.report)).toBeTruthy();
    expect(r2.isSafe(r2.report)).toBeTruthy();
  });

  it("should return 2 the number of safe reports from report collection", () => {
    let reportCollection: Report[] = [];
    for (const line of list) {
      const report = new Report(line);
      reportCollection = [...reportCollection, report];
    }
    const result = reportCollection.filter((x) => x.isSafe(x.report)).length;
    expect(result).toBe(2);
  });
  it("should return 4 the number of safe reports with single tolerance", () => {
    let reportCollection: ReportDampener[] = [];
    for (const line of list) {
      const report = new ReportDampener(line);
      reportCollection = [...reportCollection, report];
    }
    const unsafeReportCollection1 = [...reportCollection.filter((x) => !x.isSafe(x.report))];
    const unsafeReportCollection2 = [...reportCollection.filter((x) => !x.isSafe(x.report))];
    console.debug(unsafeReportCollection1);

    const unsafeReportCollectionDesc = [
      ...unsafeReportCollection2.filter((x) => !x.isSafeWithSingleLvlTolerance((a, b) => a > b)),
    ];
    let acc = unsafeReportCollection1.length - unsafeReportCollectionDesc.length;
    console.debug(unsafeReportCollectionDesc);

    acc += reportCollection.length - unsafeReportCollection1.length;
    const unsafeReportCollectionAsc = [
      ...unsafeReportCollectionDesc.filter((x) => !x.isSafeWithSingleLvlTolerance((a, b) => a < b)),
    ];
    console.debug(unsafeReportCollectionAsc);
    acc += unsafeReportCollectionDesc.length - unsafeReportCollectionAsc.length;
    expect(acc).toBe(8);
  });
});
