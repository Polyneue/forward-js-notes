#Advanced JS
Kyle Simpson - [@getify](https://twitter.com/getify)  
This course is based on two of the _You Don't Know JS_ books, [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures) and [this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes).

##Scope
To understand scope, first you'll need to understand how Javascript reads and sets up the program. Contrary to belief, Javascript is actually a compiled language, in that there is a compile phase and an execution phase when the program is run. These two separate passes over the program are known as the compiler and the engine (executor). 

###The Compiler 
The compiler reads over the program and sets up the lexical scope.

When the compiler scans over the code, the main items it looks for are _Formal Declarations_ (`var`, `function`, `const`, and `let`). _Formal Declarations_ need to start with a declarator, a formal declarator, or have a formal parameter. It uses these _Formal Declarations_ to set up the scoping for each block. 

**Note:** Formal function declarations are only a function declaration if the word function is first in the line. For example:

```javascript
function foo() {} // Formal Function Declaration
var foo = function foo() {} // Function Expression
```

###The Engine
The Engine/Executor reads over the program and looks for left hand values and right hand values. These values have different names based on who you ask but the three most common are:

**Left Hand Values**

* LHS (Left Hand Side)
* LValue
* Target

**Right Hand Values**

* RHS (Right Hand Side)
* RValue
* Source

In the code example below `foo` is the _Target_ and `"bar"` is the _Source_.

```javascript
var foo = "bar";
```

When the program is run, the compiler saves a spot in memory on the first pass for the scope manager to perform a lookup against during the executor phase. The executor then assigns the value back to the saved spot in memory.

For an example of how this conversation between the compiler and the engine occurs, see the code snippet below (Remember, these are two separate phases, the compiler will ask all of it's questions first, and then the engine will do it's part). 

```javascript
var foo = "bar";
/*
 * Compiler: Hey global scope, ever heard of foo? (No go ahead and register it)
 * Engine: Hey compiler do you know foo? (Yes, store "bar" as the value)
 */

function bar() {
	/*
	 * Compiler: Hey global scope, ever heard of function bar? (No go ahead and register it)
	 * Engine: Hey global scope, ever heard of function bar? (Yes store the function for it)
	 */
	
	var foo = "baz";	
	/*
	 * Compiler: Hey bar scope, ever heard of foo? (No go ahead and register it)
	 * Engine: Hey compiler, do you know foo? (yes, store "bar" as the value)
	 */
}

function baz(foo) {
	/*
	 * Compiler: Hey global scope, ever heard of function baz? (No go ahead and register it)
	 * Engine: Hey global scope, ever heard of function bar? (Yes store the function for it)
	 */
	 
	foo = "bam";
	/*
	 * Compiler: Hey baz scope, ever heard of foo? (No go ahead and register it, declared by parameter)
	 * Engine: Hey compiler, do you know foo? (yes, store "bam" as the value)
	 */
	 
	bam = "yay";
	 /*
	  * Compiler: Ignore because there's no declarator (bam)
	  * Engine: Hey compiler, do you know foo? (No, move up the scopes to try and find it, if unfound add it to the global scope)
	  */
}
```

**Notes on Scope**

* Lexical scope cannot be changed and is defined at author and compile time.
* You should keep everything private and inaccessible and only expose what you need to.
* `let` keyword allows for scoping to a block or a function;
* Errors: `undeclared` means it was not defined in the scope, `undefined` means it is found in the scope but has not been defined.


##Closure
Closure is when a function "remembers" it's lexical scope even when the function is executed outside that lexical scope. 

```javascript
function foo() {
	var a = 2;

	function bar() {
		console.log(a); // 2
	}

	bar();
}

foo();
```

In the above snippet function `bar()` has a _closure_ over the scope of `foo()`, This is because `bar()` appears nested inside of `foo()`, plain and simple. 

```javascript
function foo() {
	var a = 2;

	function bar() {
		console.log(a); // 2
	}

	return bar;
}

var baz = foo();

baz(); // 2 -- Closure
```

To better understand closure, take a look at the example above. The function `bar()` has scope access to the inner scope of `foo()`. Then we take `bar()`, the function itself and pass it as a value. In this case, returning the function object itself that `bar` references.

After we execute `foo()`, we assign the value it returned (our inner `bar()`) to a variable called `baz`, and then invoke `baz()`, which is invoiking our inner function `bar()`, just with a different identifier reference.

In this case, the function `bar()` is being executed _outside_ of it's declared lexical scope. 

The function `bar()` still has a closure over the inner scope of `foo()`, which keeps the scope of `foo` alive to be used by `bar()` at any later time. 

Since `bar()` still has a reference to that scope, that reference is called **closure**.

###Creating Closures
Sometimes you need to intentionally create closures for you're programs. There are multiple ways this can be done using *IIFE*, `let` scoping, and modules.

####IIFE
Immediately Invoked Function Expressions

```javascript
var a = 2;

// Allows for some scope and keeps bob() from populating the global scope.
(function bob() {
	var a = 10;
	console.log(a); // 10
})();

// Turns a declaration into a function expression for immediate usage.
void function bob() {
	var a = 10;
	console.log(a); // 10
}

console.log(a) // 2
```

####Let
The `let` keyword will create a block level scope when used.

```javascript
function diff(x,y) {
	
	// EX 1 - Implicit Declaration
	if (x > y) {
		let tmp = x;
		x = y;
		y = tmp;
	}

	// Ex 2 - Explicit Declaration
	if (x > y) {
		// Let will be scoped to the "if" block
		{
			let tmp = x;
			x = y;
			y = tmp;
		}
	}
	return y - x;
}
```

####Modules
The module pattern allows you to only expose the functions that you want to be public, while still maintaining lexical scope.

```javascript
// This maintains the lexical scope for the wrapped functions below
(function CustomerLogin(global) {
	function foo() {
		bar();
	}
	function bar() {
		console.log(a)
	}
	var a = 42;

	// Expose only the necessary API
	global.foo = foo;
})(window);
```

##Module Pattern
Two characteristics for the Module Pattern

* Must be an outer enclosing function that runs at least once.
* The function must return back at least one inner function that has closure over the internals.

```javascript
/* 
 * Module Patterns
 * Hiding all of the details inside a private function
 * and returning only what needs to be exposed
 */

var foo = (function () {
	function bar() {
		console.log('bar');
	}
	var publicAPI = {
		baz: function () {
			bar();
		}
	}
	return publicAPI;
})();

foo.baz(); // 'bar'
```

##Object Oriented Development

###This
Every function **while executing**, has a refernce to it's current execution context, called `this`.  

Four rules for `this` call sites.

1. Globally scoped `this` 
2. Hard bound this using `.call`, `.bind` or `.apply` ie: `obj.foo.bind(obj)`
3. Containing/Owning object context `obj.foo()`
4. When putting the `new` keyword in front of a function:
	* A brand new empty object is created
	* The brand new empty object gets linked to another object*
	* The newly created and linked object gets passed in as the this keyword
	* If that function does not already return it's own object, it assumes that you meant to return `this`

This order of precedence:

1. Was the function called with `new`
2. Was the function called with `.call` or `.apply` specicifying an explicit `this`
3. Was the function called via a containing/owning object (context)
4. Default global object (except strict mode 'undefined')

###OLOO (Objects Linked to Other Objects)
The below snippet demonstrates the concept of OLOO and how linking objects works.

```
var Foo = {
	init: function(who) {
		this.me = who;
	},
	identify: function() {
		return "I am" + this.me;
	}
}

var Bar = Object.create(Foo);

Bar.speak = function () {
	alert('Hello, ' + this.identify() + '.');
}

var b1 = Object.create(Bar);
b1.init("b1");

var b2 = Object.create(Bar);
b2.init("b2");

b1.speak(); // alerts: "Hello, I am b1."
b2.speak(); // alerts: "Hello, I am b2."
```

If you traced the linked objects in the above example it would look something like below.

```
    Foo
     |
    Bar
   /   \
 b1     b2
```

`Bar` has the linked functions exposed to it from `Foo` and `b1` and `b2` have both the linked functions from `Foo` and `Bar`. This linking of objects is the the core of the **OLOO** coding pattern.

##Extra Credit
Three reasons why named function expressions are preferrable to anonymous function expression.

* Some times you need to refer to the function from inside itself (Recursion, Unbinding). It becomes a reliable self reference to itself.
* Adds a name to the stack trace for better debugging.
* Code can be more readable and self documenting.

---
**References:**  
[Javascript Specification](http://www.ecma-international.org/ecma-262/7.0/index.html)  
[Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch2.md)  
[Closure](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/ch5.md)  
[This](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch1.md)