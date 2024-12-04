import * as fs from "fs/promises";
export const buffer = await fs.readFile("03/input.txt");
export const content = buffer.toString();

export type MulInstruction = {
  a: number;
  b: number;
  enable?: boolean;
};

export class MulItOver {
  mulPattern: RegExp = /mul\(\d+,\d+\)/g;
  numPattern: RegExp = /\d+/g;
  listMul: MulInstruction[] = [];

  constructor(public content: string) {}

  extractPatternMul(): void {
    const matchs = this.content.match(this.mulPattern);
    if (!matchs) return;
    for (const item of matchs) {
      const numbers = item.match(this.numPattern);
      if (!numbers) return;
      this.listMul.push({ a: Number(numbers[0]), b: Number(numbers[1]) });
    }
  }

  computeSumOfProduct(): number {
    if (this.listMul.length < 1) return 0;
    return this.listMul.reduce((acc, v) => acc + v.a * v.b, 0);
  }
}

const mulItOver = new MulItOver(content);
mulItOver.extractPatternMul();
console.log(mulItOver.computeSumOfProduct());
