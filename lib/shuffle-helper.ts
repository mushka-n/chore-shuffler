import { getArrayDistributuions } from "./array-utils";

// Takes several Chore arrays and returns the difference between the max and min of their sums
export const calculateChoresPointsSumDiff = <T extends { points: number }>(
  ...choresSubset: T[][]
) => {
  const sums = [...choresSubset].map((chores) =>
    chores.reduce((acc, chore) => acc + chore.points, 0)
  );
  const maxSum = Math.max(...sums);
  const minSum = Math.min(...sums);
  return maxSum - minSum;
};

// Takes an array of elements to distribute [1, 2, ...] and an array of subsets to fill [[3, 4], [5, 6], ...]
// Returns an array of subsets with the elements distributed [[3, 4, 1, 2], [5, 6], ...]
// elements are distributed in a way so arrays' sums are as close to equal as possible
export const distributeChoresBetweenSubsets = <T extends { points: number }>(
  choresToDistribute: T[],
  subsetsToFill: T[][]
) => {
  let resSplit = subsetsToFill.map((s) => [...s]);
  let minDiff = Infinity;

  const distributions = getArrayDistributuions(
    choresToDistribute,
    subsetsToFill.length
  );

  distributions.forEach((distribution) => {
    const currSplit = distribution.map((d, i) => [...subsetsToFill[i], ...d]);
    const currDiff = calculateChoresPointsSumDiff(...currSplit);
    if (currDiff < minDiff) {
      minDiff = currDiff;
      resSplit = currSplit.map((d) => [...d]);
      if (minDiff === 0) return;
    }
  });

  return resSplit;
};
