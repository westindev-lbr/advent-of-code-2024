import * as fs from "fs/promises";
import { CeresSearch } from "./ceres-search-1";
import { CeresSearchExtend } from "./ceres-search-2";
const buffer = await fs.readFile("04/test.txt");
const bufferBis = await fs.readFile("04/test2.txt");

describe("Ceres Search TDD", () => {
  const content = buffer.toString();
  const contentBis = bufferBis.toString();
  const ceres = new CeresSearch(content);
  console.table(ceres.horizontals);

  it("should return 3 for nb XMAS in horizontals lines", () => {
    const result = ceres.countPattern(ceres.horizontals, /XMAS/g);
    expect(result).toBe(3);
  });

  it("should return 1 for nb XMAS in verticals lines", () => {
    const result = ceres.countPattern(ceres.verticals, /XMAS/g);
    expect(result).toBe(1);
  });

  it("should retrurn 2 for nb SAMX in horizontals lines", () => {
    const result = ceres.countPattern(ceres.horizontals, /SAMX/g);
    expect(result).toBe(2);
  });

  it("should return 2 for nb SAMX in verticals lines", () => {
    const result = ceres.countPattern(ceres.verticals, /SAMX/g);
    expect(result).toBe(2);
  });

  it("should return 1 for nb XMAS in main diagonals lines", () => {
    const result = ceres.countPattern(ceres.mainDiagonals, /XMAS/g);
    console.table(ceres.mainDiagonals);
    expect(result).toBe(1);
  });

  it("should return 1 for nb XMAS in secondary diagonals lines", () => {
    const result = ceres.countPattern(ceres.secondaryDiagonals, /XMAS/g);
    console.table(ceres.secondaryDiagonals);
    expect(result).toBe(1);
  });

  it("should return 4 for nb SAMX in main diagonals lines", () => {
    const result = ceres.countPattern(ceres.mainDiagonals, /SAMX/g);
    expect(result).toBe(4);
  });

  it("should return 4 for nb SAMX in secondary diagonals lines", () => {
    const result = ceres.countPattern(ceres.secondaryDiagonals, /SAMX/g);
    expect(result).toBe(4);
  });

  it("should return 18 for nb XMAS in all content string", () => {
    const result = ceres.countPatternInAllDirections(/XMAS/g, /SAMX/g);
    expect(result).toBe(18);
  });

  it("should return 9 for nb X-MAS array valid ", () => {
    const ceresExt = new CeresSearchExtend(contentBis);
    const result = ceresExt.countX_masValid();
    expect(result).toBe(9);
  });
});
