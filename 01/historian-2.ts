import { Historian, list } from "./historian-1";

export class HistorianFinal extends Historian {
  scoreSet: Map<number, number> = new Map();

  constructor(list: string[]) {
    super(list);
    this._setSimilaryScore();
  }

  public computeSumOfSimilaryScore(): number {
    return this.left.reduce((acc, v) => acc + this.scoreSet.get(v)!, 0);
  }

  private _setSimilaryScore(): void {
    for (const number of this.left) {
      if (this.scoreSet.get(number)) {
        continue;
      }
      const score = number * this.right.filter((x) => x === number).length;
      this.scoreSet.set(number, score);
    }
  }
}

const historianFinal = new HistorianFinal(list);
const result = historianFinal.computeSumOfSimilaryScore();
console.log(result);
