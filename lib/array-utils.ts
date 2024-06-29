// Takes an array and returns a shuffled version of it
export const shuffleArray = <T>(arr: T[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Takes an array to distribute (arr) and the number of subsets to devide it into (n)
// Returns all possible distributions of the elements in n subsets
export const getArrayDistributuions = <T>(arr: T[], n: number) => {
  const result: T[][][] = [];
  const distribution: T[][] = new Array(n).fill(0).map(() => []);

  const distributeElements = (index: number) => {
    if (index === arr.length) {
      result.push(distribution.map((d) => [...d]));
      return;
    }
    for (let i = 0; i < n; i++) {
      distribution[i].push(arr[index]);
      distributeElements(index + 1);
      distribution[i].pop();
    }
  };

  distributeElements(0);
  return result;
};
