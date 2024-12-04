import { content, MulItOver } from "./mul-it-over-1";

export class MulItOverExtend extends MulItOver {
  regMulAndDo: RegExp = /(mul\(\d+,\d+\)|don\'t\(\)|do\(\))/g;
  constructor(content: string) {
    super(content);
  }

  extractPatternMulBis(): void {
    const tabPattern = this.content.match(this.regMulAndDo);
    if (!tabPattern) return;
    let enable = true;
    for (const item of tabPattern) {
      if (item === "don't()") {
        enable = false;
        continue;
      } else if (item === "do()") {
        enable = true;
        continue;
      }
      const numbers = item.match(this.numPattern);
      if (numbers) {
        this.listMul.push({ a: Number(numbers[0]), b: Number(numbers[1]), enable: enable });
      }
    }
  }

  computeSumOfProductLimitation(): number {
    if (this.listMul.length < 1) return 0;
    return this.listMul.filter((x) => x.enable === true).reduce((acc, v) => acc + v.a * v.b, 0);
  }
}

const mulItOverExtend = new MulItOverExtend(content);
mulItOverExtend.extractPatternMulBis();
const sum = mulItOverExtend.computeSumOfProductLimitation();
console.log(sum);
