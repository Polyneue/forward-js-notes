#ForwardJS - Advance JS

##Scope - Where to look for things
What are we looking for? Variables and Identifiers. Javascript is a continuously compiled language. 
> (For example, line 1 is correct and a bug is on line 4 and the code won't run lines 1-3)  
> One pass that checks the code and second pass runs the code.  

Understanding how Javascript processes the code. Javascript runs a two scan process on the program, once as the compiler to set up the lexical scope and the second time as the engine to execute the code.

```
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
	 * Engine: Hey compiler, do you know foo? (yes, store "bar" as the value)
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

```
function foo() {} // Formal Function Declaration
var foo = function foo() {} // Function Expression
```


Execution looks for the _LHS_ (Left Hand Side) and _RHS_ (Right Hand Side) aka the LValue and RValue. Another way to think of it is _Target_ and _Source_.

```
var foo = "bar";
```

In the above code `foo` is the LHS and `"bar"` is the RHS.

The compiler saves a spot in the memory for the scope manager to perform a lookup and for the executor to assign the value back to the saved memory.


---
**References:**  
Javascript Specification: <http://www.ecma-international.org/ecma-262/7.0/index.html>

**Todo:**  

* Convert sites JS over to start using strict mode on all of our JS.