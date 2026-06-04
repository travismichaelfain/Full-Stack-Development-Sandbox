import ExpressError from "./expressError.js";

const createFrequencyCounter = (arr) => {
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
};

const convertAndValidateNumsArray = (numsAsStrings) => {
  return numsAsStrings.map((numString, index) => {
    const num = Number(numString);

    if (Number.isNaN(num)) {
      throw new ExpressError(
        `The value '${numString}' at index ${index} is not a valid number.`,
        400,
      );
    }

    return num;
  });
};

const findMean = (nums) => {
  if (nums.length === 0) return 0;

  const total = nums.reduce((sum, num) => sum + num, 0);

  return total / nums.length;
};

const findMedian = (nums) => {
  const sortedNums = [...nums].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedNums.length / 2);

  if (sortedNums.length % 2 === 0) {
    return (sortedNums[middleIndex] + sortedNums[middleIndex - 1]) / 2;
  }

  return sortedNums[middleIndex];
};

const findMode = (nums) => {
  const frequencyCounter = createFrequencyCounter(nums);

  let highestCount = 0;
  let mostFrequent;

  for (const key in frequencyCounter) {
    if (frequencyCounter[key] > highestCount) {
      highestCount = frequencyCounter[key];
      mostFrequent = key;
    }
  }

  return Number(mostFrequent);
};

export {
  createFrequencyCounter,
  convertAndValidateNumsArray,
  findMean,
  findMedian,
  findMode,
};
