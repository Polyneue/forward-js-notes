#Advanced JS

##Scope - Where to look for things
What are we looking for? Variables and Identifiers. Javascript is a continuously compiled language. 
> (For example, line 1 is correct and a bug is on line 4 and the code won't run lines 1-3)  
> One pass that checks the code and second pass runs the code.  

Understanding how Javascript processes the code. Javascript runs a two scan process on the program, once as the compiler to set up the lexical scope and the second time as the engine to execute the code.

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

Formal declarations consist of `var`, `function`, `const`, and `let` and are registered by the scope of the block. Formal declarations need to start with a declarator a formal declarator or have a formal parameter.

> Formal function declarations are only a function declaration if the word function is first. Otherwise it is a function expression.

Three reasons why named function expressions are preferrable to anonymous function expression.

* Some times you need to refer to the function from inside itself (Recursion, Unbinding). It becomes a reliable self reference to itself.
* Adds a name to the stack trace for better debugging.
* Code can be more readable and self documenting.


```javvascript
function foo() {} // Formal Function Declaration
var foo = function foo() {} // Function Expression
```


Execution looks for the _LHS_ (Left Hand Side) and _RHS_ (Right Hand Side) aka the LValue and RValue. Another way to think of it is _Target_ and _Source_.

```javascript
var foo = "bar";
```

In the above code `foo` is the LHS and `"bar"` is the RHS.

The compiler saves a spot in the memory for the scope manager to perform a lookup and for the executor to assign the value back to the saved memory.


##Fixed Lexical Scope
Lexical scope cannot be changed and is defined at author and compile time.

Keep everything private and inaccessible and only expose what you need to.

`let` keyword allows for scoping to a block or a function;


##Undeclared vs Undefined
Undeclard wasn't not defined in the scope, undefined is found in the scope but has not been defined.

##Closure
Closure is when a function "remembers" it's lexical scope even when the function is executed outside that lexical scope.

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
	var o = { bar: "bar" };

	// Expose Bar for public API
	return {
		bar: function () {
			console.log(o.bar);
		}
	};
})();

foo.bar();
```

##Object Oriented Development

###This
Every function **while executing**, has a refernce to it's current execution context, called `this`.  

Four rules for `this` call sites.

1. Globally scoped `this` 
2. Hard bound this using `call`, `bind` or `apply` ie: `obj.foo.bind(obj)`
3. Containing/Owning obejct context `obj.foo()`
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

###Constructor
A constructor makes an object linked to it's own prototype.

###Behavior Delegation
OLOO (Objects Linked to Other Objects)

```

```

---
**References:**  
Javascript Specification: <http://www.ecma-international.org/ecma-262/7.0/index.html>
You Don't Know JS Scopes & Closures:

**Todo:**  

* Convert sites JS over to start using strict mode on all of our JS.
* Clean up notes for sharing 