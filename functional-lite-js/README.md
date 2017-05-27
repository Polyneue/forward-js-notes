# Functional Lite JS

## Side Effects
When a function relies upon the current state of the program, or when the function changes the state of the program. Simply put, the function relies upon something outside of itself. 

```javascript
function foo(x) {
  y = y * x;
  z = y * x;
}

var y = 2;
var z = 3;

foo(6);

y; // 12
z; // 18
```

In the above example `foo()` relies on the variable `y` which is outside of it's scope, meaning anytime the `y` variable is different, the function will produce a different result. You will have to retrace the call stack in order to understand the state of the program to know what function is actually going to do.  

Side Effects are necessary, but they should be limited to I/O. 

**Pure Function** is a function that has no side effects and relies on nothing but itself. An exception to this is your functions being used inside other functions and constant variables.

If your function needs to know the state of the program, you'll need to pass in the state to the function. 

One concept of dealing with impure functions that cannot be changed, you could wrap the impure function into a pure function so that the piece you iteract with has _Referential Transparency_. Example below.

```javascript
function bar(x,y,z) {
  function foo(x) {
	y = y * x;
	z = y * x;
  }

  foo(x);
  return [y,z];
}

bar(5, 2, 3) // [10, 50]
bar(5, 10, 50) // [50, 250]
```

## Composition
Think of composition as taking pure functions and wiring them together to create a new composition. For example the output of one pure function being the input of another pure function. Once you identify the common patterns, you can write a new pure function that become a composition of the first two.

**The purpose of abastraction** is to be able to reason about the separate concerns of a task/function. Abstraction is about allowing you to focus on the thing you need to think about without being distracted. Imagine breaking down a tax function into two separate functions, one that handles calculation and one that handles output. 

**Higher Order Functions** take functions as inputs or it returns another function as an output.

## Immutability
Something that is not allowed to change or something that cannot change. A `const` is a variable that cannot be reassigned. You should act as though variables are immutable and use a non destructive form of handling the data.


## Closure
Closure is when a function remembers the variables around it even when that function is executed elsewhere.  

**Partial Application**
Take a function that expects a certain number of arguments and write another function that produces a new function that has a fewer number of parameters. _Arrity_ is the number of Params in a function.

Take a function of some arrity N and make a function of lower arrity N - n.

**Currying**
Is a form of a Partial Application, you take a function that expects 3 arguments and you make a new function that takes only one argument. Returns multiple functions that feed back the various returns and call the original function iwth it's returned parameters. Partially applies one argument at a time. 

```javascript
function add(x, y) {
  return x + y;
}

function curry(fn, ...args) {
  return function(lastArg) {
	return fn(...args, lastArg);
  };
}

var addTo10 = curry(add, 10);

addTo10(32); // 42
```

You might want lazy if you aren't sure the function will ever be asked for, however you want it to be eager if you need parallelism or need something that will always be done. 

**Memoization** a way for a function to calculate something and remember the result so it doesn't have to do that work again. 

```javascript
function foo(x, y) {
  var sum;

  return function() {
	if (sum === undefined) sum = x + y;
	return sum;
  }
}
```

## Recursion
### Proper Tail Calls
This allows the javascript engine to run function calls recursively and allows the reuse of the same call stack. This is a memory optimization. The function call needs to be the very last thing in the code path. 

```javascript
function sumRecur(sum, num, ...nums) {
  sum += num;
  if (nums.length <= 0) return sum;
  return recur(sum, ...nums);
}

sumRecur(3, 4, 5, 6, 7, 8);
```

**Currently only works in a flagged version of webkit.**

## Lists
### Map: Transformation
With `.map` there's a transformation through projection. The input of a list is transformed and outputted to a new list. Leaving the original list alone. 

```javascript
function doubleIt(val) {
  return val * 2;
}

[1, 2, 3, 4, 5].map(doubleIt);
```

### Filter: Exclusion
Filter is meant to check for a predicate that returns true or false in order to decide on what should be filtered out of or into the new list.

```javascript
function onlyOdds(val) {
  return val % 2 == 1;
}

[1, 2, 3, 4, 5].filter(onlyOdds); // [1, 3, 5]
```

### Reduce: Combining
A reduction is fundamentally about combining things. Reduce does not go down to a single list, it generally would go to a final finite value.

```javascript
function acronym(str, word) {
  return str + word.charAt(0);
}

['Functional', 'Light', 'Javascript', 'Stuff'].reduce(acronym, "");
```

### Fusion
When you have multiple map calls you should compose those functions together. 

```javascript
list
  .map(addOne)
  .map(mult2)
  .map(div3)

// Convert this to a composer
function composeRight(fn1, fn2) {
  return function(...args) {
	return fn1(fn2(...args));
  }
}

var list = [2, 5, 8, 11, 14];

list
  .map([div3,mul2,add1].reduce(composeRight)); // [2, 4, 6, 8, 10];
```

### Transduce
Transducing is about taking a map and a filter in order to compose them together. Fusing different function signatures together.