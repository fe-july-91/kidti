import { Data } from "../types";

export const findMaxValue = (
  newData: Data[],
) => {
  const maxValue = Math.max(...newData.filter(d => d.value > 0).map(d => d.value));

  return maxValue;
}