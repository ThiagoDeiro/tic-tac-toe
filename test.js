function aVeryBigSum(ar) {
  let sum = 0;
  for (let i = 0; i < ar.length; i++) {
    sum += ar[i];
  }
  return sum;
}

console.log(aVeryBigSum([100001], [100002], [100003], [100004], [100005]));
