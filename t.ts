/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-09 11:31:45
 * @Description: 
 */
function map(): <V>(arr: V[]) => V[];
// function map<V, R>(fn: (value: V) => R): (arr: V[]) => R[];
function map(fn = (x: any) => x) {
  return (arr: any[]) => {
    const result: any[] = [];
    for (const item of arr) {
      result.push(fn(item));
    }
    return result;
  };
}

const emptyMap = map();
const result1 = emptyMap([1, 2, 3]);
const result2 = emptyMap(["1", "2"]);