import { Historian } from "./historian-1";
import * as fs from "node:fs/promises";
import { HistorianFinal } from "./historian-2";
const buffer = await fs.readFile("day1/test.txt");

describe("Historian TDD", () => {
  const content = buffer.toString();
  const list = content
    .split("\n")
    .map((e) => e.split("   "))
    .flat();
  const historian = new Historian(list);
  const historianFinal = new HistorianFinal(list);

  it("should split in two list left and right", () => {
    expect(historian.left).toEqual([1, 2, 3, 3, 3, 4]);
    expect(historian.right).toEqual([3, 3, 3, 4, 5, 9]);
  });

  it("should be far apart for the first one a distance of 2", () => {
    const distance = historian.right[0] - historian.left[0];
    expect(distance).toBe(2);
  });

  it("should the sum of distance between left and right list be of 11", () => {
    const sum = historian.computeSumOfDistance();
    expect(sum).toBe(11);
  });

  it("should return a similary score of 0 for first element of left list", () => {
    const score = historianFinal.scoreSet.get(historianFinal.left[0]);
    expect(score).toBe(0);
  });

  it("should return a sum of similary score of 31", () => {
    const sum = historianFinal.computeSumOfSimilaryScore();
    expect(sum).toBe(31);
  });
});
