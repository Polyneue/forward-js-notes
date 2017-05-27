# Four Semesters of CS
Brian Holt - [@holtbt](https://twitter.com/holtbt)  
> This course is intended to cover a few of the more prominent computer science ideas as they relate to roles in web development. All examples and exercises are done in Javascript, however these concepts span across nearly all programming languages.

## Big O
The Big O is the way to analyze how efficient an algorithm (code in this case) is. The Big O in practice is creating a model to determine the order of magnitude of a given _n_ inputs.

For example, we don't really care if a function takes 300ms vs 330ms given 1000 inputs, but we do care if it taskes 300ms vs 30s. This would be a difference in an order of magnitude. 

Think of the Big O as a vacuum that sucks up all the unimportant information and leaves you with only the important stuff. In the below code, we are only interested in the most processing intensive part of the code. Which in this case is the `for` loop. 

```javascript
function crossAdd(input) {
  var answer = [];
  for (var i = 1; i < input.length; i++) {
	var goingUp = input[i];
	var goingDown = input[input.length-1-i]
	answer.push(goingUp + goingDown);
  }
  return answer;
}
```

The above is `O(n)` because we go through all of the inputs once in a loop

```javascript
function find(needle, haystack) {
  for (int i=0; haystack.length; i++) {
	if (hastack[i] === needle) return true;
  }
}
```

Still the above is `O(n)` because it can take a large array that of an undefined length. Worst case, the needle would be the last element.

When looking for the Big O in algorithms we are looking for the number of loops. For example a nested loop would be `O(n^2)`. With multiple loops, look for the most complex nested loops, and that will be the Big O.

```javascript
function foo(input) {
  // First Loop has no nested loops
  for (var i=0; i < input.length; i++) {
	// Do something
  }
  // Second loop has a nested loop so it is the more complex of the two
  for (var i=0; i < input.length; i++) {
	for (var x = 0; x < i; i++) {
		// Do something
	}
  }
}
```
For the above example, the second loop would be the more complex of the two and be `O(n^2)`

**Note:** If we have no loops and just do something and exit/return, then it's said we're doing it in constant time, or `O(1)`. 


## Recursion
Recursion is when you define something in terms of itself. When referring to recursion in CS, a function calling itself would be a Recursive Function and would be Logarithmic in it's Big O. This technique is especially adept at some problems because of it's ability to maintain state at different levels of recursion.  

Recursion carries a large footpring with it, as every time you call the function, you're adding another call to the call stack. That's why some problems are better solved with iteration over recursion.  

For recursive algorithms, you always want to be solving for your **base case**. That means if you are adding numbers together up to a maximum value, that max value will be the base case you look for.

> Don't kill people, write a base case. - _Brian Holt_

An example of a recursive function below:

```javascript
function basicRecursion(max, current) {
  // Set up the base case so the program knows when to exit
  // Failing to do so will cause a stack overflow
  if (current > max) return;

  // If the base case isn't met, run the recursive function again
  basicRecursion(max, current + 1);
}
```

### Exercise
[Example](http://codepen.io/btholt/pen/rxwEVQ?editors=001)  
[Exercise](http://codepen.io/btholt/pen/QyMjNa?editors=001)  
[Answer](http://codepen.io/btholt/pen/obwrOB?editors=001)  

## Sorting
### Bubble Sort
In bubble sort, we're going to loop through the array and compare each index with the index next to it. If the those two numbers are out of order (the lesser index's value is greater than the greater index's value) we swap those two numbers' places in the array. We keep looping over that array until everything is in place and nothing was swapped during the last iteration.

#### Exercise
[Exercise](http://codepen.io/btholt/pen/PZKPjj?editors=001)  
[Answer](http://codepen.io/btholt/pen/KdYPqa?editors=001)

### Insertion Sort
We're going to start at the beginning of the list and assume we have a sorted list of length 1 where the first element is the only sorted element. We're then going to grab the second element, and insert it into the correct spot in our sorted list, either the 0 index or the 1 index, depending if it's smaller or larger than our first element. We now have a sorted list of length 2. We then continue on down the line, inserting elements in our sorted side of the list as the unsorted side dwindles.

#### Exercise
[Exercise](http://codepen.io/btholt/pen/mVMMxj?editors=001)  
[Answer](http://codepen.io/btholt/pen/meYQPd?editors=001)
 
### Merge Sort
The basic gist of merge sort is that you're going to take your big list, and first divide down in two half size lists and recursively call merge sort on those smaller list, which in turn will do the same. The base case is when you have a list of one, at which point you will return that sorted list of one.

#### Exercise
[Exercise](http://codepen.io/btholt/pen/PZKgQd?editors=001)  
[Answer](http://codepen.io/btholt/pen/rOEdKK?editors=001)

### Quick Sort
It's another divide-and-conquer, recursive algorithm but it takes a slightly different approach. Basically you take the last element in the list and call that the pivot. Everything that's smaller than the pivot gets put into a "left" list and everything that's greater get's put in a "right" list. You then call quick sort on the left and right lists independently (hence the recursion.) After those two sorts come back, you concatenate the sorted left list, the pivot, and then the right list (in that order.)

#### Exercise
[Exercise](http://codepen.io/btholt/pen/pgWVQM?editors=001)  
[Answer](http://codepen.io/btholt/pen/bEoGxa?editors=001)

## Functional Programming
A function that modifies no state and is idempodent is called a _Pure Function_. The idea of Functional programming is that you will create smaller easily testable functions that will remain reliable with scalability. Imagine creating a function that receives a list and acts on it, a pure function would be non destructive to the list and only return some sort of tranformation of the list itself. 

Some benefits of Functional programming:

* Ease of Unit Testing
* Stateless Code
* No side effects to functions

An example of good functional programming:

```javascript
function double(num) {
  return num * 2;
}

function doublePlus(num) {
  return double(num) + num;
}

double(10); // 20
doublePlus(10) // 30
```

The idea is that building upon reliable and tested functions will allow you to scale far more easily. Some higher order functions that are used, generally work on lists of information. `.map`, `.reduce`, and `.filter` are the most used higher order functions.

```javascript
var array = [1, 2, 3, 4, 5];

function double(num) {
  return num * 2;
}
function doubleEach(input) {
  input.map( double );
}

doubleEach(array); // [1, 4, 6, 8, 10]
```


---
**References**  
[Four Semesters of CS](http://btholt.github.io/four-semesters-of-cs/)  
[Big O Cheat Sheet](http://bigocheatsheet.com/)  
[Coreman's Intro to Algorithms](https://mitpress.mit.edu/books/introduction-algorithms)