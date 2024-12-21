import * as fs from "fs/promises";
import { PagesOrderingRules } from "./print-queue-1";
import { PagesOrderingRulesExtend } from "./print-queue-2";
const buffer = await fs.readFile("05/test.txt");
const content = buffer.toString();

describe("Print Queue TDD", () => {
  const pagesOredringRules = new PagesOrderingRules(content);
  const pagesOrderingRulesExt = new PagesOrderingRulesExtend(content);

  beforeAll(() => {});

  it("should verify that 75 is before 47, 61, 53, 29", () => {
    const isBefore47 = pagesOredringRules.isBefore(75, 47);
    const isBefore61 = pagesOredringRules.isBefore(75, 61);
    const isBefore53 = pagesOredringRules.isBefore(75, 53);
    const isBefore29 = pagesOredringRules.isBefore(75, 29);
    expect(isBefore47).toBe(true);
    expect(isBefore61).toBe(true);
    expect(isBefore53).toBe(true);
    expect(isBefore29).toBe(true);
  });

  it("should verify that 75 is before 97,47,61,53", () => {
    const isBefore97 = pagesOredringRules.isBefore(75, 97);
    const isBefore47 = pagesOredringRules.isBefore(75, 47);
    const isBefore61 = pagesOredringRules.isBefore(75, 61);
    const isBefore53 = pagesOredringRules.isBefore(75, 53);
    expect(isBefore97).toBe(false);
    expect(isBefore47).toBe(true);
    expect(isBefore61).toBe(true);
    expect(isBefore53).toBe(true);
  });

  it("should verify that [75,47,61,53,29] is a correct update", () => {
    const update = [75, 47, 61, 53, 29];
    const isCorrect = pagesOredringRules.isCorrectUpdate(update);
    expect(isCorrect).toBe(true);
  });
  it("should verify that [97, 61, 53, 29, 13] is a correct update", () => {
    const update = [97, 61, 53, 29, 13];
    const isCorrect = pagesOredringRules.isCorrectUpdate(update);
    expect(isCorrect).toBe(true);
  });
  it("should verify that [75, 29, 13] is a correct update", () => {
    const update = [75, 29, 13];
    const isCorrect = pagesOredringRules.isCorrectUpdate(update);
    expect(isCorrect).toBe(true);
  });

  it("should verify that [75,97,47,61,53] is an incorrect update", () => {
    const update = [75, 97, 47, 61, 53];
    const isCorrect = pagesOredringRules.isCorrectUpdate(update);
    expect(isCorrect).toBe(false);
  });

  it("should verify that [61,13,29] is an incorrect update", () => {
    const update = [61, 13, 29];
    const isCorrect = pagesOredringRules.isCorrectUpdate(update);
    expect(isCorrect).toBe(false);
  });

  it("should verify that [97, 13, 75, 29, 47] is an incorrect update", () => {
    const update = [97, 13, 75, 29, 47];
    const isCorrect = pagesOredringRules.isCorrectUpdate(update);
    expect(isCorrect).toBe(false);
  });

  it("should verify that 61 is the middle of update : [75,47,61,53,29]", () => {
    const update = [75, 47, 61, 53, 29];
    const num = pagesOredringRules.getMiddlePageNumber(update);
    expect(num).toBe(61);
  });

  it("should return 143 the sum of middle of correct update list", () => {
    const num = pagesOredringRules.computeSumOfMiddlePageNumber(pagesOredringRules.pageUpdates);
    expect(num).toBe(143);
  });

  it("should return [75,97,47,61,53] as the first incorrect update", () => {
    const update = pagesOrderingRulesExt.incorrectUpdates[0];
    expect(update).toEqual([75, 97, 47, 61, 53]);
  });
  it("should return 97,75,47,61,53 as the new order of firt not correct update ", () => {
    pagesOrderingRulesExt.fixIncorrectUpdates();
    let update = pagesOrderingRulesExt.correctedUpdates[0];
    expect(update).toEqual([97, 75, 47, 61, 53]);
  });
  it("should return 61,13,29 the second not correct update ", () => {
    let update = pagesOrderingRulesExt.incorrectUpdates[1];
    expect(update).toEqual([61, 13, 29]);
  });
  it("should return 61,29,13 as the new order of second not correct update ", () => {
    pagesOrderingRulesExt.fixIncorrectUpdates();
    let update = pagesOrderingRulesExt.correctedUpdates[1];
    expect(update).toEqual([61, 29, 13]);
  });

  it("should return [97, 75, 47, 29, 13] as the new order of third not correct update ", () => {
    pagesOrderingRulesExt.fixIncorrectUpdates();
    let update = pagesOrderingRulesExt.correctedUpdates[2];
    expect(update).toEqual([97, 75, 47, 29, 13]);
  });

  it("should return a list of 3 new correct updates list", () => {
    pagesOrderingRulesExt.fixIncorrectUpdates();
    let newUpdates = pagesOrderingRulesExt.correctedUpdates;
    expect(newUpdates.length).toBe(3);
    expect(newUpdates).toEqual([
      [97, 75, 47, 61, 53],
      [61, 29, 13],
      [97, 75, 47, 29, 13],
    ]);
  });

  it("should return 123 the sum of all of the middle numbers of new correct updates", () => {
    pagesOrderingRulesExt.fixIncorrectUpdates();
    const result = pagesOrderingRulesExt.computeSumOfMiddlePageNumber(pagesOrderingRulesExt.correctedUpdates);
    expect(result).toBe(123);
  });
});
