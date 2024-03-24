class DivHelper {
  static getVal(size: number | string): { percent: boolean; val: number } {
    let ret = 0;
    let isPercent = false;

    if (typeof size === "string") {
      let percentHeight = DivHelper.isPercent(size)
        ? DivHelper.getPercent(size)
        : false;

      if (percentHeight) {
        isPercent = true;
        ret = percentHeight;
      }
    } else if (typeof size === "number") {
      ret = size;
    }

    return {
      percent: isPercent,
      val: ret,
    };
  }

  static isPercent(val: string) {
    let pattern = /%/g;
    let res = val.replace(pattern, "");

    return !Number.isNaN(+res);
  }

  static getPercent(val: string): number {
    let pattern = /%/g;
    let res = val.replace(pattern, "");

    return +res;
  }
}

export { DivHelper };
