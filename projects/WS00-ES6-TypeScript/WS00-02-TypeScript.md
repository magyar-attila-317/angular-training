# TypeScript features

### online web IDEs to play with Typescript and Angular

 - Online TypeScript compiler, Online TypeScript IDE, and online TypeScript REPL.: https://repl.it/languages/typescript

 - Angular WebIDE: https://stackblitz.com/

 - DEMO: TS file compile to JS file: http://www.typescriptlang.org/play/

### using types
The most basic feature of TypeScript is defining the types of variables. This happens by adding a colon (:) and the type
itself after the variable name at declaration:
```typescript
let name: string;

// this works:
name = 'VV Aurélió';

// this doesn't:
name = 8;
``` 

Even if we don't specify the type at declaration but instantiate the variable with a value, TypeScript infers the type 
and won't let us assign a different type to that value:
```typescript
let name = 'VV Aurélió';

// this will throw an error:
name = 22;
```

Declaring a variable without its type does not throw an error, but it is bad practice. TS assigns the type _any_ to such
a variable.  
We can assign _string_, _number_, _boolean_, _Array<>_, or _any_ to a variable (or even enums), use _void_ to announce 
that a function will not return anything, or use _our own objects or interfaces_.  

### classes
Well, these are pretty similar to the classes of pure JavaScript introduced in ES6, except we use types with the
properties and methods, can add static members and can set visibility:
```typescript
class Car {
    private make: string;
    private currentSpeed: number;
    private isAutomatic: boolean;
        
    // the question mark defines an optional argument
    constructor(make: string, isAutomatic?: boolean) {
        this.make = make;
        this.currentSpeed = 0;
        this.isAutomatic = isAutomatic || false;
    }

    accelerate(): void {
        this.currentSpeed += 10;
    }
    
    brake(): void {
        this.currentSpeed -= 10;
    }

    printCurrentSpeed(): void {
        console.log(this.currentSpeed);
    }

    static numberOfWheels(): number {
        return 4;
    }
}

const myCar = new Car('Batmobile');
myCar.accelerate();
myCar.printCurrentSpeed();
console.log(Car.numberOfWheels());
```
TypeScript has two access modifiers: _public_ and _private_. All members are public by default, but we can use the 
_public_ keyword explicitly as well.  

##### Note
TypeScript has a shortening syntax for adding instance variables to the class through the constructor.
Instead of:
```typescript
class Plane {
    private brand: string;
    private numberOfWings: number;
    
    constructor(brand: string, numberOfWings: number) {
        this.brand = brand;
        this.numberOfWings = numberOfWings;
    }
}
```
We can:
```typescript
class Plane {
    constructor(private brand: string, private numberOfWings: number) {}
}
```

### interfaces
Used to define custom types without creating classes. Interfaces are not compiled to JavaScript as they are only for
validation.
```typescript
interface OrcListItem {
    id: number;
    killCount: number;
    name: string;
    orcRaceType: string;
    weapons: string[];
    hordeName?: string; // optional property
}

let orc: OrcListItem;

// this works:
orc = {
    id: 8,
    killCount: 133,
    name: 'Roli',
    orcRaceType: 'Snaga',
    weapons: ['Bow', 'Shield'],
}

// this doesn't:
orc = {
    name: 'Pityu',
    age: 68,
}
```
They are especially useful e.g. when sending/receiving data from the server and we want to make sure the format is 
OK.

Method signatures can, of course, also be part of an interface:
```typescript
interface HordeLeader {
    name: string;
    power: number;
    rampage(string): void;       // regular function
    slaughter: (string) => void;    // arrow function 
}

let hordeLeader: HordeLeader;
hordeLeader = {
    name: 'Kozák Tibor',
    power: 34,
    rampage(villageName: string): void {
        console.log(this.name + ' is burning ' + villageName + " to ashes");
    },
    slaughter(girlName: string): void {
        console.log(this.name + ' is brutally attacking ' + girlName);
    }
}
```

### generics

Generics are types which can only hold / use specific types.

```typescript
let numbers: Array<number>;

// this works:
numbers = [3, 1, 4, 1, 5, 9, 2];

// this doesn't:
numbers = ['kutya', 'cica', 'szivárványfarkúunikornis'];
```
