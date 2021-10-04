[//]: # (TODO - Template-driven-re példa + feladat)

# Forms

Angular comes with great built-in tools for building forms. There are 2 ways to implement forms:

1. Template-driven approach
2. Reactive approach

The Reactive approach gives us a lot more control and flexibility and this is what is used in real-life applications, so
this is what we are going to focus on in this section.

Since not every application needs forms, this functionality belongs to a different module, the `ReactiveFormsModule`,
which needs to be imported from `@angular/forms` and added to the imports of `app.module.ts`:

```
import {ReactiveFormsModule} from "@angular/forms";
// other imports

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
```

What this module will allow us to do is have a TS representation of the HTML form fields with a lot of built-in
features.

To start off, in the component that has forms, we need to import the `FormGroup` class, which will be responsible for
keeping track of our form data. We will instantiate the FormGroup class, hence creating the form structure in the
`ngOnInit` lifecycle method, which will hold some `FormControl` objects (also imported from `@angular/forms`):

```typescript
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({...})
export class CatFormCompoent implements OnInit {

  catForm: FormGroup;

  ngOnInit() {
    this.catForm = new FormGroup({
      'name': new FormControl(''),
      'age': new FormControl(null),
      'sex': new FormControl('male'),
    })
  }
}
``` 

Note: the argument passed to the FormControl's constructor gives it an initial value.

To connect the HTML form with the `FormGroup` object, we need to add the `[formGroup]` directive to the form:

```angular2html

<form [formGroup]="catForm"></form>
```

And to connect the input fields with the object properties, we use the _formControlName_ directive:

```angular2html
<input id="name" formControlName="name">
```

### Validation

To validate the input fields, we can add a 2nd argument to the FormControl constructor. It can be a single validator, or
an array of validators. Static validator method references can be passed in here from the Validators class (again,
imported from ‘@angular/forms’):

```
'name': new FormControl('', Validators.required),
'email': new FormControl('', [Validators.required, Validators.email])
```

> Note: for a list of built-in validators, check out the [docks](https://angular.io/api/forms/Validators)

We can add custom validators as well, by defining our own method. They are simple typescript functions that receive the
`FormControl` (or `FormArray`) they validate, and return an object with a single key/value pair (the key is the name of
the error, and the value is true if the form field fails the validation). If it passes, it returns null.

```
forbiddenWordsValidator(control: FormControl) {
    if (this.forbiddenWords.contains(control.value)) {
        return {'forbiddenWord': true};
    }
    return null;
}
```

Now we can pass this validator function into the _FormControl_ constructor, however, if we use the `this` keyword in the
function, we need to `bind` it when passing it:

 ```
'nickname': new FormControl('', this.forbiddenWordsValidator.bind(this))
```

or we could turn the validator function into an arrow function.

### Accessing FormGroup properties from the HTML code

Thanks to Angular's form handling capabilities, we can get additional information about the state of our whole form
(_FormGroup_), and even the different parts (_FormControl_) of it. We can get access to the form controls with the
FormGroup’s get() method:

```
<form [formGroup]=”catForm”>
    <input id=”name” formControlName=”name”>
    <small *ngIf=”!catForm.get(‘name’).valid && catForm.get(‘name’).touched”>Please enter a name</small>
</form>
```

In this example we conditionally display a warning message if the _FormControl_ is not __valid__ (i.e. it fails on some
validation constraint) and it has been __touched__ (the user has clicked on the field and out of it). Both 'valid' and
'touched' are built-in properties automatically added to and updated in each _FormControl_ object continuously.

To display a message based on which validation constraint it breached, we can access the `errors` array when we `get()`
the form control:

```
<small *ngIf=”catForm.get(‘age’).errors[‘tooOld’]”>Cats don’t live longer than 100 years</small>
<small *ngIf=”catForm.get(‘age’).errors[‘negativeAge’]”>Cats can’t be younger than 0 years</small>
```

### FormBuilder

Creating form control instances manually can become repetitive when dealing with multiple forms. The FormBuilder service
provides convenient methods for generating controls.

After importing the `FormBuilder` service from `@angular/forms` and injecting it by adding it to the constructor, we can
start using its methods, namely `control()`, which returns a _FormControl_ object, `group()`, which returns a
_FormGroup_ or `array()`, which, you won't believe this, returns a _FormArray_ object.

```typescript
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({...})
export class CatFormComponent {
  catForm = this.formBuilder.group({
    name: [''],
    age: [null],
    sex: ['male']
  })

  constructor(private formBuilder: FormBuilder) {
  }
}
```

The value for each _control_ name is an array containing the initial value as the first item in the array. If a control
needs validation, simply add it as the second argument in the array.

### Submitting the form

To submit a form, i.e. send the form data to the server, we use the event binding syntax and attach our handler function
to the form element. The built-in event is called `ngSubmit`:

__The html file__:

```angular2html

<form (ngSubmit)="handleSubmit()">

  // the input fields come here

  <button>Submit</button>
</form>
```

__The .ts file holds the function called `handleSubmit`__:

```typescript
handleSubmit()
{
  this.foodService.sendFormData(this.form.value)
    .subscribe(...);
}
```

### Examples

For examples of different types of input with Angular's Reactive Forms, check out (and bookmark)
[this cheat sheet](https://coryrylan.com/blog/angular-reactive-forms-cheat-sheet) with code demo.

[//]: # (TODO - Feladatot átmásolni)

### Forms exercise

Work in the folder named ws07-forms. This time the starter project is very basic, it's what Angular generated for us,
meaning you'll have to build everything from scratch. We are going to build a form where we can send a shopping list to
a fake backend (we are going to just `console.log()` what we would send to the server).

1. Build a form in `app.component.html` with the following inputs:

- one with type _text_ responsible for providing the name of the food we are going to make
- one with type _number_ where we can say how many people we want to have over for dinner
- a _dropdown select_ box to say if we are going to cook `pasta`, `pizza` or `mixed veggies` based food
- a _checkbox_ to decide whether or not we are making vegetarian food
- _radio buttons_ to indicate the types of drink we are going to need (alcoholic or soft drinks)

2. Build the form's object representation in `app.component.ts` (optionally use a _FormBuilder_)
3. On _submit_ call a method that will print the shopping list to the console

### Further reading

- [Reactive Forms - Official Angular Docs](https://angular.io/guide/reactive-forms)
