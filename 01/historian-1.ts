import * as fs from "node:fs/promises";

const buffer = await fs.readFile("01/input.txt");
export const content = buffer.toString();
export const list: string[] = content
  .split("\n")
  .map((e) => e.split("   "))
  .flat();

export class Historian {
  left: number[];
  right: number[];

  constructor(private readonly list: string[]) {
    this.left = this._filterListByOddOrEvenIndex(list, 0);
    this.right = this._filterListByOddOrEvenIndex(list, 1);
  }

  public computeSumOfDistance(): number {
    return this.left.reduce((acc, v, i) => acc + Math.abs(this.right[i] - v), 0);
  }

  private _filterListByOddOrEvenIndex(list: string[], modValue: number): number[] {
    return list
      .filter((_, i) => i % 2 === modValue)
      .sort()
      .map((x) => Number(x));
  }
}

const sum = new Historian(list).computeSumOfDistance();
console.log(sum);
