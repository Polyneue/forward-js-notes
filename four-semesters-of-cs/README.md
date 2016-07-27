#Four Semesters of CS

Coreman's Intro to Algorithms

##Big O
Strip awway concepts to focus on the main part of equations. 

```
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

This is `O(n)` because we go through all of the inputs once in a loop

```
function fine(needle, haystack) {
	for (int i=0; haystack.length; i++) {
		if (hastack[i] === needle) return true;
	}
}
```

Still `O(n)` because it can take a large array that of an undefined length. Worst case, the needle would be the last element.

When looking for the Big O in algorithms we are looking for the number of loops. For example a newsted loop would be `O(n^2)`. With multiple loops, look for the most complex nested loops, and that will be the Big O.

```
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

If we have no loops and just do something and exit/return, then it's said we're doing it in constant time, or `O(1)`. 

Time over inputs causes a vertical curve.

Logarithms will taper off with the more inputs added.

```
function basicRecursion(max, current) {
	// Set up the base case so the program knows when to exit
	// Failing to do so will cause a stack overflow
	if (current > max) return;
	
	// If the base case isn't met, run the recursive function again
	basicRecursion(max, current + 1)
}
```


##Recursion
Recursion is when you define something in terms of itself. When referring to recursion in CS, a function calling itself would be a Recursive Function and would be Logarithmic in it's Big O.

Recursion is much slower than iteration, if you can avoid it, always try to use iteration.

For recursive algorithms you should be solving for your base case. Define the base case for when you can solve what you are trying to do.

> Don't kill people, write base case.

##Sorting
###Bubble Sort
In bubble sort, we're going to loop through the array and compare each index with the index next to it. If the those two numbers are out of order (the lesser index's value is greater than the greater index's value) we swap those two numbers' places in the array. We keep looping over that array until everything is in place and nothing was swapped during the last iteration.

###Insertion Sort
We're going to start at the beginning of the list and assume we have a sorted list of length 1 where the first element is only sorted element. We're then going to grab the second element, and insert it into the correct spot in our sorted list, either the 0 index or the 1 index, depending if it's smaller or larger than our first element. We now have a sorted list of length 2. We then continue on down the line, inserting elements in our sorted side of the list as the unsorted side dwindles.
 
###Merge Sort
The basic gist of merge sort is that you're going to take your big list, and first divide down in two half size lists and recursively call merge sort on those smaller list, which in turn will do the same. The base case is when you have a list of one, at which point you will return that sorted list of one.

###Quick Sort

##Data Structures - Interfaces

---
**References**  
<http://btholt.github.io/four-semesters-of-cs/>
<http://bigocheatsheet.com/>