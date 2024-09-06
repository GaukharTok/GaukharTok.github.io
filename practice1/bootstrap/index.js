"use strict";
let a = 5;
let firstName = "Bob";
console.log(a);
console.log(firstName);

function remove(a) {
  let arr = [];
  for (let i = 0; i < a.length; i++)
    if (arr.includes(a[i]) === false) {
      arr.push(a[i]);
    }
  return arr;
}
// Create a function that returns the sum of the two lowest positive numbers
// given an array of minimum 4 positive integers. No floats or non-positive
// integers will be passed.

// Given an array with exactly 5 strings "a", "b" or "c" (
//   chars in Java, characters in Fortran), check if the array contains three
//    and two of the same values.
// ["a", "a", "a", "b", "b"] ==> true  // 3x "a" and 2x "b"

function theSameValue(arr) {
  let arr2 = [];
  for (let i = 0; i < arr.length; i++)
    if (arr2.find(a[i]) === false) {
      arr2.push(a[i]);
    }
}
return ["a", "a", "a", "b", "b"];
