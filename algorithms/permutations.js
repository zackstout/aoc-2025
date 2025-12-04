function getPermutations(n) {
  const nums = Array.from({ length: n }, (_, i) => i + 1);
  const results = [];

  function backtrack(index) {
    if (index === nums.length) {
      results.push([...nums]);
      return;
    }

    for (let i = index; i < nums.length; i++) {
      [nums[index], nums[i]] = [nums[i], nums[index]]; // swap
      backtrack(index + 1);
      [nums[index], nums[i]] = [nums[i], nums[index]]; // swap back
    }
  }

  backtrack(0);
  return results;
}

module.exports = { getPermutations };
