# Directives

Angular templates are dynamic. When Angular renders them, it transforms the DOM according to the instructions given
by `directives`. A `directive` is a class with a `@Directive()` decorator. Angular comes with some built-in directives,
but in some special, advanced use cases you can also create your own ones.

There are two kinds of built-in directives: `structural` and `attribute`

## Structural directives

Structural directives are responsible for HTML layout. They shape the DOM's structure by adding, removing and
manipulating the host elements to which they are attached.

### *ngIf

This directive can add or remove its host element from the DOM. We just need to bind the directive to a condition
expression.Let's see a couple of quick examples with the `*ngIf` directive to get the hang of it:

```angular2html

<div *ngIf="isActive">Some conditional content</div>
```

If the expression _isActive_ returns a truthy value, the host (div) element is added to the DOM, if it returns falsy,
the element is removed.

```angular2html

<div *ngIf="number % 2 === 0">The number is even</div>
```

In our examples, `isActive` and `number` are simple instance variables of the corresponding .ts class.As all other
structural directives, _*ngIf_ is also prefixed with an asterix (*).

### *ngFor

Besides *ngIf, the other important structural directive is `*ngFor`, which is a repeater directive. It provides a way to
present a list of items. We define a block of HTML that defines how a single item should look, (usually an `li`, or
a `div`), and we tell Angular to use that block as a blueprint for rendering each item in the list. We also need to feed
the *ngFor directive the list of items. Let's see an example:

Our .ts file looks like this:

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css']
})
export class NewComponent {

  numbers = [1, 2, 3];

}
```

And this is how we use the directive:

```angular2html

<ul>
  <li *ngFor="let number of numbers">{{number}}</li>
</ul>
```

## Attribute directives

Attribute directives alter the appearance or behavior of an existing element. In templates they look like regular HTML
attributes, hence the name. The most common attribute directives are `NgClass` and `NgStyle`

### NgClass

With NgClass, we can add or remove `css classes` from the HTML element (several of them simultaneously, if we need).
This directive takes an object, where the keys are class names and the values are expressions that are evaluated for
thruthyness. Let's check it out:

```angular2html

<div [ngClass]="{'green': result >= 70, 'red': result < 70}">{{result}}</div>
```

In this example, `result` is a simple member of the corresponding .ts file. This way we can easily change how our
elements look based on dynamically changing application data.

### NgStyle

With NgStyle, we can set many inline styles simultaneously and dynamically, based on the state of the component. It
takes an object where the keys are css style property names, and the values are the property values.

```angular2html

<div [ngStyle]="{'font-size': '16px', 'font-weight': 'bold'}">Some content with dynamic inline styling</div>
```

Naturally, the style property values don't have to be literal values, they can come from the .ts file.

## Custom Angular directives

Generating a directive via CLI

```shell
ng generate directive custom-directive/custom-directive
```

This will simply result in a TypeScript class, with the @Directive decorator
```typescript
import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirectiveDirective {

  constructor(private eleRef: ElementRef) {
    eleRef.nativeElement.style.background = 'magenta';
  }
}
```

```angular2html

<button appCustomDirective>Show the girls</button>
```

### How can we pass parameters to such directives?

Let's have a look at our next directive, what is based on the previous one.

```shell
ng generate directive custom-directive/custom-directive-with-input
```

```typescript
import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appCustomDirectiveWithInput]'
})
export class CustomDirectiveWithInputDirective implements OnInit {

  @Input() color = '';

  constructor(private eleRef: ElementRef) {
  }

  ngOnInit(): void {
    //Since our @Input doesn't have a value upon creation, only after initialization
    // we cannot set this value on creation ( in the constructor )
    this.eleRef.nativeElement.style.background = this.color;
  }

}
```

Then, in our template we may pass attributes via property-binding

```angular2html

<button
  appCustomDirectiveWithInput
  [color]="'blue'"
>Show the boys
</button>
```

### Implement this approach similarly to [ngStyle]

```typescript
import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appCustomDirectiveWithInput]'
})
export class CustomDirectiveWithInputDirective implements OnInit {

  @Input('appCustomDirectiveWithInput') color = '';

  constructor(private eleRef: ElementRef) {
  }

  ngOnInit(): void {
    //Since our @Input doesn't have a value upon creation, only after initialization
    // we cannot set this value on creation ( in the constructor )
    this.eleRef.nativeElement.style.background = this.color;
  }

}
```

```angular2html

<button
  [appCustomDirectiveWithInput]="'blue'"
>Show the boys
</button>
```

### Reacting to user-events

To react to any user events in our directive, we may user the `@HostListener` decorator by passing the name of the
expected event.

```typescript
import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCustomDirectiveWithListener]'
})
export class CustomDirectiveWithListenerDirective {

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('mouseenter')
  public mouseEnter(): void {
    console.log('elementRef:', this.elementRef);
    console.log('elementRef.nativeElement:', this.elementRef.nativeElement);
    this.elementRef.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave', ['$event.target']) // We may also access our events target this way
  public mouseUp(target: EventTarget): void {
    console.log('$event.target: ', target);
    this.elementRef.nativeElement.style.backgroundColor = 'lightgrey';
  }

}

```

## Directive exercises

Work in the folder named __WS05-Angular-Directives-and-databinding__. Check out the starting .ts and .html files under
src/app, and start the app by navigating to the correct folder and
running `ng serve WS05-Angular-Directives-and-databinding`.
> Note:
Don't forget to install the dependencies with `npm i`

> Note 2:
Don't worry if IntelliJ IDEA doesn't recognize all the properties of all the objects and gives you some 'Unresolved variable' warnings. Your app will still work fine and we'll learn how to deal with this later.

1. Event binding: make sure the correct methods in the .ts file are called on button clicks
2. Conditionally display a new `h3` title depending on which characters we are displaying. Say "All the characters:"
   if everyone is displayed, "The girls:" if only the girls are displayed and "The boys:" if only the boys are
   displayed.
3. Loop through the chosen _characters_ and display their name and image (keep them in a `div` with the
   class `character`
   similar to the example)
4. Give the character cards (the divs) a new class conditionally: add the `boy` class if the character's `sex` is "male"
   and `girl`, if it's a "female". (Don't remove the original `character` class, just add the new one)

## Custom directive exercise

Generate and customize your own directive!

1. Generate a new directive via the NG CLI, put it in the custom-directive folder and name it `color-changer`
2. Make it accept an input with an array of colors
3. Add an interval with 500ms, where you rotate through the received colors and set it as the text color
4. Make the input optional, by setting up a default value ('black', 'green', 'blue')
5. Toggle the interval on click
6. Use this directive on the h1 heading of the template

## Further reading:

- [Structural Directives](https://angular.io/guide/template-syntax#built-in-structural-directives)
- [Attribute directives](https://angular.io/guide/template-syntax#built-in-attribute-directives)
- [HostListener](https://angular.io/api/core/HostListener)
- [HostListener - Events](https://www.w3schools.com/jsref/dom_obj_event.asp)
