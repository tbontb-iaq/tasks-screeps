import _ from "lodash";

function arr_repeat<T>(arr: T[], times: number): T[] {
  return times <= 0 ? [] : times !== 1
    ? arr_repeat(arr.concat(arr), Math.floor(times / 2)).concat(
      times % 2 ? arr : []
    )
    : arr;
}

export { arr_repeat };
