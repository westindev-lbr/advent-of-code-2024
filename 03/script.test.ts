import * as fs from "fs/promises";
import { MulItOver } from "./mul-it-over-1";
import { MulItOverExtend } from "./mul-it-over-2";
const buffer = await fs.readFile("03/test.txt");
const content = buffer.toString().split("\n");
const contentL1 = content[0];
const contentL2 = content[1];

describe("Mull It Over TDD", () => {
  const mulIt = new MulItOver(contentL1);
  const mulItBis = new MulItOverExtend(contentL2);

  it("should be extract the first multiplication ", () => {
    const pattern: RegExp = /mul\(\d+,\d+\)/g;
    const matchs = contentL1.match(pattern);
    const match = matchs?.[0];
    expect(match).toBe("mul(2,4)");
  });

  it("should return 161 the sum of product of all mul in txt", () => {
    mulIt.extractPatternMul();
    const result = mulIt.computeSumOfProduct();
    expect(result).toBe(161);
  });

  it("should return don't() and do() and sum of 48 ", () => {
    mulItBis.extractPatternMulBis();
    const result = mulItBis.computeSumOfProductLimitation();
    expect(result).toBe(48);
  });
});
