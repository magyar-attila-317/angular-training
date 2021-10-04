## Let's now take a look at a few examples of the features of ES6:

#### let and const
The new ways to declare variables. Both of them are _block scope_ (var is scoped to the function) and they do not get
hoisted.

 ```js
// the old way:
var name = 'Nagy Alekosz';

// the new way if the job may be reassigned in the future:
let job = "celeb";

// the new way if there is no way the value will change in the future:
const isSmart = false;
```

 Note that _const_ is used nearly 10 times more often than _let_.  
 
#### classes
 ```js
class Animal {
  constructor(species) {
    this.species = species;
  }
  getSpecies() {
    return this.species;
  }
}

const tiger = new Animal('tiger');
tiger.getSpecies(); // tiger
```

#### inheritance
```js
class Dog extends Animal {
  constructor(name) {
    super('dog');
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

const spot = new Dog('Spot');
spot.getSpecies(); // dog
spot.getName(); // Spot
```
As Java developers, the syntax must be quite familiar. Note however, that the constructor is called _constructor_ and
in case of inheritance, the _super()_ call must always be explicitly written in the first line of the constructor.  

#### module export / import  
By adding the following line at the end of the previously seen _dog.js_ file:
```js
export default Dog;
```
We can import it into a different file and use it there:
```js
import Dog from './dog.js';
```
More on modules in [this great video](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8211788#overview).

#### Arrow function
One of the most amazing innovations of the language, which lets the _this_ keyword work as one would expect. It does
not give a new value to _this_ as regular functions do, instead it always refers to where it is written (lexical scope).
The syntax might be familiar from _lambdas_  in Java (or C# or Python for example):  

`(arguments) => { function body }`

```js
const adder = (number1, number2) => {
    return number1 + number2;
}
```
More on arrow functions [here](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8211786#overview).  

##
If you are interested in the other frequently-used features of ES6, or want the get more information about these, check
out [Section 2](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8211776#overview) (~45 min)
of Maximilian Schwartzmüller's React course on udemy.
